'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Flame, ThermometerSnowflake, ChefHat } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS } from '../data/products';

export default function TrustFeatures() {
  const { setSelectedCookingProduct } = useCartStore();

  const features = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-emerald-600" />,
      bg: 'bg-emerald-50',
      title: 'لحوم ودواجن بلدي طازجة 100%',
      description: 'ذبح يومي تحت إشراف بيطري كامل. خالية تماماً من اللحوم المجمدة أو أي إضافات فول صويا أو مواد حافظة.',
    },
    {
      icon: <Sparkles className="w-7 h-7 text-orange-600" />,
      bg: 'bg-orange-50',
      title: 'تغليف فاكيوم سحب هواء معقم',
      description: 'تغليف طبي مضغوط مفرغ من الأكسجين يحمي اللحوم من أي بكتيريا ويحبس التتبيلة والعصارات في ألياف اللحم.',
    },
    {
      icon: <Flame className="w-7 h-7 text-amber-600" />,
      bg: 'bg-amber-50',
      title: 'كيس حراري هدية للتسوية الفورية',
      description: 'مع كل دكر بط كيس حراري خاص للفرن، ضع البطة في الكيس والفرن مباشرة بدون غسيل أو مواعين إضافية.',
      action: 'طريقة تسوية البط والفرن',
    },
    {
      icon: <ThermometerSnowflake className="w-7 h-7 text-blue-600" />,
      bg: 'bg-blue-50',
      title: 'شحن مبرد معقم لباب بيتك',
      description: 'أسطول سيارات مجهزة بثلاجات تبريد تحافظ على سلامة وطزاجة المنتجات في كافة أنحاء القاهرة والجيزة.',
    },
  ];

  return (
    <section id="cooking-guide" className="py-14 bg-[#FBF9F5] border-t border-b border-[#E7DFD5] relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-orange-700 text-xs sm:text-sm font-extrabold">ضمان الشيف فرجاني • دليل الطهي والتسوية</span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            سر الجودة والطعم الأصيل في كل قطعة
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#E7DFD5] hover:border-orange-300 transition-all text-right space-y-3 warm-card-shadow hover:warm-card-hover flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center`}>
                  {feat.icon}
                </div>
                <h3 className="text-base font-black text-stone-900">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {feat.action && (
                <button
                  onClick={() => setSelectedCookingProduct(PRODUCTS[0])}
                  className="pt-2 text-xs font-black text-red-600 hover:text-red-700 flex items-center gap-1.5 cursor-pointer group"
                >
                  <ChefHat className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                  <span>{feat.action} ←</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
