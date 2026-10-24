const images = {
  accessories: require('../../assets/images/category-accessories.jpg'),
  clothes: require('../../assets/images/category-clothes.jpg'),
  makeup: require('../../assets/images/category-makeup.jpg'),
  watch: require('../../assets/images/catalog/watch-mesh.jpg'),
  tote: require('../../assets/images/catalog/tote-leather.jpg'),
  shirt: require('../../assets/images/catalog/shirt-linen.jpg'),
  lipstick: require('../../assets/images/catalog/lip-colour.jpg'),
  bifold: require('../../assets/images/catalog/wallet-bifold.jpg'),
  slimWallet: require('../../assets/images/catalog/wallet-slim.jpg'),
  zipWallet: require('../../assets/images/catalog/wallet-zip.jpg'),
  coinPurse: require('../../assets/images/catalog/wallet-coin.jpg'),
  pocketWallet: require('../../assets/images/catalog/wallet-pocket.jpg'),
  leatherWatch: require('../../assets/images/catalog/watch-leather.jpg'),
  steelWatch: require('../../assets/images/catalog/watch-steel.jpg'),
  darkWatch: require('../../assets/images/catalog/watch-dark.jpg'),
  sandstoneWatch: require('../../assets/images/catalog/watch-sandstone.jpg'),
  hoops: require('../../assets/images/catalog/jewellery-hoops.jpg'),
  pendant: require('../../assets/images/catalog/jewellery-pendant.jpg'),
  cuff: require('../../assets/images/catalog/jewellery-cuff.jpg'),
  ring: require('../../assets/images/catalog/jewellery-ring.jpg'),
  arcPurse: require('../../assets/images/catalog/purse-arc.jpg'),
  purseTote: require('../../assets/images/catalog/purse-tote.jpg'),
  crossbody: require('../../assets/images/catalog/purse-crossbody.jpg'),
  clutch: require('../../assets/images/catalog/purse-clutch.jpg'),
  mensShirt: require('../../assets/images/catalog/clothes-male-shirt.jpg'),
  fabric1: require('../../assets/images/catalog/clothes-fabric-01.jpg'),
  kurta: require('../../assets/images/catalog/clothes-male-kurta.jpg'),
  fabric2: require('../../assets/images/catalog/clothes-fabric-02.jpg'),
  womensShirt: require('../../assets/images/catalog/clothes-female-shirt.jpg'),
  womensKurta: require('../../assets/images/catalog/clothes-female-kurta.jpg'),
  overshirt: require('../../assets/images/catalog/clothes-overshirt.jpg'),
  fabric3: require('../../assets/images/catalog/clothes-fabric-03.jpg'),
  fabric4: require('../../assets/images/catalog/clothes-fabric-04.jpg'),
  trousers: require('../../assets/images/catalog/clothes-trousers.jpg'),
  coord: require('../../assets/images/catalog/clothes-coord.jpg'),
  embroidered: require('../../assets/images/catalog/clothes-embroidered.jpg'),
  dress: require('../../assets/images/catalog/clothes-dress.jpg'),
  wrap: require('../../assets/images/catalog/clothes-wrap.jpg'),
  unstitched: require('../../assets/images/catalog/clothes-unstitched.jpg'),
  linen: require('../../assets/images/catalog/clothes-linen.jpg'),
  fabric5: require('../../assets/images/catalog/clothes-fabric-05.jpg'),
  fabric6: require('../../assets/images/catalog/clothes-fabric-06.jpg'),
  womensSet: require('../../assets/images/catalog/clothes-female-set.jpg'),
  velvetLip: require('../../assets/images/catalog/makeup-velvet.jpg'),
  skinTint: require('../../assets/images/catalog/makeup-tint.jpg'),
  eyeEdit: require('../../assets/images/catalog/makeup-eye-edit.jpg'),
  blush: require('../../assets/images/catalog/makeup-blush.jpg'),
};

function product(id, name, price, image, description, collection, tag, compareAt) {
  return {
    id,
    name,
    price,
    image,
    description,
    collection,
    tag,
    compareAt,
    source: 'catalog',
    currency: 'PKR',
  };
}

