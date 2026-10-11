// Food spots from the Vanessa & Anthony YouTube Shorts (https://www.youtube.com/@VanessaandAnthony/shorts).
// Coordinates are approximate, placed from the street address. The "Directions" link searches
// Google Maps by name + address, so it lands on the exact spot.
// source: where the venue name/address came from ("video" = the Short's title/description,
// "tiktok" = the couple's TikTok caption for the same clip).
window.PLACES = [
  {
    name: 'Master Pig Pork Rice 痞哥猪脚饭',
    address: '242 Dominion Road, Mount Eden, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Chinese',
    lat: -36.8795, lng: 174.7482,
    notes: 'Affordable pork trotter / pork belly rice.',
    source: 'video',
    videos: [{ id: 'hQ0J85Vs5x8', title: 'New affordable pork rice spot on Dominion Road in Auckland New Zealand' }]
  },
  {
    name: 'Chao Jin Dao 超晋道',
    address: '272 Ti Rakau Drive, Pakuranga, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Chinese',
    lat: -36.9105, lng: 174.8990,
    notes: "Auckland's first noodle buffet, $12.99.",
    source: 'tiktok',
    videos: [{ id: 'D-LXJMtXAzk', title: "Auckland's very first noodle buffet for just $12.99!" }]
  },
  {
    name: 'Kung Fu BBQ & Hotpot Buffet 功夫自助火锅烧烤',
    address: '11 Pleasant View Road, Panmure, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Buffet',
    lat: -36.8992, lng: 174.8558,
    notes: 'All-you-can-eat BBQ and hotpot.',
    source: 'tiktok',
    videos: [{ id: 'DvK4DEm6v2o', title: 'KungFu Bbq & Hotpot buffet in Panmure, Auckland' }]
  },
  {
    name: 'XinFengMao Chinese BBQ 新丰茂烧烤',
    address: '14E Torrens Road, Burswood, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Chinese',
    lat: -36.9203, lng: 174.8972,
    notes: 'Chinese BBQ skewers.',
    source: 'video',
    videos: [{ id: 'mda3yHAfZh4', title: 'XinFengMao Chinese BBQ 新丰茂烧烤. 14E Torrens Road, Burswood' }]
  },
  {
    name: 'Oriental West Banquet',
    address: '33-47 Northside Drive, Westgate, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Buffet',
    lat: -36.8160, lng: 174.6085,
    notes: "Billed as NZ's biggest new buffet: seafood, sushi, wagyu, dumplings. Dinner $119 to $129.",
    source: 'tiktok',
    videos: [{ id: 'X1CG96CJK9o', title: "NZ's Biggest New Buffet Restaurant" }]
  },
  {
    name: 'Chiu Chiu',
    address: '29 Totara Avenue, New Lynn, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Thai / Vietnamese',
    lat: -36.9078, lng: 174.6852,
    notes: 'Asian fusion, date night pick.',
    source: 'tiktok',
    videos: [{ id: 'UvTX8g1u8jc', title: 'Beautiful food from Chiu Chiu' }]
  },
  {
    name: "线太爷 Grandpa's Rice Noodle",
    address: 'Oracle Drive, Albany, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Chinese',
    lat: -36.7302, lng: 174.7088,
    notes: 'Rice noodles and potato noodles.',
    source: 'video',
    videos: [{ id: 't6gOqUN4e9A', title: "线太爷 Grandpa's Rice Noodle. Oracle Dr, NZ Auckland" }]
  },
  {
    name: 'Evernine Asian Grocery Outlet',
    address: '2/260 Oteha Valley Road, Albany, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Grocery & snacks',
    lat: -36.7248, lng: 174.7158,
    notes: 'Giant snacks review.',
    source: 'video',
    videos: [{ id: '-bx3k-uSlaA', title: 'Giant snacks review!' }]
  },
  {
    name: 'Lunchbar Eighty8',
    address: '15 Saleyards Road, Ōtāhuhu, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'NZ pies',
    lat: -36.9442, lng: 174.8462,
    notes: 'Savoury pies.',
    source: 'video',
    videos: [{ id: 'EQuCJCl8whQ', title: 'Lunchbar Eighty8. 15 Saleyards Road, Ōtāhuhu, Auckland' }]
  },
  {
    name: 'Nukkad',
    address: 'Sylvia Park, 286 Mount Wellington Highway, Mount Wellington, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Indian',
    lat: -36.9176, lng: 174.8412,
    notes: 'Indian street food, delicious and affordable.',
    source: 'video',
    videos: [{ id: 'hyKZ9GOIJ0M', title: 'Nukkad at Sylvia Park is so delicious and affordable' }]
  },
  {
    name: 'SkyCity (unlimited fried chicken wings)',
    address: 'SkyCity, Victoria Street & Federal Street, Auckland CBD',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Buffet',
    lat: -36.8486, lng: 174.7620,
    notes: 'Unlimited wings. The video does not name the venue inside SkyCity.',
    source: 'video',
    videos: [{ id: 'tnxmY7paTW8', title: 'Unlimited Fried Chicken Wings at Sky City' }]
  },
  {
    name: 'Fankery',
    address: '2B York Street, Newmarket, Auckland',
    city: 'Auckland', country: 'New Zealand', cuisine: 'Dessert',
    lat: -36.8702, lng: 174.7772,
    notes: 'Crepe cakes and mochi Basque cheesecake. Reported closed since May 2026.',
    source: 'video',
    videos: [{ id: 'mXbCvBZUn9Q', title: 'Fankery has been so popular and they finally have a store' }]
  }
];

// Food Shorts from the channel whose venue could not be identified, so they have no pin.
window.UNMAPPED = [
  { id: 'H8gZCys549U', title: 'Best Italian food in Auckland New Zealand' },
  { id: '6hh-0YnQdP8', title: 'Trying Chilean street food in Auckland' },
  { id: 'khdG8Nmvdzc', title: 'Iconic banoffee pie in Auckland' },
  { id: 'OyvjP9hqQ1g', title: 'New frozen yogurt store in Auckland' },
  { id: 'XhM14h246vA', title: 'New Cat Cafe in Auckland' },
  { id: 'qMr_1RapmJ8', title: 'Hangi and Seafood boil' },
  { id: '3C-xjKHxmfc', title: 'New Asian Supermarket in South Auckland' },
  { id: 'jx_Xyv05CBk', title: 'Jelly Tongue Popsicles in NZ' },
  { id: 'OUjX17bssVI', title: 'FREE things you can get on your birthday in NZ' }
];
