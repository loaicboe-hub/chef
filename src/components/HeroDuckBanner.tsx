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
  Shield,
  Gift,
  ChevronRight,
  ChevronLeft,
  Check,
  Package,
  ArrowLeft,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS } from '../data/products';

interface HeroSlideItem {
  id: string;
  productId: string;
  tagline: string;
  badge: string;
  badgeIcon: 'flame' | 'crown' | 'sparkles';
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

  // Auto-advance timer (5.5 seconds) with pause on hover/interaction
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
      // In RTL: swipe left (diff > 45) moves next, swipe right (diff < -45) moves prev
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
      className="relative w-full overflow-hidden bg-stone-950 text-white min-h-[640px] sm:min-h-[720px] lg:h-[88vh] lg:min-h-[700px] lg:max-h-[880px] flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ======================================================== */}
      {/* 1. FULL-BLEED BACKGROUND IMAGE (Spans entire screen width & height) */}
      {/* ======================================================== */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          key={activeProduct.id}
          src={activeProduct.image}
          alt={activeProduct.name}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center scale-102 transition-all duration-1000 ease-out animate-fadeIn"
        />

        {/* Cinematic Multi-Stop Gradients for razor-sharp Arabic text readability */}
        {/* Right-to-Left Gradient on Desktop (deep dark on the right where Arabic text lives, transparent on left for food photo) */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-l from-stone-950/95 via-stone-950/80 via-60% to-transparent pointer-events-none" />

        {/* Vertical Overlay on Mobile/Tablet so text is always high-contrast & legible */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-stone-950 via-stone-950/85 to-stone-950/50 pointer-events-none" />

        {/* Top subtle vignette */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-stone-950/90 to-transparent pointer-events-none" />

        {/* Bottom deep gradient for bottom pills & progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent pointer-events-none" />

        {/* Warm ember accent glow */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 2. TOP STRIP: Badges, Perks & Slide Counter */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full pt-4 sm:pt-6 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-950/85 border border-red-700/60 text-red-200 text-xs sm:text-sm font-extrabold shadow-lg backdrop-blur-md">
              {renderBadgeIcon(activeSlide.badgeIcon)}
              <span>{activeSlide.badge}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{activeSlide.floatingFreshness}</span>
            </span>
          </div>

          {/* Slide Index Counter & Bonus Perk */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-amber-950/80 px-3.5 py-1.5 rounded-full border border-amber-600/50 backdrop-blur-md shadow-lg">
              <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{activeSlide.bonusPerk}</span>
            </span>

            <div className="flex items-center gap-1 bg-stone-900/90 border border-stone-700/80 px-3 py-1.5 rounded-full text-xs font-black text-stone-200 backdrop-blur-md shadow-lg">
              <span className="text-amber-400">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="text-stone-500">/</span>
              <span>{String(HERO_SLIDES.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. CENTER HERO CONTENT: Headline, Specs, Price & CTAs */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 my-auto py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl lg:max-w-3xl flex flex-col justify-center space-y-4 sm:space-y-5 text-right">
            {/* Tagline */}
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 font-extrabold text-xs sm:text-base tracking-wide mb-1 drop-shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{activeSlide.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
                {activeSlide.title}
                <span className="block text-lg sm:text-2xl lg:text-3xl mt-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                  {activeSlide.subtitle}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-stone-200 text-xs sm:text-sm lg:text-base leading-relaxed drop-shadow-xs max-w-2xl">
              {activeSlide.description}
            </p>

            {/* Quick Specs Cards in Luxury Frosted Glass */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-xl pt-1">
              {activeSlide.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:p-3.5 rounded-2xl bg-black/60 border border-white/15 flex flex-col gap-0.5 sm:gap-1 text-center sm:text-right backdrop-blur-md shadow-lg"
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

            {/* Pricing & Call to Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
              {/* Price Area */}
              <div className="flex items-center gap-3 bg-black/50 border border-white/15 px-4 py-2 rounded-2xl backdrop-blur-md w-fit shadow-lg">
                <div className="flex flex-col">
                  <span className="text-xs text-stone-400 font-bold line-through">
                    {activeProduct.originalPrice} ج
                  </span>
                  <span className="text-2xl sm:text-4xl font-black text-amber-400">
                    {activeProduct.price}{' '}
                    <span className="text-sm sm:text-base text-stone-200 font-bold">جنيه</span>
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-red-600/90 border border-red-500/50 text-white text-xs font-black shadow-xs">
                  {activeSlide.savingsText}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 sm:flex-none px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-red-600/40 transition-all cursor-pointer ${
                    addedItemMap[activeProduct.id]
                      ? 'bg-emerald-600 text-white scale-102'
                      : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white hover:scale-105 active:scale-95'
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

                <button
                  onClick={() => setSelectedCookingProduct(activeProduct)}
                  className="px-4 py-3 sm:py-3.5 rounded-2xl bg-black/60 hover:bg-black/80 text-stone-200 hover:text-white text-xs sm:text-sm font-bold transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md shadow-lg active:scale-95"
                >
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span>طريقة التسوية</span>
                </button>

                <a
                  href="#menu-catalog"
                  className="hidden md:flex items-center gap-1.5 px-4 py-3 sm:py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all border border-white/15 backdrop-blur-md"
                >
                  <span>تصفح القائمة كاملة</span>
                  <ArrowLeft className="w-4 h-4 text-amber-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. EDGE NAVIGATION ARROWS (Floating at Left & Right Screen Edges) */}
      {/* ======================================================== */}
      <button
        onClick={goToPrevSlide}
        aria-label="الصنف السابق"
        className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 lg:right-8 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 cursor-pointer z-20"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        onClick={goToNextSlide}
        aria-label="الصنف التالي"
        className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 lg:left-8 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 cursor-pointer z-20"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* ======================================================== */}
      {/* 5. BOTTOM BAR: Full-width Progress Bar & Product Selector Dock */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full pb-3 sm:pb-5 px-3 sm:px-6">
        {/* Full-width Progress Countdown Line */}
        <div className="max-w-7xl mx-auto w-full h-1 bg-white/15 rounded-full overflow-hidden mb-3">
          <div
            key={currentSlide}
            className={`h-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 rounded-full ${
              isPaused ? 'w-full opacity-60' : 'animate-heroProgress'
            }`}
          />
        </div>

        {/* Product Selector Pills Dock */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none max-w-7xl mx-auto">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer backdrop-blur-md shadow-lg ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-red-600/40 scale-105 border border-red-400/60'
                    : 'bg-black/60 hover:bg-black/80 text-stone-300 hover:text-white border border-white/15'
                }`}
              >
                <span>{slide.pillIcon}</span>
                <span>{slide.pillLabel}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping inline-block" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
