'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Flame, MessageSquare, Utensils, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { STORE_WHATSAPP } from '../data/products';

export default function Header() {
  const { getTotalCount, getTotalPrice, setIsCartOpen } = useCartStore();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCount = mounted ? getTotalCount() : 0;
  const totalPrice = mounted ? getTotalPrice() : 0;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner Ticker in Appetite-Stimulating Culinary Red */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white text-xs md:text-sm font-medium py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-200" /> عرض الأسبوع
            </span>
            <span>كيس حراري خاص للفرن هدية مع كل دكر بط + شحن مبرد مجاني للطلبات فوق 900 ج</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-red-100">
              <Clock className="w-3.5 h-3.5" /> توصيل مبرد خلال 24-48 ساعة
            </span>
            <span className="flex items-center gap-1 text-red-100">
              <ShieldCheck className="w-3.5 h-3.5" /> لحوم ودواجن بلدية طازجة 100%
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar: Crisp Warm Ivory / Cream with Red highlights */}
      <div className={`transition-all duration-300 border-b border-[#E7DFD5] ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-[#FAF7F2] py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 flex items-center gap-1.5">
                شيف فرجاني
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  بلدي فاخر 🌿
                </span>
              </span>
              <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                سر تتبيلة زمان.. جاهز على نارك في دقايق
              </span>
            </div>
          </a>

          {/* Quick Category Anchors (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-stone-700">
            <a href="#hero-duck" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              سلطان البط
            </a>
            <a href="#menu-catalog" className="hover:text-red-600 transition-colors">
              قائمة المتبلات
            </a>
            <a href="#gathering-calculator" className="hover:text-red-600 transition-colors flex items-center gap-1 text-red-700 hover:text-red-800">
              <Utensils className="w-4 h-4 text-red-600" />
              حاسبة العزومات الذكية
            </a>
            <a href="#bundles" className="hover:text-red-600 transition-colors">
              بوكسات التوفير
            </a>
            <a href="#cooking-guide" className="hover:text-red-600 transition-colors">
              طريقة التسوية
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick WhatsApp Support (Herbal Green) */}
            <a
              href={`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent('السلام عليكم شيف فرجاني، محتاج استفسر عن تتبيلات اللحوم والبط البلدي')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-all shadow-xs"
              title="تواصل مباشر عبر الواتساب"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>استفسار واتساب</span>
            </a>

            {/* Cart Trigger Button: Appetite Red CTA */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black shadow-md shadow-red-600/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="عرض سلة التسوق"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {totalCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-stone-900 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-xs">
                    {totalCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-right leading-tight">
                <span className="text-[10px] font-bold text-red-100">السلة</span>
                <span className="text-xs sm:text-sm font-black text-white">
                  {totalPrice > 0 ? `${totalPrice} ج` : 'فارغة'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
