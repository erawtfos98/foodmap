#!/usr/bin/env python3
"""Download a thumbnail for every video in data/places.js into thumbs/<p>-<id>.jpg.

YouTube thumbnails come from i.ytimg.com. TikTok thumbnails come from TikTok's public
oEmbed endpoint (the image URL it returns is signed and expires, so it has to be saved).
Existing files are skipped, so re-running only fetches new videos.

Usage: python3 scripts/fetch_thumbnails.py [--force]
Needs network access to i.ytimg.com, www.tiktok.com and TikTok's image CDN.
If Pillow is installed, images are resized to 360px wide to keep the page light.
"""
import io
import json
import pathlib
import re
import sys
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'thumbs'
UA = {'User-Agent': 'Mozilla/5.0 (foodmap thumbnail fetcher)'}
WIDTH = 360


def videos():
    src = (ROOT / 'data' / 'places.js').read_text(encoding='utf-8')
    seen = set()
    for p, vid in re.findall(r"p:\s*'(yt|tt)',\s*id:\s*'([^']+)'", src):
        if (p, vid) not in seen:
            seen.add((p, vid))
            yield p, vid


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=20) as r:
        return r.read()


def youtube(vid):
    # oar2 is the portrait Shorts frame; hqdefault always exists but is letterboxed 4:3.
    for name in ('oar2.jpg', 'hq720.jpg', 'hqdefault.jpg'):
        try:
            return get(f'https://i.ytimg.com/vi/{vid}/{name}')
        except Exception:
            continue
    raise RuntimeError('no YouTube thumbnail')


def tiktok(vid):
    page = f'https://www.tiktok.com/@foodiestablenz/video/{vid}'
    meta = json.loads(get('https://www.tiktok.com/oembed?url=' + urllib.parse.quote(page, safe='')))
    return get(meta['thumbnail_url'])


def shrink(data):
    try:
        from PIL import Image
    except ImportError:
        return data
    img = Image.open(io.BytesIO(data)).convert('RGB')
    if img.width > WIDTH:
        img = img.resize((WIDTH, round(img.height * WIDTH / img.width)))
    buf = io.BytesIO()
    img.save(buf, 'JPEG', quality=78, optimize=True)
    return buf.getvalue()


def main():
    force = '--force' in sys.argv
    OUT.mkdir(exist_ok=True)
    ok = skipped = failed = 0
    for p, vid in videos():
        dest = OUT / f'{p}-{vid}.jpg'
        if dest.exists() and not force:
            skipped += 1
            continue
        try:
            dest.write_bytes(shrink(youtube(vid) if p == 'yt' else tiktok(vid)))
            ok += 1
            print('saved', dest.name)
        except Exception as e:  # keep going; a missing thumbnail just shows the placeholder
            failed += 1
            print('FAILED', p, vid, e, file=sys.stderr)
    print(f'{ok} saved, {skipped} already present, {failed} failed')


if __name__ == '__main__':
    main()
