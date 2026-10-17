'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  Flame,
  Sparkles,
  CheckCircle2,
  ChefHat,
  Clock,
  ShoppingBag,
  ArrowLeft,
  Shield,
  Gift,
  ChevronRight,
  ChevronLeft,
  Check,
  Package,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS } from '../data/products';

interface HeroSlideItem {
  id: string;
  productId: string;
  tagline: string;
  badge: string;
  badgeIcon: 'flame' | 'crown' | 'sparkles' | 'shield';
  bonusPerk: string;
  title: string;
  subtitle: string;
  description: string;
  savingsText: string;
  pillLabel: string;
  pillIcon: string;
  stats: {
    icon: 'clock' | 'shield' | 'chef';
    label: string;
    value: string;
    sub: string;
  }[];
  floatingFreshness: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'hero-duck',
    productId: 'duck-roast-herbs',
    tagline: 'سر تتبيلة الشيف فرجاني المعتقة • جاهز على نارك فوراً 🥩',
    badge: 'سلطان السفرة • الأكثر طلباً 🔥',
    badgeIcon: 'flame',
    bonusPerk: 'كيس حراري خاص هدية مرفق 🎁',
    title: 'دكر بط بلدي متبل روستو',
    subtitle: '(مغلف فاكيوم جاهز على الكيس الحراري مباشرة)',
    description:
      'بط فلاحي منتقى بالجرام، مغسول بمحلول نقع بالليمون والزنجبيل، ومتبل بخلطة البرتقال الفريش وعسل النحل الجبلي مع المستكة والحبهان. ضعه داخل الكيس المرفق ليخرج طرياً ودايب زي الزبدة مع جلد مقرمش بلون برونزي ساحر.',
    savingsText: 'وفر 80 ج',
    pillLabel: 'دكر بط بلدي',
    pillIcon: '🦆',
    stats: [
      { icon: 'clock', label: 'التحضير', value: '0 دقيقة', sub: 'مباشرة للفرن' },
      { icon: 'shield', label: 'الوزن', value: '3 كجم تقريباً', sub: '5 - 6 أفراد' },
      { icon: 'chef', label: 'التسوية', value: 'كيس حراري', sub: 'مرفق مجاناً' },
    ],
    floatingFreshness: 'بلدي فلاحي 100% 🌿',
  },
  {
    id: 'hero-bundle',
    productId: 'bundle-royal-banquet',
    tagline: 'وليمة كبابجي وبط متكاملة تشرفك أمام ضيوفك 👑',
    badge: 'باقة العزومات الكبرى • توفير ضخم 🌟',
    badgeIcon: 'crown',
    bonusPerk: 'توفير 240 ج + كيس حراري للبط 🎁',
    title: 'بوكس العزومة الملكي الفاخر',
    subtitle: '(دكر بط متبل + 1ك كفتة حاتي + 1ك طرب + 0.5ك سجق)',
    description:
      'التشكيلة الأقوى والأشمل للعزومات العائلية! دكر بط بلدي متبل روستو بالكيس الحراري مع تشكيلة مشاوي كبابجي معتقة: كفتة حاتي مصبعة، طرب بلدي بمنديل ضاني رقيق، وسجق بلدي بالخلطة السرية.',
    savingsText: 'وفر 240 ج',
    pillLabel: 'بوكس العزومة الملكي',
    pillIcon: '👑',
    stats: [
      { icon: 'shield', label: 'الوزن الإجمالي', value: '5.8 كجم', sub: 'مشويات وبط' },
      { icon: 'clock', label: 'الوليمة', value: '8 - 10 أفراد', sub: 'سفرة كاملة' },
      { icon: 'chef', label: 'التسوية', value: 'متزامنة 90 د', sub: 'جاهز للشوي' },
    ],
    floatingFreshness: 'عزومة متكاملة فاخرة 🥩',
  },
  {
    id: 'hero-kofta',
    productId: 'kofta-hati',
    tagline: 'لحم بلدي فريش بنسبة دهن دقيقة 20%.. ماسكة في السيخ وجوسي 🔥',
    badge: 'الأعلى مبيعاً • مشاوي حاتي بلدي 🥩',
    badgeIcon: 'flame',
    bonusPerk: 'مصبعة جاهزة للشواية في 12 دقيقة ⚡',
    title: 'كفتة حاتي بلدي متبلة ومصبعة',
    subtitle: '(مفرومة مرتين مع لية ضاني وتوابل الحاتي الأصلية)',
    description:
      'كفتة حاتي أصلية بدون أي فول صويا أو عيش نهائياً. متبلة بماء البصل المصفى وبهار فرجاني الخاص، ومصبعة باحترافية على أسياخ حاتي لتنزل مباشرة على الفحم أو الجريل أو صينية الفرن.',
    savingsText: 'وفر 40 ج',
    pillLabel: 'كفتة حاتي مصبعة',
    pillIcon: '🥩',
    stats: [
      { icon: 'clock', label: 'التسوية', value: '12 دقيقة', sub: 'شواية أو إيرفراير' },
      { icon: 'shield', label: 'الكمية', value: '1 كجم صافي', sub: '14 - 16 صباع' },
      { icon: 'chef', label: 'الجودة', value: 'بلدي 100%', sub: 'بدون إضافات' },
    ],
    floatingFreshness: 'طازجة ومصبعة يومياً 🌿',
  },
  {
    id: 'hero-stuffed-duck',
    productId: 'duck-stuffed',
    tagline: 'فخامة السفرة المصرية • محشو وجاهز على صينية الفرن فوراً ✨',
    badge: 'فاخر للعزومات • نكهة لا تُنسى 🌟',
    badgeIcon: 'sparkles',
    bonusPerk: 'محشي جاهز (ورق عنب أو أرز بالخلطة) 🌿',
    title: 'بط بلدي محشي فاخر للعزومات',
    subtitle: '(محشو بالكامل وجاهز على الصينية دون أي مجهود)',
    description:
      'بطة بلدي فلاحي متبلة بعناية ومحشوة باحترافية لتكون نجمة سفرتك. تغليف مزدوج واقي للحرارة يضمن ثبات الحشوة ونضج لحم البط طرياً وذائباً كالحلوى مع كل قطمة.',
    savingsText: 'وفر 80 ج',
    pillLabel: 'بط بلدي محشي',
    pillIcon: '🍗',
    stats: [
      { icon: 'clock', label: 'التسوية', value: '110 دقيقة', sub: 'فرن على الهادي' },
      { icon: 'shield', label: 'الوزن', value: '3.5 كجم بالمحشي', sub: '6 - 7 أفراد' },
      { icon: 'chef', label: 'الحشوة', value: 'ورق عنب / أرز', sub: 'مبهر بالمكسرات' },
    ],
    floatingFreshness: 'محشو طازج بالطلب 🌟',
  },
  {
    id: 'hero-butterfly',
    productId: 'butterfly-chicken',
    tagline: 'مفتوحة فراشة لاستواء متجانس وسريع مع جلد مقرمش ونكهة شواء حاتي 🍗',
    badge: 'جاهزة للشواية والفرن • مشاوي سريعة 🔥',
    badgeIcon: 'flame',
    bonusPerk: 'استواء متجانس في 45 دقيقة فقط ⏱️',
    title: 'فراخ للشوي فراشة متبلة',
    subtitle: '(فرخة كاملة مفتوحة فراشة متبلة بخلطة الحاتي)',
    description:
      'دجاجة طازجة كاملة مفتوحة من الظهر بطريقة الفراشة الاحترافية ومغموسة بتتبيلة الحاتي الخاصة بالزعتر البري وعصير البرتقال. تنضج في نصف الوقت المعتاد مع قرمشة خيالية للجلد.',
    savingsText: 'وفر 40 ج',
    pillLabel: 'فراخ فراشة مشوية',
    pillIcon: '🔥',
    stats: [
      { icon: 'clock', label: 'التسوية', value: '45 دقيقة', sub: 'فرن أو فحم' },
      { icon: 'shield', label: 'الوزن', value: '1.5 كجم صافي', sub: 'تكفي 4 أفراد' },
      { icon: 'chef', label: 'التتبيلة', value: 'تتبيلة حاتي', sub: 'زعتر وبرتقال' },
    ],
    floatingFreshness: 'متبلة فريش للشوي 🌿',
  },
];

