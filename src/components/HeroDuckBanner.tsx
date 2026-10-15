'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Flame, Sparkles, CheckCircle2, ChefHat, Clock, ShoppingBag, ArrowLeft, Shield, Gift } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS } from '../data/products';

export default function HeroDuckBanner() {
  const { addItem, setSelectedCookingProduct } = useCartStore();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const heroDuck = PRODUCTS.find((p) => p.id === 'duck-roast-herbs') || PRODUCTS[0];

  const handleAddHeroDuck = () => {
    addItem(heroDuck, 1, undefined, true);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <section id="hero-duck" className="relative overflow-hidden pt-6 pb-14 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE8] to-[#FAF7F2]">
      {/* Background subtle warm glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Card Container in Warm Ivory/White with Appetite Red Border */}
        <div className="rounded-3xl border border-red-100 bg-white p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
          {/* Top Badge Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F0EAE1]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm font-extrabold shadow-xs">
                <Flame className="w-4 h-4 text-red-600 fill-red-500" />
                سلطان السفرة المصرية • الصنف رقم #1
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> بلدي فلاحي طازج 100% 🌿
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-red-900 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              <Gift className="w-4 h-4 text-red-600" />
              <span>كيس حراري خاص للفرن هدية مع كل عبوة</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5 text-right">
              <div>
                <div className="inline-block text-red-600 font-extrabold text-sm sm:text-base tracking-wide mb-1">
                  سر تتبيلة الشيف فرجاني.. متبل طازج قبل التسوية وجاهز على نارك فوراً 🥩
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
                  دكر بط بلدي متبل روستو
                  <span className="block text-2xl sm:text-3xl lg:text-4xl mt-1 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                    (مغلف فاكيوم جاهز على الكيس الحراري)
                  </span>
                </h1>
              </div>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                بط فلاحي منتقى بالجرام ومغسول بمحلول نقع بالليمون والزنجبيل، ومتبل بخلطة الشيف فرجاني
                المعتقة: <strong className="text-red-700 font-bold">بصل مبشور مكرمل، عصير برتقال فريش، عسل نحل جبلي، ومستكة وحبهان</strong>.
                مغلف سحب هواء فاكيوم معقم، تدخله الفرن داخل الكيس المرفق ويخرج طرياً ودايب زي الزبدة مع جلد مقرمش بلون برونزي ساحر.
              </p>

              {/* Badges and Perks Grid in Soft Cream/Beige with Red highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col gap-1">
                  <span className="text-xs text-stone-500 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-600" /> وقت التحضير
                  </span>
                  <span className="text-sm font-black text-stone-900">0 دقيقة تجهيز</span>
                  <span className="text-[11px] text-red-700 font-bold">مباشرة إلى الفرن</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col gap-1">
                  <span className="text-xs text-stone-500 font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" /> الوزن والحجم
                  </span>
                  <span className="text-sm font-black text-stone-900">2.8 - 3.2 كجم</span>
                  <span className="text-[11px] text-stone-500 font-medium">يكفي 5 - 6 أفراد</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col gap-1 col-span-2 sm:col-span-1">
                  <span className="text-xs text-stone-500 font-bold flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5 text-amber-600" /> طريقة الطهي
                  </span>
                  <span className="text-sm font-black text-stone-900">كيس حراري خاص</span>
                  <span className="text-[11px] text-red-700 font-bold">مرفق داخل العبوة</span>
                </div>
              </div>

              {/* Price & Action Area */}
              <div className="pt-4 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-stone-400 font-bold line-through">
                      {heroDuck.originalPrice} ج
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-red-600">
                      {heroDuck.price} <span className="text-base text-stone-700 font-bold">جنيه</span>
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-red-100 border border-red-200 text-red-700 text-xs font-black">
                    وفر 80 ج
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCookingProduct(heroDuck)}
                    className="px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-bold transition-all border border-stone-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <ChefHat className="w-4 h-4 text-red-600" />
                    <span>طريقة التسوية</span>
                  </button>

                  <button
                    onClick={handleAddHeroDuck}
                    className={`flex-1 sm:flex-none px-6 py-3.5 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white scale-105'
                        : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 text-white" />
                    <span>{addedAnimation ? 'تمت الإضافة للسلة بنجاح ✓' : 'أضف دكر البط للسلة'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Column with Appetizing Photo and Red Outline Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border-2 border-red-300 shadow-xl group bg-stone-100 hover:border-red-400 transition-colors">
                <div className="aspect-[4/3] sm:aspect-square relative w-full">
                  <Image
                    src={heroDuck.image}
                    alt={heroDuck.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                </div>

                {/* Floating Freshness Stamp (Herbal Green & Warm White) */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-emerald-200 rounded-2xl p-2.5 flex items-center gap-2 shadow-lg">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-stone-500 font-bold">جاهز على التسوية</p>
                    <p className="text-xs font-black text-emerald-900">متبل فاكيوم طازج 🌿</p>
                  </div>
                </div>

                {/* Stuffed Duck Teaser Banner Bottom */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-red-200 rounded-2xl p-3 shadow-lg flex items-center justify-between">
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] font-bold text-red-700">متوفر أيضاً:</span>
                    <span className="text-xs font-black text-stone-900">بط بلدي محشي ورق عنب أو أرز بالخلطة</span>
                  </div>
                  <a
                    href="#menu-catalog"
                    className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-xs font-black transition-colors flex items-center gap-1"
                  >
                    <span>عرض</span>
                    <ArrowLeft className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