export const collections = {
  'male-wallets': {
    title: 'Purses & Wallets',
    breadcrumb: 'ACCESSORIES / MALE',
    intro: 'Beautifully made leather essentials, designed to travel lightly.',
    filters: ['All', 'Bifold', 'Card holders'],
    items: [
      product('wallet-bifold', 'Classic Bifold Wallet', 1450, images.bifold, 'A compact, hand-finished leather wallet with room for everyday essentials.', 'male-wallets', 'Bifold'),
      product('wallet-slim', 'Slim Card Holder', 950, images.slimWallet, 'A slim profile for the cards you reach for every day.', 'male-wallets', 'Card holders'),
      product('wallet-zip', 'Zip-around Wallet', 1800, images.zipWallet, 'A secure zip-around shape with a considered leather finish.', 'male-wallets', 'Bifold'),
      product('wallet-coin', 'Pocket Coin Purse', 750, images.coinPurse, 'A small, useful leather pouch for coins and little essentials.', 'male-wallets', 'Card holders'),
    ],
  },
  watches: {
    title: 'Watches',
    breadcrumb: 'ACCESSORIES / MALE',
    intro: 'Timeless by design. A considered companion for every hour.',
    filters: ['All', 'Mesh', 'Leather', 'Steel'],
    items: [
      product('watch-mesh', 'Classic Mesh Watch', 2400, images.watch, 'An ivory dial meets a finely woven champagne-gold mesh strap. An everyday signature, made to move from relaxed linen to evening tailoring.', 'watches', 'Mesh', 3000),
      product('watch-leather', 'Leather Dial Watch', 2800, images.leatherWatch, 'A refined watch with a soft leather strap and a clean, easy-to-read dial.', 'watches', 'Leather'),
      product('watch-steel', 'Brushed Steel Watch', 3400, images.steelWatch, 'A brushed steel finish and understated face for a lasting everyday companion.', 'watches', 'Steel'),
      product('watch-sandstone', 'Sandstone Watch', 2600, images.sandstoneWatch, 'Warm neutral tones meet a quietly classic silhouette.', 'watches', 'Mesh'),
    ],
  },
  jewellery: {
    title: 'Jewellery',
    breadcrumb: 'ACCESSORIES / FEMALE',
    intro: 'Understated shine, made for your everyday rituals.',
    filters: ['All', 'Earrings', 'Necklaces'],
    items: [
      product('jewel-hoops', 'Sculpted Gold Hoops', 1250, images.hoops, 'Sculptural hoops with a soft polished finish, made for daily wear.', 'jewellery', 'Earrings', 1563),
      product('jewel-pendant', 'Pearl Pendant', 1600, images.pendant, 'A delicate pendant with a luminous pearl and fine gold chain.', 'jewellery', 'Necklaces'),
      product('jewel-cuff', 'Everyday Gold Cuff', 1400, images.cuff, 'A simple open cuff, shaped to sit comfortably from morning to evening.', 'jewellery', 'Earrings'),
      product('jewel-ring', 'Soft Curve Ring', 850, images.ring, 'A smooth, softly curved band with a subtle golden glow.', 'jewellery', 'Necklaces'),
    ],
  },
  purses: {
    title: 'Purses',
    breadcrumb: 'ACCESSORIES / FEMALE',
    intro: 'Sculptural shapes. Beautiful textures. Your day, well carried.',
    filters: ['All', 'Shoulder', 'Crossbody'],
    items: [
      product('purse-arc', 'Arc Shoulder Purse', 2900, images.arcPurse, 'A rounded silhouette and considered details for your everyday edit.', 'purses', 'Shoulder'),
      product('purse-tote', 'Everyday Leather Tote', 3600, images.purseTote, 'A beautifully made cognac leather tote with room for the day ahead.', 'purses', 'Shoulder'),
      product('purse-crossbody', 'Mini Crossbody', 2400, images.crossbody, 'A small hands-free shape for the essentials you keep close.', 'purses', 'Crossbody'),
      product('purse-clutch', 'Evening Fold Clutch', 1900, images.clutch, 'An elegant fold-over clutch with a soft, tactile finish.', 'purses', 'Crossbody'),
    ],
  },
  'male-stitched': {
    title: 'Stitched',
    breadcrumb: 'CLOTHES / MALE',
    intro: 'Ready-to-wear essentials. Relaxed tailoring, refined textures.',
    filters: ['All', 'Shirts', 'Kurtas', 'Trousers'],
    items: [
      product('men-linen-shirt', 'Relaxed Linen Shirt', 2200, images.mensShirt, 'A relaxed shirt in natural linen with a soft, breathable hand.', 'male-stitched', 'Shirts'),
      product('men-cotton-kurta', 'Everyday Cotton Kurta', 2600, images.kurta, 'An easy cotton kurta for comfortable everyday dressing.', 'male-stitched', 'Kurtas'),
      product('men-trousers', 'Tailored Trousers', 2400, images.trousers, 'A straight, easy fit with a clean line and softly structured fabric.', 'male-stitched', 'Trousers'),
      product('men-overshirt', 'Textured Overshirt', 3200, images.overshirt, 'A textured extra layer designed to wear open or buttoned.', 'male-stitched', 'Shirts'),
    ],
  },
  'male-unstitched': {
    title: 'Unstitched',
    breadcrumb: 'CLOTHES / MALE',
    intro: 'Premium lengths, ready for your tailor. Shape a signature of your own.',
    filters: ['All', 'Cotton', 'Linen', 'Blends'],
    items: [
      product('men-sand-cotton', 'Sand Cotton · 4.5 m', 1900, images.fabric1, 'A soft, versatile cotton length in a warm sand shade.', 'male-unstitched', 'Cotton'),
      product('men-ivory-linen', 'Ivory Linen · 4.5 m', 2800, images.fabric2, 'A lightweight ivory linen length with a relaxed natural texture.', 'male-unstitched', 'Linen'),
      product('men-espresso-blend', 'Espresso Blend · 4 m', 2400, images.fabric3, 'A deep espresso blend with a refined, easy drape.', 'male-unstitched', 'Blends'),
      product('men-stone-cotton', 'Stone Cotton · 4.5 m', 2100, images.fabric4, 'A clean stone cotton length, ready for your own cut.', 'male-unstitched', 'Cotton'),
    ],
  },
  'female-stitched': {
    title: 'Stitched',
    breadcrumb: 'CLOTHES / FEMALE',
    intro: 'Easy silhouettes, thoughtful details. Already made to feel like you.',
    filters: ['All', 'Co-ords', 'Kurtas', 'Dresses'],
    items: [
      product('women-linen-coord', 'Linen Co-ord Set', 4200, images.coord, 'An easy matching set in soft linen with relaxed, versatile proportions.', 'female-stitched', 'Co-ords'),
      product('women-embroidered-kurta', 'Embroidered Kurta', 3100, images.embroidered, 'A thoughtfully embroidered kurta with a soft, everyday silhouette.', 'female-stitched', 'Kurtas'),
      product('women-wrap-dress', 'Soft Wrap Dress', 3800, images.wrap, 'A softly draped wrap shape that feels effortless from day to evening.', 'female-stitched', 'Dresses'),
      product('women-wide-trouser', 'Wide-leg Trousers', 2300, images.trousers, 'A fluid wide-leg cut in a considered neutral shade.', 'female-stitched', 'Co-ords'),
    ],
  },
  'female-unstitched': {
    title: 'Unstitched',
    breadcrumb: 'CLOTHES / FEMALE',
    intro: 'Beautiful fabric, endless possibility. Create a piece that is entirely yours.',
    filters: ['All', 'Cotton', 'Silk', 'Jacquard'],
    items: [
      product('women-ivory-cotton', 'Ivory Cotton · 3 pc', 2900, images.unstitched, 'A breathable cotton three-piece set in soft ivory.', 'female-unstitched', 'Cotton'),
      product('women-oat-lawn', 'Oat Lawn · 3 pc', 2400, images.linen, 'Light, airy lawn in a calm oat shade, ready to make your own.', 'female-unstitched', 'Cotton'),
      product('women-taupe-silk', 'Taupe Silk · 2 pc', 3600, images.fabric5, 'A soft taupe silk two-piece set with a gentle sheen.', 'female-unstitched', 'Silk'),
      product('women-sand-jacquard', 'Sand Jacquard · 3 pc', 3200, images.fabric6, 'A textured sand jacquard set with a subtle woven pattern.', 'female-unstitched', 'Jacquard'),
    ],
  },
};

