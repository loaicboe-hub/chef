'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { X, Flame, ChefHat, Clock, Sparkles, AlertCircle, Wind } from 'lucide-react';

type CookingMethod = 'oven' | 'airfryer' | 'grill' | 'skillet';

interface MethodData {
  temp?: string;
  heat?: string;
  duration: string;
  steps: string[];
  thermalBagTip?: string;
}

export default function CookingModal() {
  const { selectedCookingProduct, setSelectedCookingProduct } = useCartStore();
  const [activeTab, setActiveTab] = useState<CookingMethod>('oven');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCookingProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedCookingProduct]);

  if (!selectedCookingProduct) return null;

  const { cookingInstructions, name, chefTip, cookingTime } = selectedCookingProduct;

  const availableTabs: { id: CookingMethod; label: string; icon: React.ComponentType<{ className?: string }> }[] = [];
  if (cookingInstructions.oven) {
    availableTabs.push({ id: 'oven', label: 'الفرن والكيس الحراري', icon: Flame });
  }
  if (cookingInstructions.airfryer) {
    availableTabs.push({ id: 'airfryer', label: 'القلاية الهوائية (Air Fryer)', icon: Wind });
  }
  if (cookingInstructions.grill) {
    availableTabs.push({ id: 'grill', label: 'الفحم والشواية', icon: Flame });
  }
  if (cookingInstructions.skillet) {
    availableTabs.push({ id: 'skillet', label: 'الطاسة والجريل السريع', icon: ChefHat });
  }

  const currentTab: CookingMethod = availableTabs.some((t) => t.id === activeTab)
    ? activeTab
    : availableTabs[0]?.id || 'oven';

  const currentMethodData: MethodData | undefined = cookingInstructions[currentTab];

  const methodHeatOrTemp = currentMethodData?.temp || currentMethodData?.heat || 'متوسطة';
  const thermalBagTip = currentTab === 'oven' && currentMethodData ? currentMethodData.thermalBagTip : undefined;

  return (
    <div
      onClick={() => setSelectedCookingProduct(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white border border-red-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] cursor-default"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E7DFD5] flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center text-red-700">
              <ChefHat className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs text-red-700 font-bold">طريقة التسوية المثالية للشيف فرجاني</span>
              <h3 className="text-lg sm:text-xl font-black text-stone-900">{name}</h3>
            </div>
          </div>

          <button
            onClick={() => setSelectedCookingProduct(null)}
            className="w-9 h-9 rounded-full bg-stone-200/60 hover:bg-stone-300 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Method Selector Tabs */}
        {availableTabs.length > 1 && (
          <div className="px-5 pt-3 bg-[#FAF7F2] border-b border-[#E7DFD5] flex items-center gap-2 overflow-x-auto">
            {availableTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'border-red-600 text-red-700 bg-white font-black'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-right">
          {/* Quick Stats bar */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-center gap-3">
              <Clock className="w-5 h-5 text-red-600 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-stone-500 font-bold">مدة التسوية:</span>
                <span className="text-sm font-black text-stone-900">{cookingTime}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-stone-500 font-bold">درجة الحرارة الموصى بها:</span>
                <span className="text-sm font-black text-red-700">
                  {methodHeatOrTemp}
                </span>
              </div>
            </div>
          </div>

          {/* Thermal Bag Special Notice */}
          {thermalBagTip && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-900 text-xs sm:text-sm leading-relaxed">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-red-900 font-black mb-0.5">ملاحظة الكيس الحراري:</strong>
                {thermalBagTip}
              </div>
            </div>
          )}

          {/* Step by step guide */}
          <div className="space-y-3">
            <span className="text-sm font-black text-stone-900 block">خطوات التسوية الاحترافية خطوة بخطوة:</span>
            <div className="space-y-2.5">
              {currentMethodData?.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-start gap-3.5 hover:bg-[#F5EFE6] transition-colors"
                >
                  <span className="w-6 h-6 rounded-xl bg-red-100 text-red-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chef Tip Card */}
          {chefTip && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-stone-800 text-xs sm:text-sm">
              <ChefHat className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-900 font-black mb-1">سر الشيف فرجاني:</strong>
                <p className="leading-relaxed text-stone-700">{chefTip}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E7DFD5] flex items-center justify-end">
          <button
            onClick={() => setSelectedCookingProduct(null)}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm transition-all cursor-pointer shadow-md shadow-red-600/25"
          >
            فهمت، جاهز للتسوية
          </button>
        </div>
      </div>
    </div>
  );
}
