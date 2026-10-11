(function () {
  'use strict';

  var places = (window.PLACES || []).filter(function (p) {
    return typeof p.lat === 'number' && typeof p.lng === 'number';
  });

  var map = L.map('map', { zoomControl: true });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  var cluster = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 40 });
  map.addLayer(cluster);

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function thumb(id) { return 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg'; }
  function shortUrl(id) { return 'https://www.youtube.com/shorts/' + encodeURIComponent(id); }
  function mapsUrl(p) {
    return 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(p.name + ', ' + (p.address || p.city || ''));
  }

  function popupHtml(p) {
    var v = p.videos[0];
    var more = p.videos.slice(1).map(function (x, i) {
      return '<a href="' + shortUrl(x.id) + '" target="_blank" rel="noopener">Video ' + (i + 2) + '</a>';
    }).join('');
    return '<div class="popup">' +
      '<h3>' + esc(p.name) + '</h3>' +
      '<div class="addr">' + esc(p.address || p.city) + '</div>' +
      (p.cuisine ? '<div class="meta">' + esc(p.cuisine) + '</div>' : '') +
      (p.notes ? '<div class="notes">' + esc(p.notes) + '</div>' : '') +
      '<a class="video" href="' + shortUrl(v.id) + '" data-embed="' + esc(v.id) + '" target="_blank" rel="noopener">' +
        '<img src="' + thumb(v.id) + '" alt="" loading="lazy"><span class="play">▶</span></a>' +
      '<div class="vtitle">' + esc(v.title) + '</div>' +
      '<div class="links">' +
        '<a href="' + shortUrl(v.id) + '" target="_blank" rel="noopener">Open on YouTube</a>' +
        '<a href="' + mapsUrl(p) + '" target="_blank" rel="noopener">Directions</a>' + more +
      '</div></div>';
  }

  // Swap the thumbnail for an inline player on click (ctrl/cmd click still opens YouTube).
  map.on('popupopen', function (e) {
    var a = e.popup.getElement().querySelector('a.video');
    if (!a) return;
    a.addEventListener('click', function (ev) {
      if (ev.ctrlKey || ev.metaKey || ev.shiftKey) return;
      ev.preventDefault();
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube.com/embed/' + encodeURIComponent(a.dataset.embed) + '?autoplay=1&playsinline=1';
      f.allow = 'autoplay; encrypted-media; picture-in-picture';
      f.allowFullscreen = true;
      a.replaceWith(f);
      e.popup.update();
    });
  });

  places.forEach(function (p) {
    p.marker = L.marker([p.lat, p.lng], { title: p.name }).bindPopup(popupHtml(p), { maxWidth: 260 });
    p.haystack = [p.name, p.address, p.city, p.country, p.cuisine, p.notes]
      .concat(p.videos.map(function (v) { return v.title; })).join(' ').toLowerCase();
  });

  // Cuisine chips
  var cuisines = {};
  places.forEach(function (p) { if (p.cuisine) cuisines[p.cuisine] = (cuisines[p.cuisine] || 0) + 1; });
  var active = null;
  var chipsEl = document.getElementById('chips');
  ['All'].concat(Object.keys(cuisines).sort()).forEach(function (c) {
    var b = document.createElement('button');
    b.className = 'chip';
    b.textContent = c === 'All' ? 'All' : c + ' (' + cuisines[c] + ')';
    b.setAttribute('aria-pressed', c === 'All' ? 'true' : 'false');
    b.addEventListener('click', function () {
      active = c === 'All' ? null : c;
      chipsEl.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      render(true);
    });
    chipsEl.appendChild(b);
  });

  var listEl = document.getElementById('list');
  var countEl = document.getElementById('count');
  var searchEl = document.getElementById('search');

  function render(fit) {
    var q = searchEl.value.trim().toLowerCase();
    var shown = places.filter(function (p) {
      return (!active || p.cuisine === active) && (!q || p.haystack.indexOf(q) !== -1);
    });
    cluster.clearLayers();
    cluster.addLayers(shown.map(function (p) { return p.marker; }));
    listEl.innerHTML = '';
    shown.forEach(function (p) {
      var li = document.createElement('li');
      li.innerHTML = '<img src="' + thumb(p.videos[0].id) + '" alt="" loading="lazy">' +
        '<div><div class="name">' + esc(p.name) + '</div>' +
        '<div class="meta">' + esc([p.cuisine, p.city].filter(Boolean).join(' · ')) + '</div>' +
        '<div class="meta">' + esc(p.videos[0].title) + '</div></div>';
      li.addEventListener('click', function () {
        document.body.classList.remove('list-open');
        cluster.zoomToShowLayer(p.marker, function () { p.marker.openPopup(); });
      });
      listEl.appendChild(li);
    });
    countEl.textContent = shown.length + ' of ' + places.length + ' places';
    if (fit && shown.length) map.fitBounds(L.latLngBounds(shown.map(function (p) { return [p.lat, p.lng]; })).pad(0.15));
  }

  searchEl.addEventListener('input', function () { render(false); });
  document.getElementById('toggle').addEventListener('click', function () {
    document.body.classList.toggle('list-open');
  });

  // Start on Auckland, where most recommendations are.
  map.setView([-36.87, 174.76], 12);
  render(false);
})();