export const homeProducts = [
  collections.watches.items[0],
  collections.purses.items[1],
  collections['male-stitched'].items[0],
  product('makeup-velvet-lip', 'Velvet Lip Colour', 850, images.lipstick, 'Soft matte colour in Rosewood, made for an effortless everyday ritual.', 'makeup', 'Lips'),
  collections.jewellery.items[0],
  collections['female-stitched'].items[1],
];

export const categoryCards = [
  { key: 'accessories', title: 'Accessories', subtitle: 'Small details. Big impact.', image: images.accessories },
  { key: 'clothes', title: 'Clothes', subtitle: 'Timeless pieces for every version of you.', image: images.clothes },
  { key: 'makeup', title: 'Makeup', subtitle: 'Enhance your natural beauty, effortlessly.', image: images.makeup },
];

export const makeupEdit = [
  product('makeup-lip-colour', 'Velvet Lip Colour', 850, images.velvetLip, 'Soft matte · Rosewood. A comfortable, rich colour for your everyday ritual.', 'makeup', 'Lips'),
  product('makeup-skin-tint', 'Luminous Skin Tint', 1450, images.skinTint, 'Sheer glow · Sand 02. A light skin tint with a naturally luminous finish.', 'makeup', 'Face'),
  product('makeup-eye-edit', 'Everyday Eye Edit', 1800, images.eyeEdit, 'Four tones · Soft neutrals. An easy eye palette for day-to-evening colour.', 'makeup', 'Eyes'),
  product('makeup-cloud-blush', 'Cloud Cream Blush', 950, images.blush, 'Dewy finish · Warm rose. A soft cream blush that melts into the skin.', 'makeup', 'Face'),
];

