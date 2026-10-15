'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product, ProductVariant, DeliveryDetails } from '../types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  selectedCookingProduct: Product | null;
  deliveryDetails: DeliveryDetails;
  
  // Actions
  setIsCartOpen: (open: boolean) => void;
  setSelectedCookingProduct: (product: Product | null) => void;
  addItem: (product: Product, quantity?: number, selectedVariant?: ProductVariant, openCart?: boolean) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  addMultipleItems: (itemsToAdd: { product: Product; quantity: number; selectedVariant?: ProductVariant }[]) => void;
  clearCart: () => void;
  setDeliveryDetails: (details: Partial<DeliveryDetails>) => void;

  // Helpers
  getTotalCount: () => number;
  getSubtotal: () => number;
  getShippingFee: () => number;
  getTotalPrice: () => number;
}

const defaultDeliveryDetails: DeliveryDetails = {
  fullName: '',
  phone: '',
  alternatePhone: '',
  city: 'القاهرة',
  address: '',
  deliveryDate: '',
  deliveryTimeSlot: 'قبل الغداء (1:00 م - 3:00 م)',
  notes: '',
  paymentMethod: 'whatsapp',
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      selectedCookingProduct: null,
      deliveryDetails: defaultDeliveryDetails,

      setIsCartOpen: (open) => set({ isCartOpen: open }),
      
      setSelectedCookingProduct: (product) => set({ selectedCookingProduct: product }),

      addItem: (product, quantity = 1, selectedVariant, openCart = false) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedVariant?.id === selectedVariant?.id
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return {
              items: updatedItems,
              ...(openCart ? { isCartOpen: true } : {}),
            };
          } else {
            return {
              items: [...state.items, { product, quantity, selectedVariant }],
              ...(openCart ? { isCartOpen: true } : {}),
            };
          }
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                (!variantId || item.selectedVariant?.id === variantId)
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) =>
                  !(
                    item.product.id === productId &&
                    (!variantId || item.selectedVariant?.id === variantId)
                  )
              ),
            };
          }

          return {
            items: state.items.map((item) => {
              if (
                item.product.id === productId &&
                (!variantId || item.selectedVariant?.id === variantId)
              ) {
                return { ...item, quantity };
              }
              return item;
            }),
          };
        });
      },

      addMultipleItems: (itemsToAdd) => {
        set((state) => {
          const currentItems = [...state.items];

          itemsToAdd.forEach(({ product, quantity, selectedVariant }) => {
            const existingIndex = currentItems.findIndex(
              (item) =>
                item.product.id === product.id &&
                item.selectedVariant?.id === selectedVariant?.id
            );

            if (existingIndex > -1) {
              currentItems[existingIndex].quantity += quantity;
            } else {
              currentItems.push({ product, quantity, selectedVariant });
            }
          });

          return { items: currentItems, isCartOpen: true };
        });
      },

      clearCart: () => set({ items: [] }),

      setDeliveryDetails: (details) =>
        set((state) => ({
          deliveryDetails: { ...state.deliveryDetails, ...details },
        })),

      getTotalCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.product.price + (item.selectedVariant?.priceDelta || 0);
          return total + price * item.quantity;
        }, 0);
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 900 ? 0 : 50; // Free shipping over 900 EGP
      },

      getTotalPrice: () => {
        return get().getSubtotal() + get().getShippingFee();
      },
    }),
    {
      name: 'chef-fergany-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        deliveryDetails: state.deliveryDetails,
      }),
    }
  )
);
