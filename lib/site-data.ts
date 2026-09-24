export type Product = {
  slug: string;
  name: string;
  botanical: "Lemongrass" | "Tulsi";
  type: "Essential Oil" | "Hydrosol" | "Air Freshener";
  href: string;
  image: string;
  short: string;
  applications: string[];
  seoTitle: string;
  seoDescription: string;
};

export const company = {
  legalName: "VG Naturals Private Limited",
  brand: "VG Naturals",
  headerName: "VG Naturals Pvt Ltd",
  tagline: "Pure • Natural • Organic Care",
  phone: "+91 90442 10088",
  phoneDisplay: "90442 10088",
  email: "vgnaturalspvtltd@gmail.com",
  address: "1248 Royal City Phase 2, Aurangabad Jagir, B R A University, Lucknow – 226025, Uttar Pradesh, India",
  whatsappNumber: "919044210088",
  whatsappBase: "https://wa.me/919044210088",
  social: {
    instagram: "https://www.instagram.com/vgnaturals_pvt_ltd/",
    facebook: "https://www.facebook.com/profile.php?id=61593880927070",
  },
};

export const sampleSizes = [
  { size: "50 ml", price: 300 },
  { size: "100 ml", price: 450 },
];

export const products: Product[] = [
  {
    slug: "lemongrass-essential-oil",
    name: "Lemongrass Essential Oil",
    botanical: "Lemongrass",
    type: "Essential Oil",
    href: "/products/lemongrass/lemongrass-essential-oil",
    image: "/products/lemongrass-duo.jpg",
    short: "A citrus-forward botanical essential oil positioned for fragrance, personal care, home-care and formulation applications.",
    applications: ["Personal care formulations", "Soap and home care", "Fragrance and perfumery", "Aromatherapy and wellness products", "Natural product formulations"],
    seoTitle: "Lemongrass Essential Oil Supplier in India | VG Naturals",
    seoDescription: "Explore Lemongrass Essential Oil from VG Naturals for B2B formulation, fragrance, personal care and home-care applications. 50 ml and 100 ml samples available.",
  },
  {
    slug: "lemongrass-hydrosol",
    name: "Lemongrass Hydrosol",
    botanical: "Lemongrass",
    type: "Hydrosol",
    href: "/products/lemongrass/lemongrass-hydrosol",
    image: "/products/lemongrass-hydrosol-single.jpg",
    short: "A botanical aromatic water suited to product development, personal care, home-care and fragrance applications where a lighter botanical format is preferred.",
    applications: ["Cosmetic and personal care formulations", "Face and body product development", "Home-care formulations", "Aromatic products", "Natural product development"],
    seoTitle: "Lemongrass Hydrosol Supplier in India | VG Naturals",
    seoDescription: "Source Lemongrass Hydrosol from VG Naturals for B2B product development and formulation applications. Request 50 ml or 100 ml samples or a bulk quote.",
  },
  {
    slug: "lemongrass-air-freshener",
    name: "Lemongrass Air Freshener",
    botanical: "Lemongrass",
    type: "Air Freshener",
    href: "/products/lemongrass/lemongrass-air-freshener",
    image: "/products/lemongrass-duo.jpg",
    short: "A fresh lemongrass-fragrance format for home, workspace and hospitality-oriented fragrance applications.",
    applications: ["Home fragrance", "Workspace and office fragrance", "Hospitality applications", "Retail and private-label concepts", "Natural fragrance product development"],
    seoTitle: "Lemongrass Air Freshener Supplier | VG Naturals",
    seoDescription: "Explore Lemongrass Air Freshener from VG Naturals for home, workspace, hospitality and private-label fragrance applications. Sample sizes available.",
  },
  {
    slug: "tulsi-essential-oil",
    name: "Tulsi Essential Oil",
    botanical: "Tulsi",
    type: "Essential Oil",
    href: "/products/tulsi/tulsi-essential-oil",
    image: "/products/tulsi-oil-lineup.jpg",
    short: "A distinctive Tulsi botanical oil for fragrance, personal care, aromatherapy and natural formulation applications.",
    applications: ["Personal care formulations", "Soap and home care", "Fragrance and perfumery", "Aromatherapy and wellness products", "Natural product formulations"],
    seoTitle: "Tulsi Essential Oil Supplier in India | VG Naturals",
    seoDescription: "Explore Tulsi Essential Oil from VG Naturals for B2B personal care, fragrance, soap, wellness and natural product applications. Sample sizes available.",
  },
  {
    slug: "tulsi-hydrosol",
    name: "Tulsi Hydrosol",
    botanical: "Tulsi",
    type: "Hydrosol",
    href: "/products/tulsi/tulsi-hydrosol",
    image: "/products/tulsi-oil-lineup.jpg",
    short: "A botanical aromatic water designed for formulation and product-development applications where Tulsi's botanical profile is desired.",
    applications: ["Cosmetic and personal care formulations", "Face and body product development", "Aromatic products", "Natural product development", "Home-care concepts"],
    seoTitle: "Tulsi Hydrosol Supplier in India | VG Naturals",
    seoDescription: "Source Tulsi Hydrosol from VG Naturals for B2B formulation and natural product development. Request 50 ml or 100 ml samples or a bulk quote.",
  },
  {
    slug: "tulsi-air-freshener",
    name: "Tulsi Air Freshener",
    botanical: "Tulsi",
    type: "Air Freshener",
    href: "/products/tulsi/tulsi-air-freshener",
    image: "/products/tulsi-oil-lineup.jpg",
    short: "A Tulsi-inspired fragrance format for home, workspace and hospitality-oriented air-care applications.",
    applications: ["Home fragrance", "Workspace and office fragrance", "Hospitality applications", "Retail and private-label concepts", "Natural fragrance product development"],
    seoTitle: "Tulsi Air Freshener Supplier | VG Naturals",
    seoDescription: "Explore Tulsi Air Freshener from VG Naturals for home, workspace, hospitality and private-label fragrance applications. Sample sizes available.",
  },
];

export const productCategories = [
  { name: "Lemongrass", href: "/products/lemongrass", items: products.filter((p) => p.botanical === "Lemongrass") },
  { name: "Tulsi", href: "/products/tulsi", items: products.filter((p) => p.botanical === "Tulsi") },
];

export const industries = [
  { title: "Cosmetics & Personal Care", body: "Botanical formats for brands and formulators developing skincare, body-care and personal-care products." },
  { title: "Skincare & Haircare", body: "Essential oils and hydrosols for product concepts where botanical ingredients and aromatic profiles are relevant." },
  { title: "Soap & Home Care", body: "Botanical aromatic ingredients and air-care formats for soap, cleaning and home-fragrance concepts." },
  { title: "Perfume & Fragrance", body: "Aromatic botanical products for fragrance development, scent concepts and natural-product positioning." },
  { title: "Aromatherapy & Wellness", body: "Botanical essential oils and hydrosols for wellness-oriented product development, subject to appropriate formulation and use." },
  { title: "Private Label & Brands", body: "Sample-led evaluation and business discussions for brands exploring botanical product lines." },
  { title: "Distributors & Wholesalers", body: "A direct enquiry route for businesses evaluating products for distribution and wholesale requirements." },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