export default function HeroDuckBanner() {
  const { addItem, setSelectedCookingProduct } = useCartStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const activeSlide = HERO_SLIDES[currentSlide];
  const activeProduct =
    PRODUCTS.find((p) => p.id === activeSlide.productId) || PRODUCTS[0];

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-advance timer (5 seconds) with pause on hover/interaction
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNextSlide();
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, goToNextSlide]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(activeProduct, 1, undefined, true);
    setAddedItemMap((prev) => ({ ...prev, [activeProduct.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [activeProduct.id]: false }));
    }, 2200);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current;
      // In RTL: swipe left (diff > 40) moves next, swipe right (diff < -40) moves prev
      if (diff > 45) {
        goToNextSlide();
      } else if (diff < -45) {
        goToPrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const renderBadgeIcon = (type: HeroSlideItem['badgeIcon']) => {
    switch (type) {
      case 'crown':
        return <Package className="w-4 h-4 text-amber-300 shrink-0" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />;
      default:
        return <Flame className="w-4 h-4 text-red-400 fill-red-500 shrink-0" />;
    }
  };

  const renderStatIcon = (type: 'clock' | 'shield' | 'chef') => {
    switch (type) {
      case 'clock':
        return <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'shield':
        return <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'chef':
        return <ChefHat className="w-3.5 h-3.5 text-red-400 shrink-0" />;
    }
  };

  return (
    <section
      id="hero-duck"
      className="relative overflow-hidden pt-3 sm:pt-6 pb-8 sm:pb-12 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE3] to-[#FAF7F2]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle warm ambient backlights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grand Rotating Hero Banner Card */}
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#1C1715] via-[#161210] to-[#0D0B0A] text-white shadow-2xl border border-stone-800 transition-all">
          {/* Subtle warm ember decorative gradients inside the card */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Rotating Header Bar */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-2.5 px-4 sm:px-8 pt-4 sm:pt-6 pb-3 border-b border-stone-800/80 bg-stone-950/40 backdrop-blur-md">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-200 text-xs sm:text-sm font-extrabold shadow-xs">
                {renderBadgeIcon(activeSlide.badgeIcon)}
                <span>{activeSlide.badge}</span>
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{activeSlide.floatingFreshness}</span>
              </span>
            </div>

            {/* Slide Index Counter & Bonus Perk */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-amber-200 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-700/50">
                <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{activeSlide.bonusPerk}</span>
              </span>

              <div className="flex items-center gap-1 bg-stone-900/90 border border-stone-700/80 px-2.5 py-1 rounded-full text-xs font-black text-stone-300">
                <span className="text-amber-400">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="text-stone-500">/</span>
                <span>{String(HERO_SLIDES.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* Slide Content Body: Responsive Grid */}
          <div className="relative z-10 p-4 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Text & Content Column (7 cols on Desktop) */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 text-right order-2 lg:order-1">
                {/* Tagline */}
                <div>
                  <div className="inline-flex items-center gap-2 text-amber-400 font-extrabold text-xs sm:text-sm tracking-wide mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{activeSlide.tagline}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                    {activeSlide.title}
                    <span className="block text-base sm:text-2xl lg:text-3xl mt-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                      {activeSlide.subtitle}
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {activeSlide.description}
                </p>

                {/* Quick Specs Cards in Glassmorphic Dark Charcoal */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-1">
                  {activeSlide.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 sm:p-3.5 rounded-2xl bg-stone-900/80 border border-stone-700/70 flex flex-col gap-0.5 sm:gap-1 text-center sm:text-right backdrop-blur-xs"
                    >
                      <span className="text-[10px] sm:text-xs text-stone-400 font-bold flex items-center justify-center sm:justify-start gap-1">
                        {renderStatIcon(stat.icon)}
                        <span>{stat.label}</span>
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white truncate">
                        {stat.value}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-amber-300 font-bold truncate">
                        {stat.sub}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Call to Action Row */}
                <div className="pt-3 sm:pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  {/* Price Area */}
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-stone-500 font-bold line-through">
                        {activeProduct.originalPrice} ج
                      </span>
                      <span className="text-2xl sm:text-4xl font-black text-amber-400">
                        {activeProduct.price}{' '}
                        <span className="text-sm sm:text-base text-stone-300 font-bold">جنيه</span>
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-red-950/80 border border-red-700/60 text-red-300 text-xs font-black">
                      {activeSlide.savingsText}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setSelectedCookingProduct(activeProduct)}
                      className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 hover:text-white text-xs sm:text-sm font-bold transition-all border border-stone-700 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                    >
                      <ChefHat className="w-4 h-4 text-amber-400" />
                      <span>طريقة التسوية</span>
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className={`w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                        addedItemMap[activeProduct.id]
                          ? 'bg-emerald-600 text-white scale-102'
                          : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 hover:scale-102 active:scale-95'
                      }`}
                    >
                      {addedItemMap[activeProduct.id] ? (
                        <>
                          <Check className="w-5 h-5 text-white" />
                          <span>تمت الإضافة للسلة بنجاح ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-5 h-5 text-white" />
                          <span>أضف للسلة الآن</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Large Visual Image Column (5 cols on Desktop) */}
              <div className="lg:col-span-5 relative order-1 lg:order-2">
                <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl overflow-hidden border-2 border-stone-700/80 shadow-2xl group bg-stone-950">
                  {/* Photo Container */}
                  <div className="aspect-[4/3] sm:aspect-[5/4] lg:aspect-square relative w-full overflow-hidden">
                    <Image
                      key={activeProduct.id}
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 animate-fadeIn"
                    />

                    {/* Gradient Vignette over photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Floating Freshness Stamp (Top-Right) */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-stone-900/90 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 shadow-xl">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-600/40">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-stone-400 font-bold">جاهز على التسوية</p>
                      <p className="text-xs font-black text-emerald-300">متبل فاكيوم طازج 🌿</p>
                    </div>
                  </div>

                  {/* Navigation Arrows positioned on the image container */}
                  <button
                    onClick={goToPrevSlide}
                    aria-label="الصنف السابق"
                    className="absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-stone-900/85 hover:bg-stone-800 text-white backdrop-blur-md border border-stone-600/70 flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer z-20"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <button
                    onClick={goToNextSlide}
                    aria-label="الصنف التالي"
                    className="absolute top-1/2 -translate-y-1/2 left-3 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-stone-900/85 hover:bg-stone-800 text-white backdrop-blur-md border border-stone-600/70 flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer z-20"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Teaser Footer Link inside the image card */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-2xl p-2.5 sm:p-3 shadow-xl flex items-center justify-between">
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] sm:text-[11px] font-bold text-amber-400">
                        تصفح القائمة كاملة:
                      </span>
                      <span className="text-xs font-black text-white">
                        بط، مشاوي حاتي، دجاج، بوكسات
                      </span>
                    </div>
                    <a
                      href="#menu-catalog"
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-black transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>عرض</span>
                      <ArrowLeft className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Product Selector Pills & Progress Indicator */}
          <div className="relative z-20 border-t border-stone-800/80 bg-stone-950/80 backdrop-blur-md px-3 sm:px-8 py-3">
            {/* Countdown Progress Bar */}
            <div className="relative w-full h-1 bg-stone-800 rounded-full overflow-hidden mb-3">
              <div
                key={currentSlide}
                className={`h-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 rounded-full ${
                  isPaused ? 'w-full opacity-60' : 'animate-heroProgress'
                }`}
              />
            </div>

            {/* Product Switcher Pills */}
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30 scale-102 border border-red-400/50'
                        : 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800'
                    }`}
                  >
                    <span>{slide.pillIcon}</span>
                    <span>{slide.pillLabel}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping inline-block" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
