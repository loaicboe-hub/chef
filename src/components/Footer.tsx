'use client';

import React from 'react';
import { Flame, Phone, MessageSquare, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { STORE_PHONE, STORE_WHATSAPP } from '../data/products';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-red-800 via-red-900 to-[#721515] text-white border-t-2 border-red-600/40 text-right pt-14 pb-24 md:pb-12 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white text-red-700 flex items-center justify-center shadow-lg">
                <Flame className="w-7 h-7 fill-red-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white">شيف فرجاني</span>
                <span className="text-xs text-red-200 font-bold">سلطان البط البلدي والمشاوي</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
              العلامة المصرية الأولى المتخصصة في البط البلدي المتبل الفاخر، ومتبلات اللحوم والمشاوي
              البلدية الجاهزة للتسوية الفورية على الفرن، الشواية، أو الإيرفراير.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs text-white font-bold backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>لحوم ودواجن بلدية 100% طازجة يومياً 🌿</span>
            </div>
          </div>

          {/* Quick Contact & Order Lines */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white pb-1 border-b border-red-700/60 inline-block">الطلب والتواصل المباشر</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href={`https://wa.me/${STORE_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-red-100 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/25 border border-emerald-400/30 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span>واتساب الطلبات: 01019998822</span>
              </a>
              <a
                href={`tel:${STORE_PHONE}`}
                className="flex items-center gap-2.5 text-red-100 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-amber-200 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <span>الخط الساخن: 01019998822</span>
              </a>
              <div className="flex items-center gap-2.5 text-red-200">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-200">
                  <Clock className="w-4 h-4" />
                </div>
                <span>مواعيد العمل: يومياً من 9 ص حتى 11 م</span>
              </div>
            </div>
          </div>

          {/* Delivery Zones */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white pb-1 border-b border-red-700/60 inline-block">مناطق التوصيل المبرد</h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-red-100/90 leading-relaxed">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white mb-1">القاهرة والجيزة بسيارات مجهزة:</p>
                <p className="text-[11px] leading-relaxed text-red-100/80">
                  التجمع الأول والخامس، الرحاب، مدينتي، الشروق، مصر الجديدة، مدينة نصر، المعادي، الزمالك،
                  المهندسين، الدقي، الشيخ زايد، ومدينة 6 أكتوبر.
                </p>
              </div>
            </div>
          </div>

          {/* Quality & Food Safety */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white pb-1 border-b border-red-700/60 inline-block">معايير السلامة والنظافة</h4>
            <p className="text-xs text-red-100/90 leading-relaxed">
              نلتزم بأعلى معايير سلامة الغذاء: تقطيع معقم، تتبيل بمكونات طبيعية 100% بدون أي
              نكهات صناعية، وتغليف سحب هواء فاكيوم صحي معتمد.
            </p>
            <div className="p-3 rounded-2xl bg-black/20 border border-white/15 text-[11px] text-amber-200 font-bold">
              🎁 كيس حراري خاص هدية مرفق مجاناً مع كل دكر بط لسهولة التسوية.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-red-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-red-200">
          <p>© 2026 شيف فرجاني (Chef Fergany). جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1.5 font-bold">
            صنع بكل <Heart className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" /> لعشاق الأكل المصري الأصيل
          </p>
        </div>
      </div>
    </footer>
  );
}
