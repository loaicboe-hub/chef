'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductVariant } from '../types';
import { useCartStore } from '../store/useCartStore';
import { ShoppingBag, Clock, Users, ChefHat, Check, Plus, Minus, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, setSelectedCookingProduct, items, updateQuantity } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants ? product.variants[0] : undefined
  );
  const [justAdded, setJustAdded] = useState(false);

  // Find quantity in cart for this product & variant
  const cartItem = items.find(
    (item) =>
      item.product.id === product.id &&
      (!selectedVariant || item.selectedVariant?.id === selectedVariant.id)
  );
  const currentQuantity = cartItem?.quantity || 0;

  const currentPrice = product.price + (selectedVariant?.priceDelta || 0);

  const handleAddToCart = () => {
    addItem(product, 1, selectedVariant);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleIncrement = () => {
    if (currentQuantity === 0) {
      handleAddToCart();
    } else {
      updateQuantity(product.id, currentQuantity + 1, selectedVariant?.id);
    }
  };

  const handleDecrement = () => {
    if (currentQuantity > 0) {
      updateQuantity(product.id, currentQuantity - 1, selectedVariant?.id);
    }
  };

  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case 'gold':
        return 'bg-amber-50 text-amber-900 border-amber-200/80';
      case 'red':
        return 'bg-red-50 text-red-900 border-red-200/80';
      case 'green':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200/80';
      case 'blue':
        return 'bg-blue-50 text-blue-900 border-blue-200/80';
      default:
        return 'bg-red-50 text-red-900 border-red-200/80';
    }
  };

  return (
    <div className="group rounded-3xl bg-white border border-[#E7DFD5] hover:border-red-400 transition-all duration-300 flex flex-col justify-between overflow-hidden warm-card-shadow hover:warm-card-hover">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />

          {/* Top Badge */}
          {product.badge && (
            <div className="absolute top-3 right-3 z-10">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black backdrop-blur-md border shadow-xs ${getBadgeStyle(
                  product.badgeColor
                )}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {product.badge}
              </span>
            </div>
          )}

          {/* Ready-to-cook Tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-stone-800 backdrop-blur-md border border-stone-200 shadow-xs">
              🥩 متبل قبل التسوية
            </span>
          </div>

          {/* Quick Cooking Preview Overlay Button */}
          <button
            onClick={() => setSelectedCookingProduct(product)}
            className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-red-600 hover:text-white text-stone-800 text-[11px] font-bold backdrop-blur-md transition-all flex items-center gap-1.5 border border-stone-200 cursor-pointer shadow-xs"
            title="طريقة التسوية المثالية"
          >
            <ChefHat className="w-3.5 h-3.5 text-red-600 group-hover:text-white" />
            <span>طريقة التسوية</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3 sm:space-y-3.5">
          {/* Servings and Weight Badges */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-stone-600">
            <span className="flex items-center gap-1 bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#EAE3D9]">
              <Users className="w-3 h-3 text-red-600" />
              {product.servings}
            </span>
            <span className="flex items-center gap-1 bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#EAE3D9]">
              <Clock className="w-3 h-3 text-red-600" />
              {product.cookingTime}
            </span>
            <span className="text-red-700 mr-auto font-black">{product.weight}</span>
          </div>

          {/* Name & Subtitle */}
          <div>
            <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug group-hover:text-red-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Marinade Highlight with Appetite Red Touch */}
          <div className="p-2.5 rounded-xl bg-red-50/40 border border-red-100 text-[11px] text-stone-700 leading-relaxed">
            <strong className="text-red-700 font-bold ml-1">التتبيلة:</strong>
            <span className="line-clamp-2">{product.marinade}</span>
          </div>

          {/* Variant Selector (e.g. Rice vs Vine Leaves) with Red border on select */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-stone-700">اختر نوع الحشوة:</span>
              <div className="grid grid-cols-1 gap-1.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-right transition-all flex items-center justify-between cursor-pointer ${
                      selectedVariant?.id === v.id
                        ? 'bg-red-50 border border-red-500 text-red-950 shadow-2xs font-black'
                        : 'bg-[#FAF7F2] border border-[#E7DFD5] text-stone-600 hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <span>{v.label}</span>
                    {selectedVariant?.id === v.id && (
                      <Check className="w-3.5 h-3.5 text-red-600 stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Area: Price and Cart Action */}
      <div className="p-4 sm:p-5 pt-3 border-t border-[#F0EAE1] bg-[#FAF7F2] flex items-center justify-between gap-2.5 sm:gap-3">
        {/* Price display in Appetite Red */}
        <div className="flex flex-col">
          {product.originalPrice && (
            <span className="text-[10px] sm:text-[11px] text-stone-400 font-bold line-through">
              {product.originalPrice} ج
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-2xl font-black text-red-600">
              {currentPrice}
            </span>
            <span className="text-xs font-bold text-stone-700">جنيه</span>
          </div>
        </div>

        {/* Add to cart / Quantity controls with Appetite Red CTA */}
        {currentQuantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-sm transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white scale-102'
                : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/25 hover:scale-102 active:scale-95'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>{justAdded ? 'تمت الإضافة ✓' : 'أضف للسلة'}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-red-400 rounded-xl p-1 shadow-xs">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="تقليل الكمية"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-5 sm:w-6 text-center text-xs sm:text-sm font-black text-red-600">
              {currentQuantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center justify-center font-bold transition-all cursor-pointer shadow-xs"
              aria-label="زيادة الكمية"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
