import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { CartItem } from "../types/cart";

export interface OrderData {
  id: string;
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  grandTotal: number;
  paymentMethod: "online" | "advance25" | "cod";
  paymentStatus: "Paid" | "25% Advance Paid" | "Pending COD";
  orderStatus: "Placed" | "In Production" | "Shipped" | "Delivered";
  createdAt: string;
}

const ORDERS_COLLECTION = "orders";
const LOCAL_ORDERS_KEY = "hitech_wood_orders";

export async function createOrder(order: OrderData): Promise<{ success: boolean; id: string }> {
  try {
    // 1. Save to Cloud Firestore
    const orderDocRef = doc(db, ORDERS_COLLECTION, order.id);
    await setDoc(orderDocRef, order);

    // 2. Also save to local storage for instant offline viewing
    try {
      const existing = localStorage.getItem(LOCAL_ORDERS_KEY);
      const ordersArr: OrderData[] = existing ? JSON.parse(existing) : [];
      ordersArr.unshift(order);
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(ordersArr));
    } catch (e) {
      console.warn("Failed to update local orders storage:", e);
    }

    return { success: true, id: order.id };
  } catch (error) {
    console.warn("Firestore order creation failed, saving to local storage:", error);
    // Fallback save locally
    try {
      const existing = localStorage.getItem(LOCAL_ORDERS_KEY);
      const ordersArr: OrderData[] = existing ? JSON.parse(existing) : [];
      ordersArr.unshift(order);
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(ordersArr));
    } catch (e) {
      console.error("Local storage save error:", e);
    }
    return { success: true, id: order.id };
  }
}

export async function getUserOrders(userId?: string): Promise<OrderData[]> {
  try {
    if (userId) {
      const q = query(collection(db, ORDERS_COLLECTION), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const firestoreOrders: OrderData[] = [];
        snapshot.forEach((docSnap) => firestoreOrders.push(docSnap.data() as OrderData));
        return firestoreOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }
  } catch (e) {
    console.warn("Failed to fetch orders from Firestore:", e);
  }

  // Fallback to local storage
  try {
    const existing = localStorage.getItem(LOCAL_ORDERS_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (e) {
    return [];
  }
}

