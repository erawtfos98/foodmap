# Foodies Table Map

An interactive map of the food spots recommended in the
[Vanessa & Anthony](https://www.youtube.com/@VanessaandAnthony/shorts) YouTube Shorts
(also @foodiestablenz on Instagram and TikTok).

Open `index.html` in a browser, or serve the folder with any static host such as GitHub Pages. There's no build step.

- Each pin is a restaurant or shop. The popup shows the Short (it plays inline or opens on YouTube) and a Google Maps directions link.
- Search by name, dish or suburb, and filter by cuisine.
- Shorts whose venue couldn't be identified are listed under "Videos without a known location".

## Data

Everything lives in `data/places.js`. To add a place, append an entry with `name`, `address`, `cuisine`, `lat`, `lng` and
`videos: [{ id, title }]`, where `id` is the YouTube video ID.

Pin coordinates are approximate and were placed from each street address. The directions link searches by name and address, so it lands on the exact spot.

Leaflet 1.9.4 and Leaflet.markercluster 1.5.3 are vendored in `vendor/`.
