/* ========================================
   African Pride — Product Data
   To add a product: copy one block, change the details,
   and drop its photos into /images (use .webp or .jpg).
   ======================================== */

const IMG = 'images/';

const PRODUCTS = [
  {
    id: 'signature-tee',
    name: 'Heritage Signature Tee',
    type: 'Crew Neck',
    price: 48,
    featured: true,
    hasWordmark: false,
    defaultColor: 'black',
    colors: {
      black: { label: 'Black',     image: IMG + 'tee-signature-black.webp' },
      white: { label: 'White',     image: IMG + 'tee-signature-white.webp' },
      grey:  { label: 'Grey',      image: IMG + 'tee-signature-grey.webp'  },
      navy:  { label: 'Navy Blue', image: IMG + 'tee-signature-navy.webp'  },
    },
  },
  {
    id: 'collar-tee',
    name: 'Heritage Collar Tee',
    type: 'Crew Neck',
    price: 48,
    featured: true,
    hasWordmark: true,
    defaultColor: 'navy',
    colors: {
      navy:  { label: 'Navy Blue', image: IMG + 'tee-collar-navy.webp'  },
      black: { label: 'Black',     image: IMG + 'tee-collar-black.webp' },
      white: { label: 'White',     image: IMG + 'tee-collar-white.webp' },
    },
  },
  {
    id: 'heritage-tank',
    name: 'Heritage Tank',
    type: 'Sleeveless',
    price: 42,
    featured: true,
    hasWordmark: true,
    defaultColor: 'black',
    colors: {
      black: { label: 'Black', image: IMG + 'tank-black.webp' },
    },
  },
];
