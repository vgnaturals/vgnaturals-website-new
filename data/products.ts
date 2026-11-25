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
    "botanicalName": "Cymbopogon flexuosus",
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
    "botanicalName": "Cymbopogon flexuosus",
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
    "botanicalName": "Cymbopogon flexuosus",
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
    "image": "/catalogue-assets/basil-hydrosol-ocimum-basilicum.png",
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
    "botanicalName": "Chrysopogon zizanioides (syn. Vetiveria zizanioides)",
    "category": "Essential Oils",
    "image": "",
    "status": "ready",
    "variants": [
      {
        "label": "10 ml",
        "price": 660
      }
    ],
    "description": "Vetiver essential oil, also known as khus oil, is obtained from aromatic vetiver roots. Its earthy, woody character makes it valuable for fragrance development. Browse listed pack prices or contact VG Naturals for a bulk quotation.",
    "b2bAvailable": true
  },
  {
    "slug": "german-chamomile-oil",
    "name": "German Chamomile Essential Oil",
    "botanicalName": "Matricaria chamomilla (syn. Matricaria recutita)",
    "category": "Essential Oils",
    "image": "",
    "status": "ready",
    "variants": [
      {
        "label": "50 g",
        "price": 2998
      }
    ],
    "description": "German chamomile essential oil is a concentrated aromatic ingredient derived from the flowers of Matricaria chamomilla. Its aromatic and chemical profile differs from Roman chamomile oil. Browse listed pack prices or contact VG Naturals for a bulk quotation.",
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
  },
  {
    "slug": "chamomile-hydrosol",
    "name": "Chamomile Hydrosol",
    "botanicalName": "Matricaria chamomilla (syn. Matricaria recutita)",
    "category": "Hydrosols",
    "image": "",
    "status": "ready",
    "variants": [
      {
        "label": "100 ml",
        "price": 360
      }
    ],
    "description": "Chamomile hydrosol is the water-based aromatic fraction of chamomile flower distillation, sometimes called chamomile floral water. It differs from concentrated essential oil. Browse listed pack prices or contact VG Naturals for a bulk quotation.",
    "b2bAvailable": true
  },
  {
    "slug": "chamomile-flowers",
    "name": "Chamomile Flowers",
    "botanicalName": "Matricaria chamomilla (syn. Matricaria recutita)",
    "category": "Agriculture",
    "image": "",
    "status": "ready",
    "variants": [
      {
        "label": "100 g",
        "price": 798
      }
    ],
    "description": "Chamomile flowers are an aromatic agricultural raw material used in extraction and ingredient processing. VG Naturals has started chamomile cultivation on its own land. Browse listed pack prices or contact VG Naturals for a bulk quotation.",
    "b2bAvailable": true
  },
  {
    "slug": "vetiver-hydrosol",
    "name": "Vetiver (Khus) Hydrosol",
    "botanicalName": "Chrysopogon zizanioides (syn. Vetiveria zizanioides)",
    "category": "Hydrosols",
    "image": "",
    "status": "ready",
    "variants": [
      {
        "label": "100 ml",
        "price": 440
      }
    ],
    "description": "Vetiver hydrosol, commonly called khus floral water, is a water-based aromatic distillate associated with vetiver root processing. Browse listed pack prices or contact VG Naturals for a bulk quotation.",
    "b2bAvailable": true
  }
] as Product[];
export const getProduct=(slug:string)=>products.find(p=>p.slug===slug);
export const categories=['Essential Oils','Hydrosols','Fresh Botanicals','Herbal Teas','Home Care','Agriculture'];
