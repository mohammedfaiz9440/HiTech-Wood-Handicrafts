import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { products as localProducts } from "../data/Product";
import type { Product } from "../data/Product";

const PRODUCTS_COLLECTION = "products";

export interface FirebaseConnectionStatus {
  connected: boolean;
  productCount: number;
  isSeeded: boolean;
  error?: string;
  source: "firestore" | "local_fallback";
}

export async function checkFirebaseConnection(): Promise<FirebaseConnectionStatus> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return {
      connected: true,
      productCount: querySnapshot.size,
      isSeeded: !querySnapshot.empty,
      source: "firestore",
    };
  } catch (error: any) {
    return {
      connected: false,
      productCount: localProducts.length,
      isSeeded: false,
      error: error?.message || String(error),
      source: "local_fallback",
    };
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (querySnapshot.empty) {
      console.log("Firestore products collection is empty. Returning local default products.");
      return localProducts;
    }

    const firestoreProducts: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      firestoreProducts.push({
        id: typeof data.id === "number" ? data.id : parseInt(docSnap.id) || Math.random(),
        name: data.name || "Wooden Handicraft",
        price: data.price || "₹0",
        category: data.category || "General",
        image: data.image || "",
        galleryImages: data.galleryImages || [data.image],
      });
    });

    // Helper to check if image is a valid external URL
    const isValidExternalUrl = (url?: string) =>
      typeof url === "string" &&
      (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:"));

    // Merge: Include all local products, updating with Firestore data if present, while preserving bundled image assets
    const firestoreMap = new Map(firestoreProducts.map((p) => [p.id, p]));
    const merged: Product[] = localProducts.map((lp) => {
      const fp = firestoreMap.get(lp.id);
      if (!fp) return lp;
      const useFpImage = isValidExternalUrl(fp.image);
      return {
        ...lp,
        name: fp.name || lp.name,
        price: fp.price || lp.price,
        category: fp.category || lp.category,
        image: useFpImage ? fp.image : lp.image,
        galleryImages: useFpImage && fp.galleryImages?.length ? fp.galleryImages : lp.galleryImages,
      };
    });

    firestoreProducts.forEach((fp) => {
      if (!merged.some((p) => p.id === fp.id)) {
        merged.push(fp);
      }
    });

    return merged.length > 0 ? merged : localProducts;
  } catch (error) {
    console.warn("Failed to fetch products from Firestore, using local fallback:", error);
    return localProducts;
  }
}

export async function getProductById(id: number | string): Promise<Product | undefined> {
  const numericId = Number(id);
  const local = localProducts.find((p) => p.id === numericId);
  const isValidExternalUrl = (url?: string) =>
    typeof url === "string" &&
    (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:"));

  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, String(id));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const useDocImage = isValidExternalUrl(data.image);
      return {
        id: numericId,
        name: data.name || local?.name || "Wooden Handicraft",
        price: data.price || local?.price || "₹0",
        category: data.category || local?.category || "General",
        image: useDocImage ? data.image : (local?.image || data.image || ""),
        galleryImages: useDocImage && data.galleryImages?.length ? data.galleryImages : (local?.galleryImages || [data.image]),
      };
    }

    const all = await getAllProducts();
    return all.find((p) => p.id === numericId);
  } catch (error) {
    console.warn(`Failed to fetch product ${id} from Firestore, using local fallback:`, error);
    return localProducts.find((p) => p.id === numericId);
  }
}

export async function seedInitialProducts(): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    let count = 0;
    for (const product of localProducts) {
      const docRef = doc(db, PRODUCTS_COLLECTION, String(product.id));
      await setDoc(docRef, {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        galleryImages: product.galleryImages,
        updatedAt: new Date().toISOString(),
      });
      count++;
    }
    return { success: true, count };
  } catch (error: any) {
    console.error("Error seeding initial products to Firestore:", error);
    return { success: false, count: 0, error: error?.message || String(error) };
  }
}
