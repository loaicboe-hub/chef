'use client';

import React from 'react';
import { CATEGORIES } from '../data/products';
import { Flame, Beef, Drumstick, Package, LayoutGrid, Search } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: CategoryNavProps) {
  const getCategoryIcon = (id: string, isActive: boolean) => {
    switch (id) {
      case 'all':
        return <LayoutGrid className="w-4 h-4" />;
      case 'duck':
        return <Flame className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-600'}`} />;
      case 'beef':
        return <Beef className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-600'}`} />;
      case 'poultry':
        return <Drumstick className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-600'}`} />;
      case 'bundles':
        return <Package className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-700'}`} />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div id="menu-catalog" className="sticky top-[108px] z-30 bg-[#FAF7F2]/95 backdrop-blur-md py-4 border-b border-[#E7DFD5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Scrollable Category Filter Pills with Appetite Red Active State */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white shadow-md shadow-red-600/30 scale-105'
                      : 'bg-white text-stone-700 hover:bg-[#F5EFE6] hover:text-red-700 hover:border-red-300 border border-[#E7DFD5]'
                  }`}
                >
                  {getCategoryIcon(cat.id, isActive)}
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box with Red Focus Border */}
          <div className="relative w-full md:w-72">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن صنف أو تتبيلة (كفتة، بط، بانيه...)"
              className="w-full pr-10 pl-4 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#E0D7CC] text-stone-900 placeholder-stone-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-bold"
              >
                مسح
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
