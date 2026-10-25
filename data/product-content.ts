import { searchBuyerQuestions } from './search-buyer-questions';
import type { Product } from './products';

export type ProductContent = {
  summary: string;
  seoTitle: string;
  description: string[];
  form: string;
  applications: string[];
  buyingNote: string;
  faqs: { question: string; answer: string }[];
};

// Based on the supplied master catalogue and the approved retail list.
// Prices and availability always come from products.ts, not the reference copy.
export const productContent: Record<string, ProductContent> = {
  'lemongrass-essential-oil': {
    summary: 'Lemongrass essential oil (Cymbopogon flexuosus) from VG Naturals, Lucknow. Explore 50 ml and 100 ml packs or enquire about bulk supply in India.',
    seoTitle: 'Lemongrass Oil Supplier in Lucknow | Retail & Bulk',
    form: 'Aromatic essential oil',
    description: [
      'VG Naturals Lemongrass Essential Oil brings the fresh, lemon-citrus aromatic character of Cymbopogon flexuosus to botanical ingredient sourcing. It is a concentrated aromatic oil for buyers exploring fragrance, soap, personal-care and home-fragrance formulations. Choose the listed retail pack for your requirements or contact our team to discuss a larger quantity.',
      'For businesses sourcing lemongrass essential oil in India, the intended application matters as much as the pack size. Soap makers, cosmetic formulators and fragrance brands can share their formulation brief so that product specifications and suitability can be discussed before purchase. The essential oil and lemongrass hydrosol are different product formats and should not be substituted in a formulation without evaluation.'
    ],
    applications: ['Soap and personal-care formulation enquiries', 'Home-fragrance and diffuser-blend development', 'Fragrance ingredient sourcing for manufacturers and distributors'],
    buyingNote: 'Share your intended formulation, quantity and delivery location. Ask our team to confirm the specifications and any documentation available for the proposed supply.',
    faqs: [
      { question: 'What is the botanical name of this lemongrass oil?', answer: 'The listed botanical identity is Cymbopogon flexuosus. Mention this name when enquiring about the essential oil to distinguish it from other lemongrass products.' },
      { question: 'Can I enquire about lemongrass oil for soap making or cosmetics?', answer: 'Yes. We welcome ingredient enquiries for soap, personal-care and fragrance development. The formulator should confirm suitability and the appropriate inclusion level for the finished product.' },
      { question: 'Is lemongrass essential oil the same as lemongrass hydrosol?', answer: 'No. The oil is a concentrated aromatic oil, while hydrosol is a water-based botanical product. Select the format required by your formulation.' },
      { question: 'Where can I find usage and storage instructions?', answer: 'Follow the supplied product label. For formulation work, request the relevant handling information from VG Naturals before use.' }
    ]
  },
  'lemongrass-hydrosol': {
    summary: 'Lemongrass hydrosol in 50 ml and 100 ml packs from VG Naturals. Enquire about botanical water for formulation development and bulk supply in India.',
    seoTitle: 'Lemongrass Hydrosol | Botanical Water & Bulk Enquiries',
    form: 'Water-based botanical hydrosol',
    description: [
      'VG Naturals Lemongrass Hydrosol is a water-based botanical product for buyers seeking an aromatic water format. It complements our lemongrass essential oil range while serving a different formulation role. The listed 50 ml and 100 ml packs allow customers to select a small quantity before discussing larger commercial requirements.',
      'Cosmetic manufacturers, personal-care brands and botanical product developers can enquire about lemongrass hydrosol for water-based mist, toner, hair-care or room-spray concepts. These are formulation enquiries: compatibility, preservation and finished-product performance need to be evaluated for the intended application. Share your end use with our Lucknow team when requesting bulk lemongrass hydrosol.'
    ],
    applications: ['Water-based botanical mist and toner development', 'Personal-care and hair-care formulation enquiries', 'Aromatic room-spray formulation concepts'],
    buyingNote: 'Discuss composition, storage guidance and the specifications relevant to your water-based formulation before ordering a commercial quantity.',
    faqs: [
      { question: 'What is lemongrass hydrosol?', answer: 'It is the water-based botanical format in the VG Naturals lemongrass range. It differs from the separately listed concentrated essential oil.' },
      { question: 'Can I use it to develop a face mist or hair-care product?', answer: 'You can enquire about it as a formulation ingredient. Confirm the product specification and evaluate the complete formulation before using it in a finished cosmetic product.' },
      { question: 'Is the hydrosol interchangeable with essential oil?', answer: 'No. They have different physical properties and formulation roles. Order the product format specified for your application.' },
      { question: 'Is a shelf life or preservative system specified here?', answer: 'These details are not confirmed on this listing. Ask our team for the applicable product information and follow the final label.' }
    ]
  },
  'lemongrass-natural-room-freshener': {
    summary: 'Lemongrass Natural Room Freshener from VG Naturals in 50 ml and 100 ml packs. Explore indoor fragrance and wholesale enquiries for your business.',
    seoTitle: 'Lemongrass Natural Room Freshener | Retail & Wholesale',
    form: 'Finished room-fragrance spray',
    description: [
      'VG Naturals Lemongrass Natural Room Freshener is a spray-format home-fragrance product with a fresh lemongrass aromatic character. It is intended for indoor space fragrance, offering a convenient format for customers who want a room spray rather than a separate essential oil and diffuser setup.',
      'Retailers, offices, hospitality buyers and home-fragrance distributors can discuss commercial requirements with VG Naturals. When sourcing lemongrass room freshener in bulk, tell us whether you need retail packs or another packaging format for review. Use in rooms, entryways or workspaces should follow the supplied label; suitability for fabrics and specific surfaces should be confirmed before application.'
    ],
    applications: ['Indoor room-fragrance use according to the label', 'Office and hospitality fragrance enquiries', 'Retail and wholesale home-fragrance ranges'],
    buyingNote: 'Specify the number of packs, intended setting and delivery location when requesting wholesale pricing.',
    faqs: [
      { question: 'Does this lemongrass room freshener need a diffuser?', answer: 'No. It is listed as a finished spray-format room-fragrance product. Follow the directions on the supplied bottle.' },
      { question: 'How does it differ from lemongrass essential oil?', answer: 'The room freshener is a finished space-fragrance product; the essential oil is a separate aromatic ingredient. Choose according to your intended use.' },
      { question: 'Can hotels and offices request wholesale quantities?', answer: 'Yes. Share your pack requirement, intended setting and delivery location. Availability and commercial terms are confirmed in the quotation.' },
      { question: 'Can it be used as a skin mist or fabric spray?', answer: 'This listing is for room fragrance. Use on skin, fabrics or sensitive surfaces only if the supplied product label specifically permits that application.' }
    ]
  },
  'lemongrass-tea-bags': {
    summary: 'Lemongrass tea bags in 10-pouch and 20-pouch packs from VG Naturals. Explore herbal infusion packs and B2B enquiries for cafés, retailers and tea brands.',
    seoTitle: 'Lemongrass Tea Bags | Herbal Infusion & Bulk Enquiries',
    form: 'Dried lemongrass in tea-bag format',
    description: [
      'VG Naturals Lemongrass Tea Bags offer the citrus-like aroma and herbal character of dried lemongrass in a convenient brewing format. The tea bags make it easy to prepare a lemongrass herbal infusion without measuring loose dried cuts. Choose a 10-pouch or 20-pouch retail pack from the options above.',
      'For cafés, hospitality businesses, herbal tea retailers and distributors, this product offers a botanical beverage option to discuss alongside the Tulsi and Basil tea range. Buyers sourcing lemongrass tea bags in India can share their required pack count, presentation and purchase frequency. Brewing directions and the final ingredient declaration should be checked on the supplied package.'
    ],
    applications: ['Herbal infusion preparation following package directions', 'Café and hospitality beverage enquiries', 'Retail herbal tea ranges and wholesale distribution'],
    buyingNote: 'For commercial sourcing, share your pack count and intended retail or hospitality use. Any custom packaging request is reviewed separately.',
    faqs: [
      { question: 'What is in the lemongrass tea-bag format?', answer: 'The master catalogue identifies dried lemongrass cuts for this product. Refer to the final pack for the complete ingredient declaration.' },
      { question: 'How should I brew the tea bags?', answer: 'Steep using the water quantity and preparation guidance printed on the supplied pack. Contact VG Naturals if you need the brewing instructions before ordering.' },
      { question: 'Can cafés or tea retailers enquire about bulk packs?', answer: 'Yes. Share the number of pouches or packs required, your delivery location and whether the requirement is recurring.' },
      { question: 'Is this the same product as lemongrass essential oil?', answer: 'No. Tea bags are the herbal beverage product in this range. Essential oil is a separate aromatic product and is not a replacement for tea bags.' }
    ]
  },
  'tulsi-essential-oil': {
    summary: 'Tulsi essential oil, Ocimum sanctum, from VG Naturals. View 50 ml and 100 ml packs and discuss B2B botanical ingredient requirements in India.',
    seoTitle: 'Tulsi Essential Oil (Ocimum sanctum) | Bulk Enquiries',
    form: 'Aromatic essential oil',
    description: [
      'VG Naturals Tulsi Essential Oil is identified as Ocimum sanctum, commonly called Tulsi or Holy Basil. It is offered as an aromatic botanical oil for fragrance and formulation enquiries. Its botanical identity distinguishes it from our Basil Essential Oil, which is listed separately as Ocimum basilicum.',
      'Manufacturers, formulators and natural-product brands sourcing Tulsi essential oil in India can discuss their intended end product with our team. The 50 ml and 100 ml packs are listed for smaller requirements, while larger quantities are quoted after reviewing specifications, packaging and availability. Botanical identity and the intended formulation should be confirmed together before commercial procurement.'
    ],
    applications: ['Botanical fragrance development', 'Soap and personal-care ingredient enquiries', 'Commercial ingredient sourcing for formulators and distributors'],
    buyingNote: 'State Ocimum sanctum in your enquiry and include your required quantity and intended application.',
    faqs: [
      { question: 'Is this Tulsi oil Ocimum sanctum or Ocimum basilicum?', answer: 'This product is Ocimum sanctum. VG Naturals lists Ocimum basilicum separately as Basil Essential Oil.' },
      { question: 'Can formulators enquire about Tulsi essential oil?', answer: 'Yes. Share your intended fragrance or personal-care formulation so that suitability and the required specifications can be discussed.' },
      { question: 'Is this Tulsi tea or a ready-to-use room spray?', answer: 'No. This listing is for essential oil. Herbal Tulsi Tea Pouch and Tulsi Air Sanitizing Spray have their own product pages.' },
      { question: 'Are batch reports and technical documents included automatically?', answer: 'Document availability is confirmed on enquiry. Tell our team which specifications or reports your procurement process requires before committing to an order.' }
    ]
  },
  'tulsi-hydrosol': {
    summary: 'Tulsi hydrosol (Ocimum sanctum) in 50 ml and 100 ml packs. Enquire with VG Naturals for botanical water and B2B formulation requirements.',
    seoTitle: 'Tulsi Hydrosol (Ocimum sanctum) | Botanical Water',
    form: 'Water-based botanical hydrosol',
    description: [
      'VG Naturals Tulsi Hydrosol is a water-based botanical product identified as Ocimum sanctum. It is part of our Holy Basil range and is offered separately from Tulsi essential oil, tea and fresh leaves. This distinction helps buyers choose the botanical identity and product form their application requires.',
      'The hydrosol can be discussed for suitable water-based cosmetic, personal-care and aromatic product concepts. Manufacturers considering Tulsi hydrosol for botanical mists, toners or sprays should review the product specification and evaluate the final formulation. VG Naturals accepts retail pack and bulk enquiries from formulators, distributors and botanical ingredient buyers in India.'
    ],
    applications: ['Botanical mist and toner formulation enquiries', 'Water-based personal-care product development', 'Aromatic spray and botanical ingredient sourcing'],
    buyingNote: 'Confirm composition, storage instructions and formulation requirements with our team before selecting a bulk quantity.',
    faqs: [
      { question: 'What is the botanical identity of Tulsi hydrosol?', answer: 'This listing identifies Tulsi as Ocimum sanctum, also known as Holy Basil. Basil Hydrosol is a separate Ocimum basilicum product.' },
      { question: 'Can I enquire about Tulsi hydrosol for a cosmetic formulation?', answer: 'Yes. Share the intended product type and technical requirements. Suitability and inclusion levels should be assessed for the complete formulation.' },
      { question: 'How is Tulsi hydrosol different from Tulsi essential oil?', answer: 'Hydrosol is the water-based product format; essential oil is the concentrated aromatic oil format. They should be selected according to the formulation brief.' },
      { question: 'Where are shelf life and storage requirements listed?', answer: 'Follow the supplied label and ask our team for the current product information. A specific shelf life is not confirmed on this page.' }
    ]
  },
  'tulsi-air-sanitizing-spray': {
    summary: 'Tulsi Air Sanitizing Spray from VG Naturals in 50 ml and 100 ml packs. Explore Tulsi room-fragrance and bulk air-care product enquiries.',
    seoTitle: 'Tulsi Air Sanitizing Spray | Room Fragrance Enquiries',
    form: 'Finished indoor air-care spray',
    description: [
      'VG Naturals Tulsi Air Sanitizing Spray is listed in our Tulsi botanical air-care range for indoor space-fragrance applications. The product identity is associated with Ocimum sanctum. Its spray format is intended for customers looking for a Tulsi room spray for appropriate home or workspace settings.',
      'Retailers, hospitality businesses and distributors can contact VG Naturals about Tulsi air-care spray requirements, including the listed retail packs and larger commercial enquiries. This page describes a fragrance application: the product name does not establish disinfectant, antibacterial or antiviral performance. Follow the actual product label for permitted use and handling.'
    ],
    applications: ['Indoor botanical room fragrance following label directions', 'Office and hospitality air-care enquiries', 'Retail air-care ranges and wholesale distribution'],
    buyingNote: 'Mention the intended setting, required packs and delivery location. Confirm any application-specific requirements before purchase.',
    faqs: [
      { question: 'What is this Tulsi spray intended for?', answer: 'It is listed for appropriate indoor air-care and space-fragrance applications. Follow the use directions on the supplied bottle.' },
      { question: 'Is it a verified disinfectant or antiviral spray?', answer: 'No such performance is verified on this listing. It should not be purchased on the assumption that it disinfects spaces or prevents disease.' },
      { question: 'Can it be used on skin or food?', answer: 'This page lists an indoor air-care product. Do not assume that skin, food or other direct-contact applications are permitted; follow the supplied label.' },
      { question: 'Can an office or hospitality buyer request a quotation?', answer: 'Yes. Share your intended use, number of packs and delivery location so our team can review the requirement.' }
    ]
  },
  'herbal-tulsi-tea-pouch': {
    summary: 'Herbal Tulsi Tea Pouch with Ocimum sanctum from VG Naturals. Choose 10 or 20 pouches and enquire about retail, café or wholesale requirements.',
    seoTitle: 'Herbal Tulsi Tea Pouch (Ocimum sanctum) | VG Range',
    form: 'Dried Tulsi herbal tea in pouch packs',
    description: [
      'VG Naturals Herbal Tulsi Tea Pouch features Tulsi, identified as Ocimum sanctum, in a convenient herbal beverage format. Its botanical identity and aromatic herbal character make it distinct from our Ocimum basilicum Basil Tea Bags. The approved retail range includes packs of 10 and 20 pouches.',
      'Tea retailers, cafés, hospitality businesses and botanical-product distributors can discuss Tulsi herbal tea sourcing with our team in Lucknow. Share the number of packs and your intended retail or service format for a commercial quotation. This is presented as a herbal beverage, with ingredient and preparation information supplied on the final pack.'
    ],
    applications: ['Herbal beverage preparation according to the pack', 'Retail Tulsi tea ranges', 'Café, hospitality and wholesale tea enquiries'],
    buyingNote: 'Confirm the final ingredient list and pack presentation for your requirement. Bulk pricing and custom packaging are discussed on enquiry.',
    faqs: [
      { question: 'Which Tulsi is used for this tea product?', answer: 'The listed botanical identity is Ocimum sanctum. This is separate from the Ocimum basilicum identity of our Basil Tea Bags.' },
      { question: 'How do I prepare Herbal Tulsi Tea?', answer: 'Use the serving quantity and brewing directions on the supplied package. Our team can confirm the current pack instructions before purchase.' },
      { question: 'Does this tea claim to boost immunity or treat illness?', answer: 'No medical or disease-prevention benefit is claimed on this product page. It is listed as a herbal beverage.' },
      { question: 'Can I discuss private-label Tulsi tea requirements?', answer: 'You can submit a private-label enquiry. Packaging, feasibility, minimum quantity and commercial terms must be confirmed before any commitment.' }
    ]
  },
  'fresh-tulsi-leaves': {
    summary: 'Fresh Tulsi leaves (Ocimum sanctum), 500 g for ₹150. Contact VG Naturals, Lucknow, to confirm harvest availability and bulk botanical supply.',
    seoTitle: 'Fresh Tulsi Leaves (Ocimum sanctum) | Bulk Enquiries',
    form: 'Fresh botanical leaves',
    description: [
      'VG Naturals Fresh Tulsi Leaves are listed as Ocimum sanctum for buyers seeking fresh Holy Basil botanical material. The approved pack is 500 g at ₹150, with supply subject to an availability check. Fresh leaves are a different format from dried Tulsi tea, hydrosol and essential oil.',
      'Beverage developers, herbal tea businesses, cafés and fresh botanical buyers can discuss their intended application and required quantity with VG Naturals. Because the material is fresh, harvest availability, packing and delivery arrangements need to be agreed before an order is confirmed. Include your destination and required delivery date when enquiring about fresh Tulsi leaves in bulk.'
    ],
    applications: ['Fresh botanical sourcing', 'Herbal beverage and tea-development enquiries', 'Café and commercial ingredient requirements subject to suitability'],
    buyingNote: 'Availability, harvest timing, packing and delivery feasibility must be confirmed before purchase. The listed price is for the 500 g pack.',
    faqs: [
      { question: 'Are fresh Tulsi leaves available throughout the year?', answer: 'Year-round availability is not promised. Contact our team to check the current harvest and quantity available.' },
      { question: 'Can I order fresh Tulsi leaves directly through the cart?', answer: 'This product uses an availability enquiry instead of Add to Cart. Our team confirms supply and delivery arrangements first.' },
      { question: 'Are these leaves the same as fresh Basil leaves?', answer: 'No. This listing is Ocimum sanctum. Fresh Basil Leaves are listed separately as Ocimum basilicum.' },
      { question: 'What should I include in a fresh-leaf enquiry?', answer: 'Send the required weight, intended application, delivery postcode and preferred date. Packing and handling arrangements can then be discussed.' }
    ]
  },
  'basil-essential-oil': {
    summary: 'Basil essential oil (Ocimum basilicum) from VG Naturals in 50 ml and 100 ml packs. Enquire about Sweet Basil oil for formulation and bulk sourcing.',
    seoTitle: 'Basil Essential Oil (Ocimum basilicum) | Bulk Enquiries',
    form: 'Aromatic essential oil',
    description: [
      'VG Naturals Basil Essential Oil is identified as Ocimum basilicum, commonly referred to as Sweet Basil. The master catalogue describes a herbaceous aromatic character, making this an ingredient enquiry option for fragrance, soap and personal-care developers. It is distinct from the Ocimum sanctum Tulsi oil in our range.',
      'For buyers sourcing basil essential oil in India, the botanical name helps establish the correct ingredient brief. Discuss the intended finished product and specifications with our team before selecting a commercial quantity. The listed 50 ml and 100 ml retail packs serve smaller requirements; bulk packaging, quantity and pricing are confirmed through an enquiry.'
    ],
    applications: ['Botanical fragrance formulation', 'Soap and personal-care product-development enquiries', 'Ingredient sourcing for manufacturers, brands and distributors'],
    buyingNote: 'Specify Ocimum basilicum, your intended use and the technical information required. Food-grade status or a particular chemotype should not be assumed from the product name.',
    faqs: [
      { question: 'Is Basil Essential Oil the same as Tulsi Essential Oil?', answer: 'No. Our Basil Essential Oil is Ocimum basilicum, while Tulsi Essential Oil is Ocimum sanctum. Check the botanical name when sourcing either product.' },
      { question: 'Can I enquire about Sweet Basil oil for fragrance development?', answer: 'Yes. Share the product concept and the specifications needed for your formulation. Suitability is assessed for the intended application.' },
      { question: 'Is this listing a confirmation of food-grade oil?', answer: 'No. Food-grade suitability is not confirmed here. Request the relevant product specification before considering a food application.' },
      { question: 'Is a specific basil chemotype listed?', answer: 'No chemotype or constituent percentage is confirmed on this page. Ask our team for the available product information if your formulation requires it.' }
    ]
  },
  'basil-hydrosol': {
    summary: 'Basil hydrosol (Ocimum basilicum) from VG Naturals. View 50 ml and 100 ml packs and enquire about Sweet Basil botanical water for B2B sourcing.',
    seoTitle: 'Basil Hydrosol (Ocimum basilicum) | Botanical Water',
    form: 'Water-based botanical hydrosol',
    description: [
      'VG Naturals Basil Hydrosol is the water-based product in our Ocimum basilicum range. It offers a botanical water format for buyers exploring aromatic personal-care and formulation concepts. Choose it by botanical identity as well as format: our Tulsi Hydrosol is a separate Ocimum sanctum product.',
      'Cosmetic formulators, personal-care brands and botanical ingredient distributors can discuss basil hydrosol for suitable water-based mists, toners and spray concepts. The final formulation needs its own compatibility and preservation evaluation. Our listed retail packs are 50 ml and 100 ml, with commercial requirements reviewed through the bulk enquiry channel.'
    ],
    applications: ['Water-based botanical formulation development', 'Personal-care mist and toner enquiries', 'Aromatic spray concepts and ingredient distribution'],
    buyingNote: 'Share the intended formulation and request the applicable composition and storage details before ordering.',
    faqs: [
      { question: 'What is the botanical name of Basil Hydrosol?', answer: 'It is listed as Ocimum basilicum. This identifies it separately from Tulsi Hydrosol, which is Ocimum sanctum.' },
      { question: 'Is basil hydrosol the same as basil essential oil?', answer: 'No. Hydrosol is a water-based botanical format, while essential oil is a concentrated aromatic oil. Their formulation roles differ.' },
      { question: 'Can brands enquire about basil hydrosol for mists?', answer: 'Yes. Discuss your intended mist or other water-based product with our team and evaluate the complete formulation before commercial use.' },
      { question: 'Can I assume it is ready for direct skin application?', answer: 'Confirm the supplied label and product specification first. This page does not establish every direct-use application or a universal suitability claim.' }
    ]
  },
  'basil-tea-bags': {
    summary: 'Basil tea bags (Ocimum basilicum) from VG Naturals in 10-pouch and 20-pouch packs. Enquire about Sweet Basil herbal tea for retail and wholesale.',
    seoTitle: 'Basil Tea Bags (Ocimum basilicum) | Herbal Tea',
    form: 'Dried Basil leaves in tea-bag format',
    description: [
      'VG Naturals Basil Tea Bags feature Ocimum basilicum in a convenient herbal infusion format. The master catalogue identifies dried Basil leaves as the botanical material, offering a herbal beverage option distinct from our Tulsi tea. The listed retail packs contain 10 or 20 pouches.',
      'Herbal tea retailers, cafés, hospitality businesses and distributors can enquire about Basil tea bags for their beverage or retail range. For wholesale sourcing, share your pack requirement, destination and preferred presentation. The final package provides the ingredient declaration and preparation guidance, which should be reviewed for your intended use.'
    ],
    applications: ['Herbal infusion preparation', 'Retail Sweet Basil tea ranges', 'Café, hospitality and wholesale beverage enquiries'],
    buyingNote: 'Specify the pouch count or total packs required. Private-label or alternate packaging enquiries are subject to feasibility and quotation.',
    faqs: [
      { question: 'Are Basil Tea Bags made from Tulsi?', answer: 'This product is identified as Ocimum basilicum. Our Herbal Tulsi Tea Pouch is identified as Ocimum sanctum and is listed separately.' },
      { question: 'How do I prepare Basil Tea Bags?', answer: 'Follow the brewing directions on the supplied pack. Contact our team for current serving and preparation information before ordering if needed.' },
      { question: 'Can I order Basil tea for a café or retail store?', answer: 'Yes. Submit your pack quantity, intended use and delivery location for a commercial enquiry.' },
      { question: 'Can I request a private-label Basil tea pack?', answer: 'Private-label requirements can be discussed on enquiry. Final packaging, minimum quantities and commercial terms need confirmation before an order.' }
    ]
  },
  'fresh-basil-leaves': {
    summary: 'Fresh Basil leaves (Ocimum basilicum), 500 g for ₹150. Enquire with VG Naturals, Lucknow, about current availability and wholesale botanical supply.',
    seoTitle: 'Fresh Basil Leaves (Ocimum basilicum) | Wholesale',
    form: 'Fresh botanical leaves',
    description: [
      'VG Naturals Fresh Basil Leaves are listed as Ocimum basilicum, commonly known as Sweet Basil. They provide a fresh-leaf format for buyers discussing culinary, beverage and botanical sourcing requirements. The approved retail pack is 500 g at ₹150 and requires availability confirmation.',
      'Restaurants, cafés, ingredient buyers and fresh botanical wholesalers can contact our Lucknow team with their required weight and delivery schedule. Fresh Basil leaves are perishable, so harvest availability, packing and transport arrangements should be agreed before purchase. This listing is separate from dried Basil Tea Bags, Basil Hydrosol and Basil Essential Oil.'
    ],
    applications: ['Fresh culinary and botanical ingredient enquiries', 'Restaurant and café sourcing requirements', 'Wholesale fresh-leaf procurement subject to availability'],
    buyingNote: 'Include your required weight, delivery postcode and date. Suitability for the intended food or beverage use and delivery feasibility should be confirmed with our team.',
    faqs: [
      { question: 'Which basil is listed on this page?', answer: 'The listed botanical identity is Ocimum basilicum, commonly called Sweet Basil. It is distinct from Ocimum sanctum Tulsi.' },
      { question: 'Can I buy fresh Basil leaves without an availability check?', answer: 'Availability confirmation is required. Contact our team before arranging an order so harvest quantity and delivery can be reviewed.' },
      { question: 'Can restaurants enquire about recurring supply?', answer: 'Yes. Share your approximate quantity, delivery frequency and location. A recurring supply commitment is made only after confirmation.' },
      { question: 'Are the leaves supplied fresh or dried?', answer: 'This listing is for fresh leaves. Basil Tea Bags are a separate dried botanical beverage product in our catalogue.' }
    ]
  },
  'rosemary-oil': {
    summary: 'Rosemary Essential Oil is coming soon at VG Naturals. Register interest and share your fragrance or botanical ingredient requirements for future supply.',
    seoTitle: 'Rosemary Essential Oil | Coming Soon & B2B Interest',
    form: 'Planned essential oil product',
    description: [
      'Rosemary Essential Oil is a planned addition to the VG Naturals botanical portfolio. This page lets fragrance developers, personal-care brands and ingredient buyers register interest while the commercial product details are being finalised. It is currently marked Coming Soon.',
      'If you are researching a future rosemary essential oil supplier in India, share the intended application, quantity and product specifications you need. Your enquiry helps us understand the requirement, but it does not confirm stock, a launch date or an order. Retail packs, pricing and final technical specifications will be confirmed when available.'
    ],
    applications: ['Future fragrance ingredient enquiries', 'Personal-care formulation briefs for review', 'Distributor and manufacturer expressions of interest'],
    buyingNote: 'Enquiries are open; ordering and payment are not available for this planned product.',
    faqs: [
      { question: 'Is Rosemary Essential Oil ready to order?', answer: 'No. It is marked Coming Soon. You can register interest through the enquiry button.' },
      { question: 'Is a launch date confirmed?', answer: 'No launch date is confirmed on this listing. Contact our team for any available update.' },
      { question: 'Can I send a formulation brief before launch?', answer: 'Yes. Include your intended use, quantity and required specifications. Final suitability and supply terms will need confirmation.' },
      { question: 'Are hair-growth benefits claimed here?', answer: 'No hair-growth or treatment claim is made. The product is a planned essential oil listing with final details to be confirmed.' }
    ]
  },
  'vetiver-oil': {
    summary: 'Vetiver (Khus) Essential Oil is coming soon at VG Naturals. Register interest for future fragrance and botanical ingredient sourcing requirements.',
    seoTitle: 'Vetiver (Khus) Essential Oil | Coming Soon',
    form: 'Planned essential oil product',
    description: [
      'Vetiver, also known as Khus, forms part of the VG Naturals botanical direction. Vetiver Essential Oil is currently a Coming Soon product. The listing provides a contact point for fragrance businesses and botanical ingredient buyers interested in future commercial supply.',
      'Buyers researching vetiver oil for perfumery or aromatic formulation work can send their intended application, required quantity and specification brief. Cultivation activity should not be read as confirmation that finished essential oil is in stock. Final product specifications, available packs and prices will be confirmed separately before any purchase.'
    ],
    applications: ['Future perfumery ingredient enquiries', 'Aromatic formulation development briefs', 'Wholesale botanical sourcing expressions of interest'],
    buyingNote: 'Discuss future requirements through the enquiry form. No finished-oil stock or delivery date is confirmed here.',
    faqs: [
      { question: 'Is Khus oil the product listed here?', answer: 'Yes. This planned listing is Vetiver (Khus) Essential Oil.' },
      { question: 'Does vetiver cultivation mean the oil is available now?', answer: 'No. The finished essential oil remains Coming Soon until commercial availability is confirmed.' },
      { question: 'Can perfumery buyers register interest?', answer: 'Yes. Share your specification brief, quantity and destination for future supply discussions.' },
      { question: 'Can I reserve a confirmed delivery date?', answer: 'No delivery date is confirmed through this listing. Contact our team for current development and availability information.' }
    ]
  },
  'german-chamomile-oil': {
    summary: 'German Chamomile Essential Oil is coming soon at VG Naturals. Enquire about future botanical ingredient requirements and product availability updates.',
    seoTitle: 'German Chamomile Essential Oil | Coming Soon',
    form: 'Planned essential oil product',
    description: [
      'German Chamomile Essential Oil is listed as a future product in the VG Naturals portfolio. It is intended as an enquiry point for botanical ingredient buyers and formulators who want to discuss a chamomile essential oil requirement. Finished product availability is not yet confirmed.',
      'When registering interest, specify the intended application and the botanical identity, composition or documentation your purchasing brief requires. This helps distinguish an essential oil requirement from chamomile flowers or herbal tea. Final packs, specifications, price and launch timing will be confirmed before the product becomes orderable.'
    ],
    applications: ['Future botanical ingredient sourcing', 'Fragrance and personal-care development briefs', 'Manufacturer and distributor expressions of interest'],
    buyingNote: 'This is an enquiry-only Coming Soon listing. Ask our team for updates before planning procurement.',
    faqs: [
      { question: 'Can I purchase German Chamomile Essential Oil now?', answer: 'No. This product is currently marked Coming Soon and accepts enquiries only.' },
      { question: 'Is this listing for chamomile tea or dried flowers?', answer: 'No. It is a planned essential oil product. Tea and dried-flower requirements should be identified separately in your enquiry.' },
      { question: 'Are the final botanical specifications confirmed?', answer: 'Final commercial specifications are not published here. Include your botanical and technical requirements when contacting our team.' },
      { question: 'How can I ask about future bulk supply?', answer: 'Send the expected quantity, application, delivery destination and any procurement requirements using the enquiry form.' }
    ]
  },
  'rosemary-hair-growth-scalp-mist': {
    summary: 'Rosemary Scalp Mist is coming soon at VG Naturals. Register interest in this planned botanical hair-care product and discuss future commercial requirements.',
    seoTitle: 'Rosemary Scalp Mist | Coming Soon & Enquiries',
    form: 'Planned botanical scalp mist',
    description: [
      'Rosemary Scalp Mist is a planned botanical hair-care product in the VG Naturals range. This Coming Soon page allows retailers, personal-care brands and distributors to discuss interest in a future scalp-mist format. The finished formulation and directions are still to be confirmed.',
      'Share your intended retail or commercial requirement with our team, including pack quantity and preferred presentation. A scalp mist is a different product format from rosemary essential oil, so the two should be specified separately. This page does not confirm hair-growth performance, a treatment benefit, a launch date or current stock.'
    ],
    applications: ['Future botanical scalp-care product enquiries', 'Personal-care retail range planning', 'Distributor and brand expressions of interest'],
    buyingNote: 'Final ingredients, directions, pack sizes and pricing will be confirmed when the product is available.',
    faqs: [
      { question: 'Is Rosemary Scalp Mist available to buy?', answer: 'No. It is Coming Soon. The enquiry button lets you register interest.' },
      { question: 'Is it the same as rosemary essential oil?', answer: 'No. A scalp mist is a separate finished-product concept. Rosemary Essential Oil has its own planned product listing.' },
      { question: 'Does this product promise hair growth?', answer: 'No. No hair-growth or medical benefit is confirmed on this page.' },
      { question: 'Where can I find the ingredients and directions?', answer: 'These will be confirmed with the final product details. Contact our team for any current development update.' }
    ]
  }
};

export function getProductFaqs(p: Product, content: ProductContent) {
  const packs = p.variants.map(v => `${v.label} for ₹${v.price}`).join(' or ');
  return [
    ...content.faqs,
    ...(searchBuyerQuestions[p.slug] || []),
    {
      question: `What pack sizes and prices are listed for ${p.name}?`,
      answer: p.status === 'coming-soon'
        ? 'Pack sizes and prices are not confirmed yet. Enquire to register interest; this product is not available for checkout.'
        : `${packs}.${p.status === 'fresh' ? ' Fresh availability and delivery must be confirmed before ordering.' : ' These are the listed retail pack prices.'} Packaging and courier charges are not included. Additional charges and any applicable taxes are confirmed before order completion.`
    },
    {
      question: `How do I request a bulk quotation for ${p.name}?`,
      answer: `Contact VG Naturals through the bulk enquiry form or WhatsApp with your quantity, application, packaging preference and delivery location. ${p.status === 'coming-soon' ? 'This records interest in a future product; supply is not yet confirmed.' : 'Bulk price, minimum quantity, available specifications and delivery terms are confirmed in the quotation.'}`
    }
  ];
}
