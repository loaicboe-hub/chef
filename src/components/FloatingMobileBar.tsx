'use client';

import React from 'react';
import { ShoppingBag, MessageSquare } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { STORE_WHATSAPP } from '../data/products';

export default function FloatingMobileBar() {
  const { getTotalCount, getTotalPrice, setIsCartOpen } = useCartStore();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const totalCount = mounted ? getTotalCount() : 0;
  const totalPrice = mounted ? getTotalPrice() : 0;

  if (totalCount === 0) return null;

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 animate-slide-up pb-safe">
      <div className="bg-white/95 backdrop-blur-md border border-red-300 rounded-2xl p-3 shadow-xl flex items-center justify-between gap-3">
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-black text-xs sm:text-sm shadow-md shadow-red-600/25 active:scale-95 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                {totalCount}
              </span>
            </div>
            <span>عرض سلة الطلبات</span>
          </div>
          <span className="text-sm font-black">{totalPrice} ج</span>
        </button>

        <a
          href={`https://wa.me/${STORE_WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
          aria-label="تواصل واتساب"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
        </a>
      </div>
    </div>
  );
}
