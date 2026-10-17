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
  RotateCw,
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
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  // Touch & Drag swipe tracking
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

  // Continuous Automatic 3D Rotation: Automatically turns every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 3200);

    return () => clearInterval(timer);
  }, [currentSlide, goToNextSlide]);

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
      // In RTL: swipe left (> 40) -> next, swipe right (< -40) -> prev
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

  /**
   * 3D Position Matrix for 5 cards:
   * Returns exact CSS 3D transform, perspective depth, rotation angle and scale
   */
  const get3DCardStyle = (index: number) => {
    const total = HERO_SLIDES.length;
    let diff = (index - currentSlide + total) % total;
    if (diff > total / 2) diff -= total; // range: -2, -1, 0, 1, 2

    // Center Front Card (Active Focus)
    if (diff === 0) {
      return {
        transform: 'translate3d(0, 0, 85px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 30,
        filter: 'blur(0px) brightness(1.05)',
        cursor: 'default',
        pointerEvents: 'auto' as const,
      };
    }

    // Left 3D Wing (Next item in 3D orbit)
    if (diff === 1) {
      return {
        transform: 'translate3d(-54%, 0, -90px) rotateY(-28deg) scale(0.85)',
        opacity: 0.72,
        zIndex: 20,
        filter: 'blur(1px) brightness(0.78)',
        cursor: 'pointer',
        pointerEvents: 'auto' as const,
      };
    }

    // Right 3D Wing (Previous item in 3D orbit)
    if (diff === -1) {
      return {
        transform: 'translate3d(54%, 0, -90px) rotateY(28deg) scale(0.85)',
        opacity: 0.72,
        zIndex: 20,
        filter: 'blur(1px) brightness(0.78)',
        cursor: 'pointer',
        pointerEvents: 'auto' as const,
      };
    }

    // Background Orbit (Deep in 3D stage)
    const isLeft = diff > 0;
    return {
      transform: `translate3d(${isLeft ? -96 : 96}%, 0, -220px) rotateY(${isLeft ? -45 : 45}deg) scale(0.68)`,
      opacity: 0.2,
      zIndex: 10,
      filter: 'blur(3px) brightness(0.5)',
      cursor: 'pointer',
      pointerEvents: 'none' as const,
    };
  };

  return (
    <section
      id="hero-duck"
      className="relative w-full overflow-hidden bg-stone-950 text-white min-h-[580px] sm:min-h-[700px] lg:h-[92vh] lg:min-h-[760px] lg:max-h-[920px] flex flex-col justify-between select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ======================================================== */}
      {/* AMBIENT SCREEN-FILLING BACKGROUND (Dynamic per active dish) */}
      {/* ======================================================== */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <Image
          key={`ambient-${activeProduct.id}`}
          src={activeProduct.image}
          alt={activeProduct.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-125 blur-3xl opacity-25 transition-all duration-1000 ease-out"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-radial from-stone-900/60 via-stone-950/85 to-stone-950" />
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-stone-950/90 to-transparent" />

        {/* Floating Ember Light Sparks */}
        <div className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 1. TOP HEADER: Badges, 3D Auto-Spin Indicator & Counter */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full pt-3 sm:pt-6 px-3 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-red-950/85 border border-red-700/60 text-red-200 text-[10px] sm:text-sm font-extrabold shadow-lg backdrop-blur-md truncate">
              {renderBadgeIcon(activeSlide.badgeIcon)}
              <span className="truncate">{activeSlide.badge}</span>
            </span>

            <span className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{activeSlide.floatingFreshness}</span>
            </span>
          </div>

          {/* 3D Auto-Spinning Status & Slide Counter */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-amber-950/80 px-3.5 py-1.5 rounded-full border border-amber-600/50 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <RotateCw className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
              <span>دوران 3D تلقائي مستمر</span>
            </div>

            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-amber-200 bg-amber-950/80 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-amber-600/50 backdrop-blur-md shadow-lg">
              <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">{activeSlide.bonusPerk}</span>
            </span>

            <div className="flex items-center gap-1 bg-stone-900/90 border border-stone-700/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black text-stone-200 backdrop-blur-md shadow-lg">
              <span className="text-amber-400">{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="text-stone-500">/</span>
              <span>{String(HERO_SLIDES.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. THE GRAND 3D REVOLVING STAGE (Rotating in 3D Space) */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full my-auto py-1 sm:py-3 flex flex-col items-center justify-center">
        {/* 3D Perspective Arena */}
        <div className="relative w-full max-w-6xl h-[190px] sm:h-[280px] lg:h-[390px] flex items-center justify-center perspective-1200 sm:perspective-1600 preserve-3d">
          {/* Glowing 3D Showcase Turntable underneath */}
          <div className="absolute -bottom-4 w-[280px] sm:w-[500px] lg:w-[720px] h-[55px] sm:h-[95px] rounded-[100%] bg-gradient-to-t from-red-600/35 via-amber-500/20 to-transparent blur-lg transform -rotate-X-[70deg] pointer-events-none" />

          {/* Render all 5 cards concurrently in 3D Orbit */}
          {HERO_SLIDES.map((slide, index) => {
            const product = PRODUCTS.find((p) => p.id === slide.productId) || PRODUCTS[0];
            const isCenter = index === currentSlide;
            const style3D = get3DCardStyle(index);

            return (
              <div
                key={slide.id}
                onClick={() => !isCenter && setCurrentSlide(index)}
                style={style3D}
                className={`absolute w-[72vw] max-w-[270px] sm:max-w-[420px] lg:max-w-[580px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl ${
                  isCenter
                    ? 'border-amber-400/80 shadow-[0_20px_50px_-10px_rgba(220,38,38,0.45)] animate-float3d ring-2 ring-red-500/30'
                    : 'border-stone-700/70 hover:border-amber-400/50 shadow-black/80'
                }`}
              >
                {/* Product Image */}
                <div className="relative w-full h-full overflow-hidden bg-stone-950">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={isCenter}
                    sizes="(max-width: 768px) 75vw, 600px"
                    className={`object-cover object-center transition-transform duration-700 ${
                      isCenter ? 'scale-105' : 'scale-100'
                    }`}
                  />

                  {/* Gradient Lighting overlay on card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Card Floating Top Badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-xs font-black shadow-md">
                      {slide.pillIcon} {slide.badge}
                    </span>
                  </div>

                  {/* Card Bottom Info Overlay */}
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-10 flex items-end justify-between gap-1.5">
                    <div className="text-right min-w-0">
                      <p className="text-[9px] sm:text-xs text-amber-300 font-bold drop-shadow-sm truncate">
                        {slide.tagline}
                      </p>
                      <h3 className="text-xs sm:text-lg lg:text-xl font-black text-white drop-shadow-md truncate">
                        {slide.title}
                      </h3>
                    </div>

                    <div className="bg-black/80 backdrop-blur-md border border-amber-400/40 rounded-lg sm:rounded-xl px-2 py-0.5 sm:px-2.5 sm:py-1 text-center shrink-0">
                      <span className="text-xs sm:text-base font-black text-amber-400">{product.price} ج</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 3. ACTIVE DISH SPECS & DIRECT CTAs (Below 3D Stage) */}
        {/* ======================================================== */}
        <div className="relative z-20 w-full max-w-4xl px-3 sm:px-4 mt-2 sm:mt-4 text-center flex flex-col items-center">
          {/* Active Product Headline & Subtitle */}
          <div className="mb-2 sm:mb-3">
            <h2 className="text-base sm:text-2xl lg:text-3xl font-black text-white drop-shadow-md">
              {activeSlide.title}{' '}
              <span className="block sm:inline text-xs sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 mt-0.5 sm:mt-0">
                {activeSlide.subtitle}
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5 max-w-xs sm:max-w-xl mx-auto line-clamp-1 sm:line-clamp-2">
              {activeSlide.description}
            </p>
          </div>

          {/* Quick Specs Cards in Luxury Glassmorphism */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 w-full max-w-xs sm:max-w-xl mb-2 sm:mb-3">
            {activeSlide.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-1.5 sm:p-2 rounded-xl bg-black/60 border border-white/15 flex flex-col gap-0.5 text-center backdrop-blur-md shadow-md"
              >
                <span className="text-[9px] sm:text-xs text-stone-400 font-bold flex items-center justify-center gap-1">
                  {renderStatIcon(stat.icon)}
                  <span>{stat.label}</span>
                </span>
                <span className="text-[10px] sm:text-xs font-black text-white truncate">
                  {stat.value}
                </span>
                <span className="text-[9px] sm:text-[10px] text-amber-300 font-bold truncate">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing & CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full max-w-xs sm:max-w-xl">
            {/* Price tag */}
            <div className="flex items-center justify-between sm:justify-start gap-2 bg-black/60 border border-white/15 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-md w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs text-stone-400 font-bold line-through">
                  {activeProduct.originalPrice} ج
                </span>
                <span className="text-base sm:text-xl font-black text-amber-400">
                  {activeProduct.price} <span className="text-[10px] sm:text-xs text-stone-200">جنيه</span>
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-red-600/90 text-white text-[10px] sm:text-xs font-black">
                {activeSlide.savingsText}
              </span>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/40 transition-all cursor-pointer ${
                  addedItemMap[activeProduct.id]
                    ? 'bg-emerald-600 text-white scale-102'
                    : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white hover:scale-102 active:scale-95'
                }`}
              >
                {addedItemMap[activeProduct.id] ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>تمت الإضافة بنجاح ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>أضف للسلة الآن</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedCookingProduct(activeProduct)}
                className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-black/60 hover:bg-black/80 text-stone-200 hover:text-white text-xs font-bold transition-all border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md shadow-md active:scale-95"
              >
                <ChefHat className="w-3.5 h-3.5 text-amber-400" />
                <span>طريقة التسوية</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. EDGE 3D NAVIGATION ARROWS */}
      {/* ======================================================== */}
      <button
        onClick={goToPrevSlide}
        aria-label="الصنف السابق في المسرح الـ 3D"
        className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-5 lg:right-8 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-90 cursor-pointer z-30"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={goToNextSlide}
        aria-label="الصنف التالي في المسرح الـ 3D"
        className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-5 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-90 cursor-pointer z-30"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* ======================================================== */}
      {/* 5. BOTTOM PROGRESS & 3D PRODUCT SELECTOR PILLS */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full pb-2 sm:pb-4 px-2 sm:px-6">
        {/* Full-width 3D Rotation Progress Line */}
        <div className="max-w-7xl mx-auto w-full h-1 bg-white/15 rounded-full overflow-hidden mb-2 sm:mb-3">
          <div
            key={currentSlide}
            className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 rounded-full animate-heroProgress"
            style={{ animationDuration: '3.2s' }}
          />
        </div>

        {/* 3D Product Selector Dock */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none max-w-7xl mx-auto">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer backdrop-blur-md shadow-md ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-red-600/40 scale-102 border border-red-400/60'
                    : 'bg-black/60 hover:bg-black/80 text-stone-300 hover:text-white border border-white/15'
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
    </section>
  );
}