collections.makeup = {
  title: 'Makeup',
  breadcrumb: 'MAKEUP',
  intro: 'Enhance your natural beauty, effortlessly.',
  filters: ['All', 'Lips', 'Face', 'Eyes'],
  items: makeupEdit,
};

export const categorySections = [
  {
    title: 'Accessories',
    eyebrow: 'THE FINISHING TOUCH',
    description: 'Small details. Lasting impressions. Discover the pieces that make a look your own.',
    signature: 'Timeless accents, chosen with intention.',
    groups: [
      { heading: 'Male', tagline: 'Everyday refinement', options: [
        { label: 'Purses / Wallets', note: 'Leather, thoughtfully crafted', slug: 'male-wallets', image: images.bifold },
        { label: 'Watches', note: 'Time, beautifully kept', slug: 'watches', image: images.watch },
      ] },
      { heading: 'Female', tagline: 'Quiet statements', options: [
        { label: 'Jewellery', note: 'A little everyday radiance', slug: 'jewellery', image: images.hoops },
        { label: 'Purses', note: 'Carry only what matters', slug: 'purses', image: images.purseTote },
      ] },
    ],
  },
  {
    title: 'Clothes',
    eyebrow: 'A WARDROBE WITH INTENTION',
    description: 'Effortless silhouettes and beautiful fabrics. Ready to wear, or ready for your own story.',
    signature: 'Natural textures. A palette that belongs together.',
    groups: [
      { heading: 'Male', tagline: 'A considered wardrobe', options: [
        { label: 'Stitched', note: 'Ready for every day', slug: 'male-stitched', image: images.mensShirt },
        { label: 'Unstitched', note: 'Make it your own', slug: 'male-unstitched', image: images.fabric1 },
      ] },
      { heading: 'Female', tagline: 'Ease in every detail', options: [
        { label: 'Stitched', note: 'Beautifully put together', slug: 'female-stitched', image: images.womensSet },
        { label: 'Unstitched', note: 'Possibilities in every thread', slug: 'female-unstitched', image: images.unstitched },
      ] },
    ],
  },
];

export const imagesForUI = images;