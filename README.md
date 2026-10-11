# Foodies Table Map

An interactive map of the food spots recommended by Vanessa & Anthony, on
[YouTube](https://www.youtube.com/@VanessaandAnthony/shorts) and on
[TikTok/Instagram as @foodiestablenz](https://www.tiktok.com/@foodiestablenz).

- Each pin is a restaurant, cafe or food shop, linked to the video that recommends it.
- Hovering a pin (or a row in the list) shows the video's thumbnail. Clicking opens details, the video link and Google Maps directions.
- Filter by region (Auckland or the rest of NZ) and by food type, or search by name, dish or suburb.
- Videos that don't point to one address (roundups, supermarket finds, flights) are listed separately.

## Files

| Path | What it is |
| --- | --- |
| `data/places.js` | All places and videos. This is the file to edit. |
| `src/template.html` | The page layout, styles and script. |
| `scripts/build.js` | Builds `index.html` and `dist/foodies-table-map.html` from the template and data. |
| `scripts/fetch_thumbnails.py` | Downloads video thumbnails into `thumbs/`. |
| `data/land.json` | NZ coastline (detailed around Auckland), used by the self-contained build. |
| `index.html` | Generated. Uses OpenStreetMap tiles; open it in a browser or host it on GitHub Pages. |
| `dist/foodies-table-map.html` | Generated. Self-contained, with a drawn coastline instead of tiles, for hosts that block outside images. |

## Updating

```sh
# 1. add or edit places in data/places.js
python3 scripts/fetch_thumbnails.py   # save thumbnails for any new videos
node scripts/build.js                 # regenerate index.html and dist/
```

Each place needs `name`, `address`, `area`, `cat`, `lat`, `lng` and `videos: [{ p, id }]`. `p` is `'yt'` (YouTube video ID)
or `'tt'` (TikTok video number). Places outside Auckland also need `region`.

The thumbnail script needs network access to `i.ytimg.com`, `www.tiktok.com` and TikTok's image CDN. Until thumbnails are
saved, `index.html` loads YouTube thumbnails straight from YouTube, and TikTok entries show a placeholder.

## Data notes

- Places come from the couple's YouTube Shorts and their TikTok captions, gathered through web search. Search engines
  index only part of their posts, so the map is not complete.
- Pin coordinates were placed by hand from each street address, so they are approximate. The directions link searches
  Google Maps by name and address, so it finds the exact spot.
- Places marked "sponsored" were posted as ads. Prices are as stated in the videos and may have changed.

Leaflet 1.9.4 is vendored in `vendor/`.
