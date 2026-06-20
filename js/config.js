// ============================================================
// KICKSY NEPAL — CONFIGURATION
// Update these values before deployment
// ============================================================

const CONFIG = {
  // ── Core ──────────────────────────────────────────────────
  SITE_NAME: "Kicksy Nepal",
  SITE_URL: "https://kicksy.com.np",
  TAGLINE: "Premium Shoes, Affordable Prices",
  CURRENCY: "Rs.",

  // ── WhatsApp ───────────────────────────────────────────────
  // Replace with actual WhatsApp number (with country code, no + or spaces)
  WHATSAPP_NUMBER: "9779763374989",

  // ── Google Apps Script ─────────────────────────────────────
  // Paste your deployed Apps Script Web App URL here
  GOOGLE_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycbzu3uYx0kod5wzwmM3IDq7KyrGKGifucd3GEUiaM0yV0JpCBxUPmgvWY_NoplHwyqe-hg/exec",

  // Formspree: sends order/contact form submissions to your email
  // inbox as a notification, IN ADDITION TO the Google Sheets record
  // above (Sheets remains the source of truth for order tracking).
  FORMSPREE_ENDPOINT: "https://formspree.io/f/xnjyrjzq",

  // ── Products per page ─────────────────────────────────────
  PRODUCTS_PER_PAGE: 12,

  // ── Cache duration (milliseconds) ─────────────────────────
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes

  // ── Social media ──────────────────────────────────────────
  INSTAGRAM_URL: "https://instagram.com/kicksy.np",
  INSTAGRAM_LEATHER_URL: "https://www.instagram.com/kleather.np/", // Kept original as it wasn't in CSV
  TIKTOK_URL: "https://tiktok.com/@kicksy.np",
  TIKTOK_LEATHER_URL: "https://www.tiktok.com/@kleather.np?lang=en", // Kept original as it wasn't in CSV
  FACEBOOK_URL: "https://facebook.com/kicksy.np",
  YOUTUBE_URL: "https://www.youtube.com/@kicksynp",

  // ── Contact ───────────────────────────────────────────────
  EMAIL: "info@kicksy.com.np",
  ADDRESS: "Kathmandu, Nepal",

  // ── Delivery ──────────────────────────────────────────────
  DELIVERY_TEXT: "Nationwide delivery across Nepal • 3–7 working days",

  // ── WhatsApp order message template ───────────────────────
  buildWhatsAppMessage(product, size, color, customer = {}) {
    const name = customer.name || "";
    const phone = customer.phone || "";
    const address = customer.address || "";
    const note = customer.note || "";
    const isLeather = product.productType === "leather";

    const emoji = isLeather ? "👜" : "👟";
    const sizeLabel = isLeather ? "Variant" : "Size";
    const sizeEmoji = isLeather ? "📏" : "📐";

    // Determine pre-order status (same logic used on cards/detail page)
    const hasStockMap =
      product.stockMap && Object.keys(product.stockMap).length > 0;
    const inStock = !product.available
      ? false
      : hasStockMap && typeof API !== "undefined"
        ? API.computeStock(product) > 0
        : true;
    const isPreOrder = !inStock;

    let msg = isPreOrder
      ? `Hello Kicksy Nepal, I'd like to PRE-ORDER:\n\n`
      : `Hello Kicksy Nepal, I want to order:\n\n`;
    msg += `${emoji} *Product:* ${product.name}\n`;
    msg += `🏷️ *Brand:* ${product.brand}\n`;
    if (size && size !== "Not selected")
      msg += `${sizeEmoji} *${sizeLabel}:* ${size}\n`;
    if (color && color !== "Not selected") msg += `🎨 *Color:* ${color}\n`;
    msg += `💰 *Price:* ${CONFIG.CURRENCY} ${(product.salePrice || product.price).toLocaleString()}\n`;

    if (name) msg += `\n👤 *Name:* ${name}`;
    if (phone) msg += `\n📱 *Phone:* ${phone}`;
    if (address) msg += `\n📍 *Address:* ${address}`;
    if (note) msg += `\n📝 *Note:* ${note}`;

    msg += isPreOrder
      ? `\n\nThis item is currently out of stock — please confirm pre-order details and expected timeline. 🙏`
      : `\n\nPlease confirm availability. 🙏`;
    return encodeURIComponent(msg);
  },

  getWhatsAppURL(product, size, color, customer = {}) {
    const msg = CONFIG.buildWhatsAppMessage(product, size, color, customer);
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${msg}`;
  },

  // ── SEO defaults ──────────────────────────────────────────
  SEO: {
    defaultTitle: "Kicksy Nepal | Premium Shoes at Affordable Prices",
    defaultDescription:
      "Shop premium quality sneakers and footwear online in Nepal. Nike, Adidas, Puma, New Balance & more. Nationwide delivery. Easy WhatsApp ordering.",
    keywords:
      "premium shoes Nepal, online shoe store Nepal, affordable sneakers Nepal, sneakers in Nepal, footwear Nepal, Kicksy Nepal, buy shoes online Nepal",
    ogImage: "https://kicksy.com.np/assets/images/og-image.jpg",
  },
};

// ── Fallback sample products (shown if API fails) ─────────────
const SAMPLE_PRODUCTS = [
  {
    id: "nike-air-force-1",
    sku: "NK-AF1-001",
    name: "Nike Air Force 1 Low",
    brand: "Nike",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 5000,
    salePrice: 4500,
    description:
      "The legendary Nike Air Force 1 Low brings crisp leather edges and the ultimate court classic aesthetic to your rotation.",
    shortDescription: "Iconic low-top sneaker.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/af1.webp?updatedAt=1781324454108",
    image2:
      "https://ik.imagekit.io/roshanxshrestha/products/af1.webp?updatedAt=1781324454108",
    image3:
      "https://ik.imagekit.io/roshanxshrestha/products/af1.webp?updatedAt=1781324454108",
    image4:
      "https://ik.imagekit.io/roshanxshrestha/products/af1.webp?updatedAt=1781324454108",
    image5:
      "https://ik.imagekit.io/roshanxshrestha/products/af1.webp?updatedAt=1781324454108",
    sizes: "36,37,38,39,40,41,42,43",
    colors: "White",
    stockJson:
      '{"White":{"36":10,"37":10,"38":10,"39":10,"40":10,"41":10,"42":10,"43":10,"44":10},"Black":{"36":10,"37":10,"38":10,"39":10,"40":10,"41":10,"42":10,"43":10}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: false,
    newArrival: false,
    tags: "classic, low-top, lifestyle, af1, panda, contrast",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-13",
  },
  {
    id: "adidas-samba-og",
    sku: "AD-SB-002",
    name: "Samba OG",
    brand: "Adidas",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 5200,
    salePrice: 4700,
    description:
      "The timeless low-profile football icon turned street staple, featuring a crisp leather upper, soft suede overlays, and the signature gum sole.",
    shortDescription: "Retro low-profile sneaker with iconic gum sole.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/sambawhite.webp?updatedAt=1781333556548",
    image2: "https://ik.imagekit.io/roshanxshrestha/products/sambablack.webp",
    image3: "",
    image4: "",
    image5: "",
    sizes: "36,37,38,39,40,41,42,43",
    colors: "White,Black",
    stockJson:
      '{"White":{"36":10,"37":10,"38":10,"39":10,"40":10,"41":10,"42":10,"43":10,"44":10},"Black":{"36":10,"37":10,"38":10,"39":10,"40":10,"41":10,"42":10,"43":10}}',
    available: true,
    featured: false,
    bestSeller: true,
    dailyPick: false,
    newArrival: false,
    tags: "retro,casual,low-profile",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-13",
  },
  {
    id: "new-balance-327-grey",
    sku: "NB-327-005",
    name: "New Balance 327",
    brand: "New Balance",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 5800,
    description:
      "Inspired by 1970s heritage designs, the 327 boasts a bold angular silhouette, wrap-around trail lug outsole, and an oversized asymmetric 'N' logo.",
    shortDescription: "Retro 70s runner design with oversized branding.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/nb327.webp?updatedAt=1781359946033",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42,43",
    colors: "MOONBEAM with BLACK",
    stockJson:
      '{"MOONBEAM with BLACK":{"39":0,"40":0,"41":0,"42":0,"43":0,"44":0}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: false,
    newArrival: false,
    tags: "casual,70s,heritage",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-03-05",
  },
  {
    id: "nike-blazer-mid-77-vintage",
    sku: "NK-BZ-003",
    name: "Blazer Mid '77 Vintage",
    brand: "Nike",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 5500,
    description:
      "Vintage hoops style meets modern streetwear. Features a smooth white leather upper, grey suede accents near the toe, and a striking black retro swoosh.",
    shortDescription: "Classic mid-top hoops sneaker with vintage finish.",
    image1: "https://ik.imagekit.io/roshanxshrestha/products/blazer.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "36,37,38,39,40,41,42,43,44",
    colors: "White",
    stockJson:
      '{"White":{"36":10,"37":10,"38":10,"39":10,"40":10,"41":10,"42":10,"43":10}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: false,
    newArrival: true,
    tags: "mid-top,vintage,basketball",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
  {
    id: "asics-gel-kayano-14-white-blue",
    sku: "1203A537-115",
    name: "ASICS GEL-Kayano 14 White Light Navy",
    brand: "ASICS",
    category: "Sportstyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 6000,
    description:
      "The GEL-Kayano 14 sneaker resurfaces with its late 2000s running aesthetic as a nod to the storied ASICS running archive. Reinterpreting the shoe's elite performance capabilities with updated lifestyle componentry, this silhouette features pristine white open-mesh uppers layered with striking midnight metallic blue synthetic leather paneling. Complemented with signature visible GEL technology underfoot for advanced impact absorption.",
    shortDescription:
      "A late-2000s running retro classic reimagined with metallic blue overlays and signature GEL cushioning.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/asicsKayano14whiteblue.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42,43",
    colors: "White",
    stockJson: '{"White":{"39":6,"40":8,"41":10,"42":12,"43":10}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: false,
    newArrival: false,
    tags: "asics, gel-kayano, running, retro, sportstyle, metallic-blue, y2k",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-13",
  },
  {
    id: "nike-p-6000",
    sku: "CD6404-007",
    name: "Nike P-6000",
    brand: "Nike",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 6000,
    description:
      "A mashup of Pegasus sneakers from the past, the Nike P-6000 Metallic Silver features breathable open mesh wrapped in horizontal and vertical metallic synthetic leather overlays. This runner-inspired design channels early 2000s running style, delivering retro track-day aesthetics mixed with modern city comfort via its cushioned foam midsole.",
    shortDescription:
      "A Y2K-inspired running profile featuring open mesh construction and reflective metallic silver panels.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/NIKEP-6000MetallicSilver.webp",
    image2:
      "https://ik.imagekit.io/roshanxshrestha/products/NIKEP-6000Green.webp",
    image3:
      "https://ik.imagekit.io/roshanxshrestha/products/NIKEP-6000lightIron.webp",
    image4: "",
    image5: "",
    sizes: "39,40,41,42,43",
    colors: "Metallic Silver, Green, Light Iron",
    stockJson:
      '{"Metallic Silver":{"39":10,"40":10,"41":10,"42":10,"43":0},"Green":{"39":10,"40":10,"41":10,"42":10,"43":10},"Light Iron":{"39":10,"40":10,"41":10,"42":10,"43":10}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: false,
    newArrival: true,
    tags: "nike, p6000, running, retro, metallic-silver, y2k, mesh",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-13",
  },
  {
    id: "nike-p-6000-oracle",
    sku: "CD6404-008",
    name: "Nike P-6000",
    brand: "Nike",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 6000,
    description:
      "A mashup of Pegasus sneakers from the past, the Nike P-6000 Metallic Silver features breathable open mesh wrapped in horizontal and vertical metallic synthetic leather overlays. This runner-inspired design channels early 2000s running style, delivering retro track-day aesthetics mixed with modern city comfort via its cushioned foam midsole.",
    shortDescription:
      "A Y2K-inspired running profile featuring open mesh construction and reflective metallic silver panels.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/NIKEP-6000-oracleAqua.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42,43",
    colors: "Oracle Aqua",
    stockJson: '{"Oracle Aqua":{"39":10,"40":10,"41":10,"42":10,"43":10}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: false,
    newArrival: true,
    tags: "nike, p6000, running, retro, metallic-silver, y2k, mesh",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-13",
  },
  {
    id: "nike-jordan-1-midnight navy",
    sku: "NK-AJ1-002",
    name: "Jordan Air 1 Retro High CO.JP Midnight Navy (GS)",
    brand: "Nike",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 6000,
    description:
      "A brilliant revival of a classic 2001 Japan-exclusive release, the Air Jordan 1 Retro High OG CO.JP Midnight Navy (GS) features a crisp white leather base accented by premium Midnight Navy nubuck overlays.",
    shortDescription:
      "A premium Grade School edition of the iconic 2001 CO.JP 'Midnight Navy' colorway.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/air-jordan-1-retro-high-midnight-navy.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "36,37,38,39",
    colors: "Midnight Navy",
    stockJson: '{"Midnight Navy": { "36": 10, "37": 10, "38": 10, "39": 10}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: false,
    newArrival: true,
    tags: "jordan, air jordan 1, high top, co.jp, midnight navy, gs",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-02-01",
  },
  {
    id: "nike-air-force-1-black",
    sku: "NK-AF1-001",
    name: "Nike Air Force 1 Low Black",
    brand: "Nike",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6000,
    salePrice: 5500,
    description:
      "The legendary Nike Air Force 1 Low brings crisp leather edges and the ultimate court classic aesthetic to your rotation.",
    shortDescription: "Iconic low-top sneaker.",
    image1: "https://ik.imagekit.io/roshanxshrestha/products/af1black.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "36,37,38,39,40,41,42,43,44",
    colors: "Black",
    stockJson:
      '{"Black":{"36":0,"37":0,"38":0,"39":0,"40":10,"41":0,"42":0,"43":0,"44":0}}',
    available: true,
    featured: false,
    bestSeller: false,
    dailyPick: false,
    newArrival: false,
    tags: "classic, low-top, lifestyle, af1, panda, contrast",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-13",
  },
  {
    id: "adidas-superstar-white-green",
    sku: "EG4958",
    name: "Adidas Superstar White Green",
    brand: "Adidas",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 6000,
    description:
      "Originally made for basketball courts in the '70s and celebrated by hip-hop royalty in the '80s, the adidas Superstar shoe is now a lifestyle staple for streetwear enthusiasts. This classic edition features a smooth coated leather upper, the world-famous protective rubber shell toe, and the iconic serrated contrast 3-Stripes branding.",
    shortDescription:
      "The iconic low-top classic featuring the signature protective rubber shell toe and serrated 3-Stripes.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/superstargreen.webp?updatedAt=1781324453979",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "35",
    colors: "White Green",
    stockJson: '{"White Green":{"35":1}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: true,
    newArrival: true,
    tags: "adidas, superstar, shell-toe, classic, retro, low-top, lifestyle",
    rating: 5,
    reviewCount: 100,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-13",
  },
  {
    id: "nike-sb-air-jordan-4-pine-green",
    sku: "DR5415-103",
    name: "Nike SB x Air Jordan 4 Pine Green",
    brand: "Nike",
    category: "Sneakers",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 5500,
    description:
      "A historic skate-ready collaboration, the Nike SB x Air Jordan 4 Retro Pine Green features a smooth sail leather upper with soft neutral grey suede overlays on the toe box for increased durability. Striking Pine Green accents land on the eyelets, heel tab, and midsole, while a flexible, re-engineered cushioning setup and responsive gum rubber outsole sections deliver elite board feel and timeless skate-to-court style.",
    shortDescription:
      "The legendary skate-engineered crossover silhouette featuring premium sail leather, green accents, and a gum sole.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/jordan4-pinegreen.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42,43",
    colors: "Pine Green",
    stockJson: '{"Pine Green":{"40":6}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: true,
    newArrival: false,
    tags: "nike-sb, jordan-4, pine-green, retro, collaboration, skate, gum-sole",
    rating: 4.9,
    reviewCount: 142,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
  {
    id: "nike-air-force-1-low-07-prm-2",
    sku: "AT4143-100",
    name: "Nike Air Force 1 Low Molten Metal",
    brand: "Nike",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 5800,
    description:
      "Elevating the legendary 1982 hardwood pioneer, the Nike Air Force 1 Low '07 PRM 2 utilizes ultra-premium tumbled leather uppers combined with unique design elements like a textured custom heel tab and a sleek, standout Swoosh execution. Complete with its classic chunky profile, signature star-patterned toe bumper bumpers, and encapsulated Nike Air cushioning within a durable rubber cupsole structure.",
    shortDescription:
      "A premium material upgrade to the classic '07 silhouette featuring luxury tumbled leather paneling.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/AF1-Molten-Metal.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42",
    colors: "White",
    stockJson: '{"White":{"39":10,"40":10,"41":10,"42":10}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: false,
    newArrival: true,
    tags: "nike, af1, premium, prm, air-force-1, white-sneaker, street-classic",
    rating: 4.8,
    reviewCount: 46,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
  {
    id: "nike-sb-dunk-low-black-pigeon",
    sku: "883232-008",
    name: "Nike SB Dunk Low Black Pigeon",
    brand: "Nike",
    category: "Sneakers",
    gender: "Unisex",
    productType: "shoe",
    price: 7300,
    salePrice: 6800,
    description:
      "Created in collaboration with streetwear legend Jeff Staple, the Nike SB Dunk Low Black Pigeon features an ultra-clean black and anthracite nubuck and leather upper. The sneaker pays homage to the legendary 2005 original with its signature vibrant orange outsole, matching orange tongue branding, and the iconic embroidered Staple Pigeon logo prominently stitched onto the lateral heel panel. Built with a padded SB tongue and Zoom Air cushioning for premium skate performance.",
    shortDescription:
      "The historic Jeff Staple collaboration featuring a blacked-out upper, orange accents, and the iconic embroidered heel pigeon.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/bpigeondunk.webp?updatedAt=1781324454281",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "40",
    colors: "Black",
    stockJson: '{"Black":{"40":1}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: true,
    newArrival: false,
    tags: "nike-sb, dunk-low, pigeon, jeff-staple, black-pigeon, limited-edition, retro",
    rating: 5,
    reviewCount: 72,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
  {
    id: "air-jordan-4-rm-nigel-brick-by-brick",
    sku: "HF4334-001",
    name: "Air Jordan 4 RM Nigel Sylvester Brick by Brick",
    brand: "Nike",
    category: "Sneakers",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 5800,
    description:
      "A special collaboration with BMX athlete Nigel Sylvester, the Air Jordan 4 RM 'Brick by Brick' features a sleek anthracite and fence-grey upper composed of premium suede and durable mesh. This remastered low-profile silhouette honors his childhood driveway with subtle 'BIKE Air' branding on the TPU heel cage and a university red mini-swoosh at the forefoot. Built with a supportive flexible cage and classic encapsulated visible Air cushioning.",
    shortDescription:
      "Nigel Sylvester's low-profile Jordan 4 RM collaboration featuring 'BIKE Air' branding and premium grey suede.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/air-jordan-4-nigel-brick-by-brick.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42,43",
    colors: "Brick by Brick",
    stockJson: '{"Brick by Brick":{"39":10,"40":10,"41":10,"42":10,"43":10}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: false,
    newArrival: true,
    tags: "jordan, jordan-4, nigel-sylvester, bike-air, brick-by-brick, rm, low-top",
    rating: 4.9,
    reviewCount: 54,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
  {
    id: "jordan-1-retro-high-og-sp-travis-scott-mocha",
    sku: "CD4487-100",
    name: "Jordan 1 Retro High OG SP Travis Scott Mocha",
    brand: "Nike",
    category: "Sneakers",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 5800,
    description:
      "A historic collaboration that reshaped sneaker culture, the Travis Scott x Air Jordan 1 Retro High features a premium sail leather upper contrasted by rich Dark Mocha nubuck overlays. The defining detail is the oversized, backward-facing black leather Swoosh on the lateral side, while a hidden stash pocket built into the nylon collar adds utility. Finished with Cactus Jack branding on the tongue and heel.",
    shortDescription:
      "The legendary Travis Scott collaboration featuring signature backward Swoosh design and premium dark mocha paneling.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/jordan-1-high-og-sp-x-travis-scott-mocha.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42",
    colors: "Mocha",
    stockJson: '{"Mocha":{"39":10,"40":10,"41":10,"42":10}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: false,
    newArrival: false,
    tags: "jordan, air-jordan-1, high-top, travis-scott, cactus-jack, mocha, hype",
    rating: 4.9,
    reviewCount: 198,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
  {
    id: "jordan-1-retro-high-og-rare-air",
    sku: "DZ5485-400",
    name: "Jordan 1 Retro High OG Rare Air",
    brand: "Nike",
    category: "Sneakers",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 5800,
    description:
      "A unique variation that pays homage to early Air Jordan production samples, the Air Jordan 1 Retro High OG Rare Air features a premium full-grain leather base. The standout feature is the removal of the traditional Wings logo, replaced instead with vintage block-letter 'AIR JORDAN' text stamped cleanly onto the ankle collar. Built with a traditional nylon tongue and an encapsulated Nike Air unit in the heel for classic court comfort.",
    shortDescription:
      "A retro OG high-top variation featuring premium full-grain leather and vintage block-letter ankle branding.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/Nike-Air-Jordan-1-Retro-High-OG-Rare-Air-Deep-Royal-Blue.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42",
    colors: "Laser Blue",
    stockJson: '{"Laser Blue":{"39":10,"40":10,"41":10,"42":10}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: false,
    newArrival: true,
    tags: "jordan, air-jordan-1, high-top, rare-air, retro, classic, og-leather",
    rating: 4.7,
    reviewCount: 28,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
  {
    id: "jordan-11-retro-black-white",
    sku: "CT8012-170",
    name: "Air Jordan 11 Retro Black and White",
    brand: "Nike",
    category: "Sneakers",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 5500,
    description:
      "Celebrating the timeless legacy of Tinker Hatfield's legendary design, the Air Jordan 11 Retro Black and White features a premium smooth leather upper contrasted by a striking, high-gloss black patent leather mudguard overlay. Styled with elegant metallic accents and a signature translucent outsole, this iconic mid-top silhouette houses a full-length carbon fiber shank plate and encapsulated Air cushioning for ultimate low-profile performance and comfort.",
    shortDescription:
      "The legendary mid-top silhouette featuring a premium white leather base and signature black patent leather mudguard.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/airjordan_11retromjday_whiteblack.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42",
    colors: "Black White",
    stockJson: '{"Black White":{"39":10,"40":10,"41":10,"42":10}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: false,
    newArrival: true,
    tags: "jordan, air-jordan-11, patent-leather, retro, gratitude, mid-top, lifestyle",
    rating: 4.9,
    reviewCount: 82,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
  {
    id: "jordan-1-retro-low-og-sp-travis-scott-reverse",
    sku: "DM7866-162",
    name: "Jordan 1 Retro Low OG SP Travis Scott Reverse Mocha",
    brand: "Nike",
    category: "Sneakers",
    gender: "Unisex",
    productType: "shoe",
    price: 6000,
    salePrice: 5500,
    description:
      "Flashing a flipped color palette of the 2019 original High, the Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha' combines a rich brown nubuck base with clean off-white leather overlays. Travis Scott's signature oversized, backward-facing leather Swoosh adorns the lateral side with a sail finish, matching the vintage-toned midsole. Distinctive Cactus Jack branding is embroidered on the medial side and tongue, while mismatched heel tabs feature the Jordan Wings and Travis Scott's hand-drawn face logo.",
    shortDescription:
      "The iconic Travis Scott low-top collaboration featuring a reversed mocha palette and oversized backward sail Swoosh.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/revmocha.webp?updatedAt=1781324454092",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42,43",
    colors: "Reverse Mocha",
    stockJson: '{"Reverse Mocha":{"39":10,"40":10,"41":10,"42":10,"43":10}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: false,
    newArrival: false,
    tags: "jordan, air-jordan-1, low-top, travis-scott, cactus-jack, reverse-mocha, hype",
    rating: 4.9,
    reviewCount: 245,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
  {
    id: "nike-air-max-plus-black-metallic-gold",
    sku: "CD7061-001",
    name: "Nike Air Max Plus Black Metallic Gold (2019)",
    brand: "Nike",
    category: "Lifestyle",
    gender: "Unisex",
    productType: "shoe",
    price: 6500,
    salePrice: 5800,
    description:
      "Originally debuting in 1998 under the visionary design of Sean McDowell, the Nike Air Max Plus Black Metallic Gold features a sleek black mesh upper stabilized by its iconic TPU wavy cage overlays dipped in a high-gloss metallic gold finish. This street staple showcases a polished gold midfoot whale-tail shank, classic Tuned Air branding on the heel, and visible Air Max cushioning units in both the forefoot and heel for responsive daily comfort.",
    shortDescription:
      "McDowell's classic Tuned Air silhouette featuring striking metallic gold wavy overlays on a black mesh base.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/products/nike-tn-air-max-plus-black-metallic-gold-front.webp",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "39,40,41,42,43",
    colors: "Black Metallic Gold",
    stockJson:
      '{"Black Metallic Gold":{"39":10,"40":10,"41":10,"42":10,"43":10}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: true,
    newArrival: true,
    tags: "nike, air-max, tn, air-max-plus, tuned-air, metallic-gold, retro-runner",
    rating: 4.8,
    reviewCount: 64,
    deliveryInfo: "3–5 working days",
    createdAt: "2026-06-14",
  },
];

// ── Leather goods sample products ─────────────────────────────
// productType: "leather" distinguishes these from shoes.
// `category` here represents the leather sub-category (used for
// filtering on the Leather Goods page).
const SAMPLE_LEATHER_PRODUCTS = [
  {
    id: "leather-bifold-wallet-001",
    sku: "LW-BF-001",
    name: "Classic Bifold Wallet",
    brand: "Kicksy Leather",
    category: "Wallets",
    gender: "Unisex",
    productType: "leather",
    price: 3500,
    salePrice: 2499,
    description: "Handcrafted from full-grain leather...",
    shortDescription: "Slim full-grain leather bifold with 6 card slots.",
    image1:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "Standard",
    colors: "Brown",
    stockJson: '{"Brown":{"Standard":8}}',
    available: false,
    featured: true,
    bestSeller: true,
    dailyPick: false,
    newArrival: false,
    tags: "wallet,leather,bifold",
    rating: 4.8,
    reviewCount: 64,
    deliveryInfo: "3–5 working days",
    createdAt: "2025-04-01",
  },
  {
    id: "leather-laptop-sleeve-13-001",
    sku: "LW-LS13-001",
    name: "Laptop Sleeve 13-inch",
    brand: "Kicksy Leather",
    category: "Laptop Sleeves",
    gender: "Unisex",
    productType: "leather",
    price: 5500,
    salePrice: 3999,
    description: "Protect your laptop in style...",
    shortDescription: "Premium leather sleeve for 13-inch laptops.",
    image1:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=600&q=80",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    sizes: "13-inch,14-inch,15-inch",
    colors: "Brown",
    stockJson: '{"Brown":{"13-inch":4,"14-inch":3,"15-inch":2}}',
    available: false,
    featured: true,
    bestSeller: true,
    dailyPick: false,
    newArrival: false,
    tags: "laptop,sleeve,leather",
    rating: 4.9,
    reviewCount: 38,
    deliveryInfo: "3–5 working days",
    createdAt: "2025-04-12",
  },
  {
    id: "KL-1001",
    sku: "KL-ENV-GLS-BRN",
    name: "Leather Envelope Glasses Case",
    brand: "Kicksy Leather",
    category: "Sunglass Cases",
    gender: "Unisex",
    productType: "leather",
    price: 2500,
    salePrice: 1999,
    description:
      "An elegant, envelope-style glasses case crafted from top-grain, vegetable-tanned, high-quality genuine leather in a rich brown hue. It features a smooth exterior finish with a soft interior texture to protect your eyewear from scratches. The minimalist design includes an envelope flap with magnets to securely hold the cover in place, finished with finely stitched edges.",
    shortDescription:
      "Minimalist brown top-grain genuine leather glasses case with a secure magnetic envelope flap closure.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/1.webp?updatedAt=1781537358361",
    image2:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/2.webp?updatedAt=1781537358521",
    image3:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/3.webp?updatedAt=1781537358417",
    image4:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/4.webp?updatedAt=1781537358274",
    image5:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/5.webp?updatedAt=1781537357349",
    sizes: "Standard",
    colors: "Brown",
    stockJson: '{"Brown":{"Standard":9}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: true,
    newArrival: true,
    tags: "Sunglasses Case, Genuine Leather, Top Grain Leather, Envelope Flap, Magnetic Closure, Brown",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "5-7 days all over Nepal",
    createdAt: "2026-06-15",
  },
  {
    id: "KL-1002",
    sku: "KL-MIN-WLT-DBRN",
    name: "Minimalist Leather Fold Wallet",
    brand: "Kicksy Leather",
    category: "Wallets",
    gender: "Unisex",
    productType: "leather",
    price: 3000,
    salePrice: 2499,
    description:
      "Crafted from top-grain, vegetable-tanned, high-quality genuine leather, this minimalist brown wallet features a sleek, origami-inspired folding design. It includes a flap closure and a unique diagonal interior slot perfect for holding cards. The slim profile fits comfortably in the hand or pocket, while the interior showcases the leather's natural, soft sueded texture.",
    shortDescription:
      "Minimalist dark brown top-grain genuine leather folded wallet with a diagonal interior card slot.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/6.webp?updatedAt=1781537358116",
    image2:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/7.webp?updatedAt=1781537358434",
    image3:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/8.webp?updatedAt=1781537357595",
    image4:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/8.webp?updatedAt=1781537357595",
    image5:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/10.webp?updatedAt=1781537358406",
    sizes: "Standard",
    colors: "Brown",
    stockJson: '{"Brown":{"Standard":9}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: true,
    newArrival: true,
    tags: "Wallet, Cardholder, Genuine Leather, Top Grain Leather, Minimalist, Dark Brown, Folded",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "5-7 days all over Nepal",
    createdAt: "2026-06-15",
  },
  {
    id: "KL-1003",
    sku: "KL-TLT-BAG-BRN",
    name: "Toiletry Bag",
    brand: "Kicksy Leather",
    category: "Bags",
    gender: "Unisex",
    productType: "leather",
    price: 4500,
    salePrice: 3499,
    description:
      "Crafted from top-grain, vegetable-tanned, high-quality genuine leather, this spacious brown toiletry bag is perfect for organizing travel and daily grooming essentials. The classic rectangular dopp kit design features a sturdy top metal zipper closure, a convenient side carry loop handle, and a fully lined interior complete with an internal zippered pocket for secure storage.",
    shortDescription:
      "Premium brown top-grain genuine leather toiletry bag with a side handle, top zipper, and interior pocket.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/11.webp?updatedAt=1781537357748",
    image2:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/12.webp?updatedAt=1781537358297",
    image3:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/13.webp?updatedAt=1781537358477",
    image4:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/14.webp?updatedAt=1781537357592",
    image5:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/15.webp?updatedAt=1781537357388",
    sizes: "9.5in. x 5in. x 5in.",
    colors: "Brown",
    stockJson: '{"Brown":{"9.5in. x 5in. x 5in.":9}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: true,
    newArrival: true,
    tags: "Toiletry Bag, Dopp Kit, Wash Bag, Genuine Leather, Top Grain Leather, Brown, Travel Accessories",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "5-7 days all over Nepal",
    createdAt: "2026-06-15",
  },
  {
    id: "KL-1004",
    sku: "KL-PPT-CVR-BRN",
    name: "Passport Cover",
    brand: "Kicksy Leather",
    category: "Accessories",
    gender: "Unisex",
    productType: "leather",
    price: 2500,
    salePrice: 1999,
    description:
      "Keep your travel documents safe and stylish with this premium brown passport cover. Crafted from top-grain, vegetable-tanned, high-quality genuine leather, it features a sleek, minimalist exterior. Inside, you'll find a dedicated slot to securely hold your passport, alongside additional card slots for IDs or credit cards. The fine stitching and smooth finish highlight the leather's natural texture, making it a perfect travel companion.",
    shortDescription:
      "Minimalist brown top-grain genuine leather passport cover with interior card slots.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/16.webp?updatedAt=1781537358457",
    image2:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/17.webp?updatedAt=1781537358516",
    image3:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/18.webp?updatedAt=1781537358303",
    image4:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/19.webp?updatedAt=1781537357501",
    image5: "",
    sizes: "Standard",
    colors: "Brown",
    stockJson: '{"Brown":{"Standard":9}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: true,
    newArrival: true,
    tags: "Passport Cover, Travel Accessories, Genuine Leather, Top Grain Leather, Brown, Card Slots",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "5-7 days all over Nepal",
    createdAt: "2026-06-15",
  },
  {
    id: "KL-1005",
    sku: "KL-PHN-SLV-BRN",
    name: "Phone Sleeve",
    brand: "Kicksy Leather",
    category: "Accessories",
    gender: "Unisex",
    productType: "leather",
    price: 2000,
    salePrice: 1499,
    description:
      "Crafted from top-grain, vegetable-tanned, high-quality genuine leather, this minimalist brown phone sleeve offers sleek and elegant protection for your device. It features a slim, slip-in design with precisely stitched edges and a smooth finish that highlights the natural leather texture. The open-top access ensures you can easily slide your phone in and out while keeping it secure from daily scratches.",
    shortDescription:
      "Minimalist brown top-grain genuine leather phone sleeve with a slim slip-in design.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/21.webp?updatedAt=1781537358443",
    image2:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/22.webp?updatedAt=1781537357307",
    image3:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/23.webp?updatedAt=1781537358498",
    image4:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/23.webp?updatedAt=1781537358498",
    image5:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/25.webp?updatedAt=1781537358482",
    sizes: "Fits upto iPhone 17 Pro Max with case",
    colors: "Brown",
    stockJson: '{"Brown":{"Fits upto iPhone 17 Pro Max with case":9}}',
    available: true,
    featured: true,
    bestSeller: true,
    dailyPick: true,
    newArrival: true,
    tags: "Phone Sleeve, Phone Pouch, Tech Accessories, Genuine Leather, Top Grain Leather, Minimalist, Brown",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "5-7 days all over Nepal",
    createdAt: "2026-06-15",
  },
  {
    id: "KL-1006",
    sku: "KL-PEN-SLV-DBRN",
    name: "Pen Sleeve",
    brand: "Kicksy Leather",
    category: "Accessories",
    gender: "Unisex",
    productType: "leather",
    price: 600,
    salePrice: 399,
    description:
      "Crafted from top-grain, vegetable-tanned, high-quality genuine leather, this sleek dark brown pen sleeve is the ideal accessory for protecting your finest writing instruments, whether it's a daily carry or a cherished Waterman Paris rollerball pen. It features a slim, single-pen capacity with a convenient slip-in design and a beautifully contoured opening for easy access. The smooth finish and precise stitching highlight the leather's natural, premium texture.",
    shortDescription:
      "Sleek dark brown top-grain genuine leather single pen sleeve with a contoured slip-in design.",
    image1:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/26.webp?updatedAt=1781537358427",
    image2:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/27.webp?updatedAt=1781537358327",
    image3:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/28.webp?updatedAt=1781537358523",
    image4:
      "https://ik.imagekit.io/roshanxshrestha/Kicksy%20Leather%20Images/29.webp?updatedAt=1781537358399",
    image5: "",
    sizes: "Standard",
    colors: "Dark Brown",
    stockJson: '{"Brown":{"Standard":9}}',
    available: true,
    featured: true,
    bestSeller: false,
    dailyPick: false,
    newArrival: true,
    tags: "Pen Sleeve, Pen Case, Stationery, Office Accessories, Genuine Leather, Top Grain Leather, Dark Brown, Single Pen",
    rating: 5,
    reviewCount: 99,
    deliveryInfo: "5-7 days all over Nepal",
    createdAt: "2026-06-15",
  },
];

const SAMPLE_TESTIMONIALS = [
  {
    id: "t1",
    customerName: "Ram Shrestha",
    review:
      "Ordered Nike Air Force 1s and they arrived perfectly. Quality is premium at a great price!",
    productName: "Nike Air Force 1 Low",
    rating: 5,
    active: true,
  },
  {
    id: "t2",
    customerName: "Rohan Tamang",
    review: "Fast delivery to Pokhara! Easy WhatsApp ordering. Will buy again.",
    productName: "Adidas Stan Smith",
    rating: 5,
    active: true,
  },
  {
    id: "t3",
    customerName: "Sita Gurung",
    review: "Great quality shoes and always genuine. 10/10 recommend!",
    productName: "Converse Chuck Taylor",
    rating: 5,
    active: true,
  },
];

const SAMPLE_OFFERS = [
  {
    id: "o1",
    title: "Free Delivery This Week",
    description: "Free delivery on orders above Rs. 6000",
    badgeText: "FREE DELIVERY",
    active: true,
    priority: 1,
  },
  {
    id: "o2",
    title: "Launch Offer",
    description: "Massive discounts on Leather goods",
    badgeText: "LEATHER DISCOUNTS",
    active: true,
    priority: 2,
  },
];

const SAMPLE_COUPONS = [
  {
    id: "c1",
    title: "4th Order Discount",
    description: "10% off on your 4th order",
    type: "percent",
    value: 10,
    active: true,
    note: "Mention when ordering on WhatsApp",
  },
];

if (typeof module !== "undefined")
  module.exports = {
    CONFIG,
    SAMPLE_PRODUCTS,
    SAMPLE_LEATHER_PRODUCTS,
    SAMPLE_TESTIMONIALS,
    SAMPLE_OFFERS,
    SAMPLE_COUPONS,
  };
