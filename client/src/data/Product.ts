import bedImage from "../assets/images/bed.jpg";
import diningTableImage from "../assets/images/dining-table.jpg";
import doorImage from "../assets/images/doors/wooden-door.jpg";
import royalTeakDoorImage from "../assets/images/doors/royal-teak-door.jpg";
import geometricDoorImage from "../assets/images/doors/geometric-carved-door.jpg";
import officeChairImage from "../assets/images/office-chair.jpg";
import sofaImage from "../assets/images/sofa.jpg";
import sectionalSofaImage from "../assets/images/sectional-l-sofa.jpg";
import velvetSofaImage from "../assets/images/velvet-fabric-sofa.jpg";
import tvUnitImage from "../assets/images/tv-unit.jpg";
import modularTvUnitImage from "../assets/images/tv-unit-modular.jpg";
import wardrobeImage from "../assets/images/wardrobe.jpg";
import woodenFrameSofaImage from "../assets/images/wooden-frame-sofa-set.jpg";
import beigeSectionalSofaImage from "../assets/images/beige-sectional-sofa.jpg";
import grandUSectionalImage from "../assets/images/grand-u-sectional-sofa.jpg";
import slattedDoubleDoorImage from "../assets/images/doors/modern-slatted-double-door.jpg";
import caramelLeatherSectionalImage from "../assets/images/caramel-leather-sectional.jpg";
import emeraldVelvetSofaImage from "../assets/images/emerald-velvet-sofa-set.jpg";
import royalGlassDoorImage from "../assets/images/doors/royal-glass-carved-door.jpg";
import classicalCornicedDoorImage from "../assets/images/doors/classical-corniced-teak-door.jpg";
import rattanLivingSuiteImage from "../assets/images/rattan-living-lounge-suite.jpg";
import slateBlueSectionalImage from "../assets/images/slate-blue-sectional-suite.jpg";

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  galleryImages: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Luxury Sofa",
    price: "₹35,000",
    category: "Sofas",
    image: sofaImage,
    galleryImages: [sofaImage],
  },
  {
    id: 2,
    name: "Modern Dining Table",
    price: "₹28,500",
    category: "Dining",
    image: diningTableImage,
    galleryImages: [diningTableImage],
  },
  {
    id: 3,
    name: "Premium King Size Bed",
    price: "₹42,000",
    category: "Beds",
    image: bedImage,
    galleryImages: [bedImage],
  },
  {
    id: 4,
    name: "Wooden Wardrobe",
    price: "₹30,000",
    category: "Wardrobes",
    image: wardrobeImage,
    galleryImages: [wardrobeImage],
  },
  {
    id: 5,
    name: "Modern TV Unit",
    price: "₹22,000",
    category: "TV Units",
    image: tvUnitImage,
    galleryImages: [tvUnitImage],
  },
  {
    id: 6,
    name: "Office Chair",
    price: "₹8,500",
    category: "Office",
    image: officeChairImage,
    galleryImages: [officeChairImage],
  },
  {
    id: 7,
    name: "Wooden Door",
    price: "₹25,000",
    category: "Doors",
    image: doorImage,
    galleryImages: [doorImage],
  },
  {
    id: 8,
    name: "Grey L-Shape Sectional Sofa",
    price: "₹52,000",
    category: "Sofas",
    image: sectionalSofaImage,
    galleryImages: [sectionalSofaImage],
  },
  {
    id: 9,
    name: "Contemporary Velvet 3-Seater Sofa",
    price: "₹38,000",
    category: "Sofas",
    image: velvetSofaImage,
    galleryImages: [velvetSofaImage],
  },
  {
    id: 10,
    name: "Modular Entertainment TV Unit",
    price: "₹29,500",
    category: "TV Units",
    image: modularTvUnitImage,
    galleryImages: [modularTvUnitImage],
  },
  {
    id: 11,
    name: "Royal Carved Teak Main Door",
    price: "₹45,000",
    category: "Doors",
    image: royalTeakDoorImage,
    galleryImages: [royalTeakDoorImage],
  },
  {
    id: 12,
    name: "Diamond Geometric Wooden Door",
    price: "₹34,000",
    category: "Doors",
    image: geometricDoorImage,
    galleryImages: [geometricDoorImage],
  },
  {
    id: 13,
    name: "Classic Wooden Frame Living Room Sofa Set",
    price: "₹46,000",
    category: "Sofas",
    image: woodenFrameSofaImage,
    galleryImages: [woodenFrameSofaImage],
  },
  {
    id: 14,
    name: "Modern Beige Corner Sectional Sofa",
    price: "₹58,000",
    category: "Sofas",
    image: beigeSectionalSofaImage,
    galleryImages: [beigeSectionalSofaImage],
  },
  {
    id: 15,
    name: "Grand Custom U-Shape Banquet Sofa",
    price: "₹68,000",
    category: "Sofas",
    image: grandUSectionalImage,
    galleryImages: [grandUSectionalImage],
  },
  {
    id: 16,
    name: "Modern Slatted Teak Double Door",
    price: "₹48,000",
    category: "Doors",
    image: slattedDoubleDoorImage,
    galleryImages: [slattedDoubleDoorImage],
  },
  {
    id: 17,
    name: "Luxury Caramel Leather Lounger Sofa",
    price: "₹54,000",
    category: "Sofas",
    image: caramelLeatherSectionalImage,
    galleryImages: [caramelLeatherSectionalImage],
  },
  {
    id: 18,
    name: "Emerald Green Velvet Sofa & Lounge Chair Set",
    price: "₹48,000",
    category: "Sofas",
    image: emeraldVelvetSofaImage,
    galleryImages: [emeraldVelvetSofaImage],
  },
  {
    id: 19,
    name: "Royal Carved Teak Double Glass Door",
    price: "₹56,000",
    category: "Doors",
    image: royalGlassDoorImage,
    galleryImages: [royalGlassDoorImage],
  },
  {
    id: 20,
    name: "Classical Corniced Teak Panel Door",
    price: "₹38,000",
    category: "Doors",
    image: classicalCornicedDoorImage,
    galleryImages: [classicalCornicedDoorImage],
  },
  {
    id: 21,
    name: "Artisan Rattan & Leatherette Living Suite",
    price: "₹62,000",
    category: "Sofas",
    image: rattanLivingSuiteImage,
    galleryImages: [rattanLivingSuiteImage],
  },
  {
    id: 22,
    name: "Slate Blue Modern Modular Sectional Suite",
    price: "₹65,000",
    category: "Sofas",
    image: slateBlueSectionalImage,
    galleryImages: [slateBlueSectionalImage],
  },
];

export const productCategories = [
  ...new Set(products.map((product) => product.category)),
];
