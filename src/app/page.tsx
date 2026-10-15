'use client';

import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import HeroDuckBanner from '../components/HeroDuckBanner';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';
import GatheringCalculator from '../components/GatheringCalculator';
import TrustFeatures from '../components/TrustFeatures';
import ReviewsSection from '../components/ReviewsSection';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CookingModal from '../components/CookingModal';
import FloatingMobileBar from '../components/FloatingMobileBar';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Flame, Beef, Drumstick, Package } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.marinade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const duckProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'duck'),
    []
  );
  const beefProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'beef'),
    []
  );
  const poultryProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'poultry'),
    []
  );
  const bundleProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'bundles'),
    []
  );

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900">
      {/* 1. Header with announcement ticker & cart button */}
      <Header />

      {/* 2. Hero Section: The Marinated Duck Spotlight (سلطان السفرة) */}
      <HeroDuckBanner />

      {/* 3. Freshness & Quality Guarantees */}
      <TrustFeatures />

      {/* 4. Interactive Gathering Calculator (حاسبة العزومات الذكية) */}
      <GatheringCalculator />

      {/* 5. Sticky Filter & Search Tabs */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 6. Product Catalog Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {selectedCategory !== 'all' || searchQuery.trim() !== '' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <span>
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'نتائج البحث'}
                </span>
                <span className="text-xs text-red-800 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200 font-bold">
                  {filteredProducts.length} أصناف
                </span>
              </h2>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-[#E7DFD5] p-8 shadow-xs">
                <p className="text-base text-stone-800 font-bold">
                  لم نجد أي صنف يطابق بحثك «{searchQuery}»
                </p>
                <p className="text-xs text-stone-500">
                  جرب البحث بكلمات أخرى مثل «بط»، «كفتة»، «بانيه»، أو اضغط مسح للعودة لكامل القائمة.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors cursor-pointer shadow-xs"
                >
                  عرض جميع الأصناف
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-16">
            {/* Category 1: سلطان السفرة (البط البلدي) */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E7DFD5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
                    <Flame className="w-5 h-5 fill-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                      سلطان السفرة (البط البلدي المتبل)
                    </h2>
                    <p className="text-xs text-red-800/90 font-medium">
                      متبل بجليز البرتقال وعسل النحل مع كيس حراري خاص هدية لكل عبوة
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-stone-500">
                  {duckProducts.length} أصناف مميزة
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {duckProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Category 2: متبلات اللحوم والمشاوي */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E7DFD5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
                    <Beef className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                      متبلات اللحوم والمشاوي (Beef & BBQ)
                    </h2>
                    <p className="text-xs text-stone-500">
                      كفتة حاتي مصبعة، طرب بلدي، بتلو، سجق خلطة سرية، وكبدة إسكندراني
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-stone-500">
                  {beefProducts.length} أصناف كبابجي
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {beefProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Category 3: ركن الدواجن والبانيه */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E7DFD5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Drumstick className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                      ركن الدواجن والبانيه (Daily Poultry)
                    </h2>
                    <p className="text-xs text-stone-500">
                      بانيه متبل ليمون وزبادي، بانيه كرسبي للإيرفراير، شيش طاووق، وفراخ فراشة مشوية
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-stone-500">
                  {poultryProducts.length} أصناف يومية
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {poultryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Category 4: بوكسات التوفير والعزومات */}
            <div id="bundles" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E7DFD5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                      بوكسات التوفير والعزومات (Curated Bundles)
                    </h2>
                    <p className="text-xs text-stone-500">
                      تشكيلات متكاملة بأفضل توفير لعزومات الأهل والأصدقاء وتسهيل غداء الأسبوع
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                  توفير يصل لـ 240 ج
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bundleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 7. Customer Reviews & Social Proof */}
      <ReviewsSection />

      {/* 8. Footer */}
      <Footer />

      {/* 9. Global Cart Drawer with WhatsApp Order Generator */}
      <CartDrawer />

      {/* 10. Cooking Instructions Modal */}
      <CookingModal />

      {/* 11. Mobile Sticky Bottom Action Bar */}
      <FloatingMobileBar />
    </main>
  );
}
