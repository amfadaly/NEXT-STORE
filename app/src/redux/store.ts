"use client";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. التعريفات (Interfaces) 📝
interface User {
  name: string;
  email: string;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  wishlist: CartItem[]; // مصفوفة الأمنيات الجديدة ❤️
  user: User | null;
}

// 2. تحميل البيانات من الـ LocalStorage 💾
const loadState = (): CartState => {
  if (typeof window === "undefined") return { items: [], wishlist: [], user: null };
  try {
    const savedState = localStorage.getItem("cart_app_data");
    if (!savedState) return { items: [], wishlist: [], user: null };

    const parsedData = JSON.parse(savedState);
    return {
      items: parsedData.items || [],
      wishlist: parsedData.wishlist || [],
      user: parsedData.user || null,
    };
  } catch (err) {
    return { items: [], wishlist: [], user: null };
  }
};

// 3. إنشاء الـ Slice 🍕
const cartSlice = createSlice({
  name: "cart",
  initialState: loadState(),
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.items = [];
      state.wishlist = [];
    },
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; type: "inc" | "dec" }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.type === "inc") item.quantity++;
        else if (action.payload.type === "dec" && item.quantity > 1) item.quantity--;
      }
    },
    // الميزة الجديدة: إضافة أو حذف من المفضلة 🔄
    toggleWishlist: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const index = state.wishlist.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.wishlist.splice(index, 1); // حذف إذا كان موجوداً
      } else {
        state.wishlist.push({ ...action.payload, quantity: 1 }); // إضافة إذا كان غائباً
      }
    },
  },
});

// 4. إعداد الـ Store وتصديره 🏗️
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// 5. حفظ التغييرات تلقائياً 🔄
if (typeof window !== "undefined") {
  store.subscribe(() => {
    localStorage.setItem("cart_app_data", JSON.stringify(store.getState().cart));
  });
}

// 6. تصدير الأكشنز والأنواع 📤
export const { addToCart, removeFromCart, updateQuantity, login, logout, toggleWishlist } = cartSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// لـ Next.js StoreProvider
export const makeStore = () => store;
export type AppStore = typeof store;
