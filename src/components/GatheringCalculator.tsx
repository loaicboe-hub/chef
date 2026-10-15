'use client';

import React, { useState } from 'react';
import { Users, Utensils, Check, Sparkles, ShoppingBag, Flame, ChefHat } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS, GATHERING_PLANS } from '../data/products';
import { Product } from '../types';

export default function GatheringCalculator() {
  const { addMultipleItems } = useCartStore();
  const [guestCount, setGuestCount] = useState<number>(8);
  const [mealFocus, setMealFocus] = useState<'duck_baladi' | 'bbq_meats' | 'family_mix'>('duck_baladi');
  const [successMessage, setSuccessMessage] = useState(false);

  const guestOptions = [4, 6, 8, 12, 16];

  const focusOptions = [
    {
      id: 'duck_baladi' as const,
      label: 'سفرة بلدي وبط',
      subtitle: 'بط بلدي روستو ومحشي + كفتة حاتي وسجق',
      icon: <Flame className="w-4 h-4 text-red-600" />,
    },
    {
      id: 'bbq_meats' as const,
      label: 'مشاوي حاتي فاخرة',
      subtitle: 'كفتة وطرب وشيش طاووق وفراخ مشوية',
      icon: <Utensils className="w-4 h-4 text-red-600" />,
    },
    {
      id: 'family_mix' as const,
      label: 'مكس عائلي واقتصادي',
      subtitle: 'بوكسات توفير متكاملة لإطعام أكبر عدد بأوفر سعر',
      icon: <Sparkles className="w-4 h-4 text-emerald-700" />,
    },
  ];

  const getCalculatedItems = () => {
    const matchedPlan = GATHERING_PLANS.find(
      (p) => p.guests === guestCount && p.focus === mealFocus
    );

    if (matchedPlan) {
      return matchedPlan.items.map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return {
          product: product!,
          quantity: item.quantity,
          customNote: item.customNote,
        };
      }).filter((item) => item.product);
    }

    if (mealFocus === 'duck_baladi') {
      const ducksNeeded = Math.ceil(guestCount / 6);
      const koftaNeeded = Math.ceil(guestCount / 4);
      const sausageNeeded = Math.ceil(guestCount / 8);

      const items: { product: Product; quantity: number; customNote?: string }[] = [];
      const duck = PRODUCTS.find((p) => p.id === 'duck-roast-herbs');
      const kofta = PRODUCTS.find((p) => p.id === 'kofta-hati');
      const sausage = PRODUCTS.find((p) => p.id === 'sujuk-baladi');

      if (duck) items.push({ product: duck, quantity: ducksNeeded, customNote: `${ducksNeeded} دكر بط بلدي متبل روستو` });
      if (kofta) items.push({ product: kofta, quantity: koftaNeeded, customNote: `${koftaNeeded} كجم كفتة حاتي مصبعة` });
      if (sausage) items.push({ product: sausage, quantity: sausageNeeded, customNote: `${sausageNeeded} كجم سجق بلدي` });
      return items;
    } else if (mealFocus === 'bbq_meats') {
      const koftaNeeded = Math.ceil(guestCount / 4);
      const shishNeeded = Math.ceil(guestCount / 4);
      const tarbNeeded = Math.ceil(guestCount / 8);

      const items: { product: Product; quantity: number; customNote?: string }[] = [];
      const kofta = PRODUCTS.find((p) => p.id === 'kofta-hati');
      const shish = PRODUCTS.find((p) => p.id === 'shish-tawook');
      const tarb = PRODUCTS.find((p) => p.id === 'tarb-baladi');

      if (kofta) items.push({ product: kofta, quantity: koftaNeeded, customNote: `${koftaNeeded} كجم كفتة حاتي` });
      if (shish) items.push({ product: shish, quantity: shishNeeded, customNote: `${shishNeeded} كجم شيش طاووق` });
      if (tarb) items.push({ product: tarb, quantity: tarbNeeded, customNote: `${tarbNeeded} كجم طرب بلدي` });
      return items;
    } else {
      const bundlesNeeded = Math.ceil(guestCount / 8);
      const royalBundle = PRODUCTS.find((p) => p.id === 'bundle-royal-banquet');
      return royalBundle
        ? [{ product: royalBundle, quantity: bundlesNeeded, customNote: `${bundlesNeeded} بوكس العزومة الملكي المتكامل` }]
        : [];
    }
  };

  const calculatedItems = getCalculatedItems();

  const totalPrice = calculatedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const pricePerGuest = guestCount > 0 ? Math.round(totalPrice / guestCount) : 0;

  const handleAddAllToCart = () => {
    addMultipleItems(
      calculatedItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }))
    );
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 2500);
  };

  return (
    <section id="gathering-calculator" className="py-16 bg-[#F5EFE6] relative overflow-hidden border-t border-b border-[#E7DFD5]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 border border-red-200 text-red-900 text-xs sm:text-sm font-black">
            <Utensils className="w-4 h-4 text-red-600" />
            حاسبة العزومات الذكية
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900">
            عندك عزومة ومحتار في الكميات والأصناف؟
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            حدد عدد ضيوفك ونوع السفرة التي تفضلها، وسيقوم النظام فوراً بحساب الكميات والأصناف المتوازنة
            بالجرام مع إمكانية إضافة السفرة بالكامل لسلتك بضغطة زر واحدة.
          </p>
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 bg-white border border-[#E7DFD5] rounded-3xl p-4 sm:p-8 shadow-sm">
            {/* Step 1: Guest Count */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-black text-stone-900 flex items-center gap-1.5 sm:gap-2">
                  <Users className="w-4 h-4 text-red-600" />
                  1. حدد عدد الأفراد أو الضيوف:
                </span>
                <span className="text-xs sm:text-sm font-black text-red-700 bg-red-50 px-2.5 sm:px-3 py-0.5 rounded-full border border-red-200">
                  {guestCount} أفراد
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {guestOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => setGuestCount(num)}
                    className={`py-2.5 sm:py-3 px-1 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                      guestCount === num
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/25 scale-102 sm:scale-105'
                        : 'bg-[#FAF7F2] hover:bg-[#F2ECE3] text-stone-700 border border-[#E7DFD5]'
                    }`}
                  >
                    {num} {num >= 16 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Meal Focus Selection */}
            <div>
              <span className="text-xs sm:text-sm font-black text-stone-900 block mb-2.5 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                <ChefHat className="w-4 h-4 text-red-600" />
                2. نوع السفرة والتركيز المفضل:
              </span>

              <div className="grid grid-cols-1 gap-2 sm:gap-2.5">
                {focusOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMealFocus(opt.id)}
                    className={`p-3 sm:p-3.5 rounded-2xl text-right transition-all flex items-center justify-between cursor-pointer border ${
                      mealFocus === opt.id
                        ? 'bg-red-50/80 border-red-500 shadow-xs'
                        : 'bg-[#FAF7F2] border-[#E7DFD5] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          mealFocus === opt.id ? 'bg-red-600 text-white' : 'bg-white text-stone-600 border border-[#E7DFD5]'
                        }`}
                      >
                        {opt.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs sm:text-sm font-black text-stone-900 truncate">{opt.label}</span>
                        <span className="text-[11px] sm:text-xs text-stone-500 line-clamp-1">{opt.subtitle}</span>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center shrink-0 mr-2 ${
                        mealFocus === opt.id
                          ? 'border-red-600 bg-red-600 text-white'
                          : 'border-stone-300'
                      }`}
                    >
                      {mealFocus === opt.id && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results & Recommendation Output Column with Appetite Red Border */}
          <div className="lg:col-span-6 bg-white border-2 border-red-300 rounded-3xl p-4 sm:p-8 shadow-md relative">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                <span className="text-xs sm:text-sm font-black text-stone-900">
                  الباقة المقترحة لعزومة ({guestCount} أفراد)
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-red-900 bg-red-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-red-200">
                حساب محسوب بدقة
              </span>
            </div>

            {/* Itemized List */}
            <div className="divide-y divide-[#F0EAE1] py-3 sm:py-4 space-y-2.5 sm:space-y-3">
              {calculatedItems.map((item, idx) => (
                <div key={idx} className="pt-2.5 first:pt-0 flex items-center justify-between gap-2 sm:gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-red-100 text-red-800 text-xs font-black flex items-center justify-center shrink-0">
                      {item.quantity}×
                    </span>
                    <div className="flex flex-col text-right min-w-0">
                      <span className="text-xs sm:text-sm font-black text-stone-900 truncate">{item.product.name}</span>
                      <span className="text-[11px] sm:text-xs text-stone-500 truncate">
                        {item.customNote || item.product.weight}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-black text-red-600 whitespace-nowrap shrink-0">
                    {item.product.price * item.quantity} ج
                  </span>
                </div>
              ))}
            </div>

            {/* Price Summary Breakdown */}
            <div className="pt-4 border-t border-[#F0EAE1] bg-[#FAF7F2] -mx-4 -mb-4 p-4 sm:-mx-8 sm:-mb-8 sm:p-6 rounded-b-3xl space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col text-right">
                  <span className="text-[11px] sm:text-xs text-stone-500 font-bold">إجمالي تكلفة العزومة:</span>
                  <span className="text-xl sm:text-3xl font-black text-red-600">
                    {totalPrice} <span className="text-xs sm:text-sm text-stone-700">جنيه</span>
                  </span>
                </div>

                <div className="text-left bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-[#E7DFD5] shadow-2xs">
                  <span className="text-[10px] text-stone-500 block font-bold">التكلفة التقريبية للفرد:</span>
                  <span className="text-xs sm:text-sm font-black text-emerald-800">{pricePerGuest} ج / فرد</span>
                </div>
              </div>

              {/* 1-Click Add All Button */}
              <button
                onClick={handleAddAllToCart}
                className={`w-full py-3 sm:py-3.5 rounded-2xl font-black text-xs sm:text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  successMessage
                    ? 'bg-emerald-600 text-white scale-102'
                    : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 hover:scale-102 active:scale-98'
                }`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{successMessage ? 'تمت إضافة العزومة بالكامل للسلة بنجاح ✓' : 'أضف العزومة بالكامل للسلة'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
