export type Product = { slug:string; name:string; botanicalName:string; category:string; image:string; status:'ready'|'fresh'|'coming-soon'; variants:{label:string;price:number}[]; description:string; b2bAvailable:boolean };
export const products: Product[] = [
  {
    "slug": "lemongrass-essential-oil",
    "name": "Lemongrass Essential Oil",
    "botanicalName": "Cymbopogon flexuosus",
    "category": "Essential Oils",
    "image": "/catalogue-assets/lemongrass-essential-oil-bottles.jpg",
    "status": "ready",
    "variants": [
      {
        "label": "50 ml",
        "price": 150
      },
      {
        "label": "100 ml",
        "price": 225
      }
    ],
    "description": "Lemongrass Essential Oil from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "lemongrass-hydrosol",
    "name": "Lemongrass Hydrosol",
    "botanicalName": "Lemongrass",
    "category": "Hydrosols",
    "image": "/catalogue-assets/lemongrass-hydrosol-spray-bottle.png",
    "status": "ready",
    "variants": [
      {
        "label": "50 ml",
        "price": 150
      },
      {
        "label": "100 ml",
        "price": 225
      }
    ],
    "description": "Lemongrass Hydrosol from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "lemongrass-natural-room-freshener",
    "name": "Lemongrass Natural Room Freshener",
    "botanicalName": "Lemongrass",
    "category": "Home Care",
    "image": "/images/lemongrass-natural-room-freshener.png",
    "status": "ready",
    "variants": [
      {
        "label": "50 ml",
        "price": 150
      },
      {
        "label": "100 ml",
        "price": 225
      }
    ],
    "description": "Lemongrass Natural Room Freshener from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "lemongrass-tea-bags",
    "name": "Lemongrass Tea Bags",
    "botanicalName": "Lemongrass",
    "category": "Herbal Teas",
    "image": "/catalogue-assets/lemongrass-herbal-tea-bags.png",
    "status": "ready",
    "variants": [
      {
        "label": "10 pouches",
        "price": 150
      },
      {
        "label": "20 pouches",
        "price": 225
      }
    ],
    "description": "Lemongrass Tea Bags from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "tulsi-essential-oil",
    "name": "Tulsi Essential Oil",
    "botanicalName": "Ocimum sanctum",
    "category": "Essential Oils",
    "image": "/catalogue-assets/tulsi-essential-oil-ocimum-sanctum.jpg",
    "status": "ready",
    "variants": [
      {
        "label": "50 ml",
        "price": 150
      },
      {
        "label": "100 ml",
        "price": 225
      }
    ],
    "description": "Tulsi Essential Oil from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "tulsi-hydrosol",
    "name": "Tulsi Hydrosol",
    "botanicalName": "Ocimum sanctum",
    "category": "Hydrosols",
    "image": "/catalogue-assets/tulsi-hydrosol-ocimum-sanctum.png",
    "status": "ready",
    "variants": [
      {
        "label": "50 ml",
        "price": 150
      },
      {
        "label": "100 ml",
        "price": 225
      }
    ],
    "description": "Tulsi Hydrosol from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "tulsi-air-sanitizing-spray",
    "name": "Tulsi Air Sanitizing Spray",
    "botanicalName": "Ocimum sanctum",
    "category": "Home Care",
    "image": "/catalogue-assets/tulsi-air-sanitizing-spray.png",
    "status": "ready",
    "variants": [
      {
        "label": "50 ml",
        "price": 150
      },
      {
        "label": "100 ml",
        "price": 225
      }
    ],
    "description": "Tulsi Air Sanitizing Spray from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "herbal-tulsi-tea-pouch",
    "name": "Herbal Tulsi Tea Pouch",
    "botanicalName": "Ocimum sanctum",
    "category": "Herbal Teas",
    "image": "/catalogue-assets/herbal-tulsi-tea-pouch.jpg",
    "status": "ready",
    "variants": [
      {
        "label": "10 pouches",
        "price": 150
      },
      {
        "label": "20 pouches",
        "price": 225
      }
    ],
    "description": "Herbal Tulsi Tea Pouch from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "fresh-tulsi-leaves",
    "name": "Fresh Tulsi Leaves",
    "botanicalName": "Ocimum sanctum",
    "category": "Fresh Botanicals",
    "image": "/catalogue-assets/fresh-tulsi-leaves-ocimum-sanctum.jpg",
    "status": "fresh",
    "variants": [
      {
        "label": "500 g",
        "price": 150
      }
    ],
    "description": "Fresh Tulsi Leaves from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "basil-essential-oil",
    "name": "Basil Essential Oil",
    "botanicalName": "Ocimum basilicum",
    "category": "Essential Oils",
    "image": "/catalogue-assets/basil-essential-oil-ocimum-basilicum.jpg",
    "status": "ready",
    "variants": [
      {
        "label": "50 ml",
        "price": 150
      },
      {
        "label": "100 ml",
        "price": 225
      }
    ],
    "description": "Basil Essential Oil from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "basil-hydrosol",
    "name": "Basil Hydrosol",
    "botanicalName": "Ocimum basilicum",
    "category": "Hydrosols",
    "image": "/catalogue-assets/lemongrass-natural-room-freshener-product.png",
    "status": "ready",
    "variants": [
      {
        "label": "50 ml",
        "price": 150
      },
      {
        "label": "100 ml",
        "price": 225
      }
    ],
    "description": "Basil Hydrosol from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "basil-tea-bags",
    "name": "Basil Tea Bags",
    "botanicalName": "Ocimum basilicum",
    "category": "Herbal Teas",
    "image": "/images/basil-tea-bags.png",
    "status": "ready",
    "variants": [
      {
        "label": "10 pouches",
        "price": 150
      },
      {
        "label": "20 pouches",
        "price": 225
      }
    ],
    "description": "Basil Tea Bags from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "fresh-basil-leaves",
    "name": "Fresh Basil Leaves",
    "botanicalName": "Ocimum basilicum",
    "category": "Fresh Botanicals",
    "image": "/catalogue-assets/fresh-basil-leaves-ocimum-basilicum.jpg",
    "status": "fresh",
    "variants": [
      {
        "label": "500 g",
        "price": 150
      }
    ],
    "description": "Fresh Basil Leaves from VG Naturals. Explore available retail packs and request information for botanical ingredient sourcing or bulk requirements.",
    "b2bAvailable": true
  },
  {
    "slug": "rosemary-oil",
    "name": "Rosemary Essential Oil",
    "botanicalName": "",
    "category": "Essential Oils",
    "image": "",
    "status": "coming-soon",
    "variants": [],
    "description": "Rosemary Essential Oil is planned for the VG Naturals portfolio. Enquire to register your interest.",
    "b2bAvailable": true
  },
  {
    "slug": "vetiver-oil",
    "name": "Vetiver (Khus) Essential Oil",
    "botanicalName": "",
    "category": "Essential Oils",
    "image": "",
    "status": "coming-soon",
    "variants": [],
    "description": "Vetiver (Khus) Essential Oil is planned for the VG Naturals portfolio. Enquire to register your interest.",
    "b2bAvailable": true
  },
  {
    "slug": "german-chamomile-oil",
    "name": "German Chamomile Essential Oil",
    "botanicalName": "",
    "category": "Essential Oils",
    "image": "",
    "status": "coming-soon",
    "variants": [],
    "description": "German Chamomile Essential Oil is planned for the VG Naturals portfolio. Enquire to register your interest.",
    "b2bAvailable": true
  },
  {
    "slug": "rosemary-hair-growth-scalp-mist",
    "name": "Rosemary Scalp Mist",
    "botanicalName": "",
    "category": "Hydrosols",
    "image": "",
    "status": "coming-soon",
    "variants": [],
    "description": "Rosemary Scalp Mist is planned for the VG Naturals portfolio. Enquire to register your interest.",
    "b2bAvailable": true
  }
] as Product[];
export const getProduct=(slug:string)=>products.find(p=>p.slug===slug);
export const categories=['Essential Oils','Hydrosols','Fresh Botanicals','Herbal Teas','Home Care','Agriculture'];
