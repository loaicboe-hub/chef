'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      name: 'م/ أحمد الصاوي',
      location: 'التجمع الخامس، القاهرة',
      rating: 5,
      product: 'دكر بط بلدي متبل روستو (بالكيس الحراري)',
      comment:
        'عزومة الجمعة اللي فاتت كانت تجربة استثنائية! دكر البط نزل في الكيس الحراري الفرن، واستوى في 90 دقيقة وطلع لونه دهبي يجنن ولحمه دايب دوب وعصارة التتبيلة ملهاش حل. شرفتوني قدام نسايبي!',
    },
    {
      name: 'د/ سارة عبد الحميد',
      location: 'الشيخ زايد، الجيزة',
      rating: 5,
      product: 'بوكس غداء الأسبوع (للأمهات)',
      comment:
        'أنا طبيبة وعندي 3 أطفال وماعنديش وقت أتبل وأغسل. بوكس الأسبوع أنقذني.. البانيه الكرسبي في الإيرفراير والكفتة والكبدة الإسكندراني كلها طعم بيتي نظيف بدون أي زفارة وتغليف الفاكيوم ممتاز جداً.',
    },
    {
      name: 'أ/ كريم فريد',
      location: 'مصر الجديدة، القاهرة',
      rating: 5,
      product: 'كفتة حاتي متبلة ومصبعة + طرب بلدي',
      comment:
        'أنا من عشاق مشاوي الحاتي وبقولك بصراحة: دي أفضل كفتة حاتي مصبعة جاهزة للشواية جربتها في القاهرة. نسبة اللية مضبوطة بالمللي ومابتفكش نهائي من السيخ، وطعم اللحم البلدي واضح ونظيف.',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-orange-700 text-xs sm:text-sm font-extrabold">آراء الأكيلة</span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            ماذا يقول عملاؤنا عن متبلات شيف فرجاني؟
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm">
            أكثر من 15,000 سفرة وعزومة مصرية ناجحة وثقة تتوارث أسبوعياً
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#E7DFD5] flex flex-col justify-between text-right space-y-4 warm-card-shadow relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-200" />
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  «{rev.comment}»
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EAE1] space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-sm font-black text-stone-900">{rev.name}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>{rev.location}</span>
                  <span className="text-orange-700 font-bold">{rev.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
