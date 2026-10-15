'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '../store/useCartStore';
import { STORE_WHATSAPP } from '../data/products';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageSquare,
  Calendar,
  User,
  Truck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getShippingFee,
    getTotalPrice,
    deliveryDetails,
    setDeliveryDetails,
  } = useCartStore();

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeStep, setActiveStep] = useState<'cart' | 'checkout'>('cart');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const totalPrice = getTotalPrice();
  const freeShippingThreshold = 900;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!deliveryDetails.fullName.trim()) {
      errors.fullName = 'يرجى إدخال اسم العميل';
    }
    if (!deliveryDetails.phone.trim() || deliveryDetails.phone.length < 10) {
      errors.phone = 'يرجى إدخال رقم هاتف صحيح';
    }
    if (!deliveryDetails.address.trim()) {
      errors.address = 'يرجى إدخال العنوان بالتفصيل';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map((item, idx) => {
        const variantText = item.selectedVariant ? ` (${item.selectedVariant.label})` : '';
        const lineTotal = (item.product.price + (item.selectedVariant?.priceDelta || 0)) * item.quantity;
        return `${idx + 1}. *${item.product.name}*${variantText}\n   - الكمية: ${item.quantity} عبوة (${item.product.weight})\n   - السعر: ${lineTotal} ج`;
      })
      .join('\n\n');

    const dateText = deliveryDetails.deliveryDate
      ? deliveryDetails.deliveryDate
      : 'في أقرب موعد متاح (طازج اليوم)';
    const timeText = deliveryDetails.deliveryTimeSlot;

    const message = `*طلب جديد من متجر شيف فرجاني 🥩🦆*
---------------------------------------
👤 *بيانات العميل:*
• الاسم: ${deliveryDetails.fullName || 'غير محدد'}
• رقم الهاتف: ${deliveryDetails.phone || 'غير محدد'}
• المنطقة/المدينة: ${deliveryDetails.city}
• العنوان بالتفصيل: ${deliveryDetails.address || 'غير محدد'}

🚚 *موعد التوصيل المفضل:*
• التاريخ: ${dateText}
• التوقيت: ${timeText}
${deliveryDetails.notes ? `• ملاحظات خاصة: ${deliveryDetails.notes}\n` : ''}
---------------------------------------
📦 *تفاصيل الأصناف المطلوبة:*
${itemsList}

---------------------------------------
💰 *إجمالي الفاتورة:*
• قيمة المنتجات: ${subtotal} ج
• خدمة التوصيل المبرد: ${shippingFee === 0 ? 'مجاني 🎁' : `${shippingFee} ج`}
• *المبلغ الإجمالي المستحق: ${totalPrice} ج*
• طريقة الدفع: عند الاستلام (COD)
---------------------------------------
جاهز لتأكيد الطلب وشكراً لكم! ✨`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppCheckout = () => {
    if (!validateForm()) {
      setActiveStep('checkout');
      return;
    }

    const encodedMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleCODCheckout = () => {
    if (!validateForm()) {
      setActiveStep('checkout');
      return;
    }

    setOrderSuccess(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
    });
  };

  return (
    <div
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-r border-[#E7DFD5] cursor-default"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-5 bg-[#FAF7F2] border-b border-[#E7DFD5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-right">
              <h2 className="text-base sm:text-lg font-black text-stone-900">سلة الطلبات</h2>
              <span className="text-xs text-stone-500">
                {items.length} {items.length === 1 ? 'صنف مختار' : 'أصناف مختارة'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && activeStep === 'cart' && (
              <button
                onClick={clearCart}
                className="text-xs text-red-600 hover:text-red-700 font-bold px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                title="تفريغ السلة"
              >
                تفريغ
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full bg-stone-200/60 hover:bg-stone-300 text-stone-700 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Shipping Meter */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-[#FFF9F2] border-b border-red-100 text-xs text-right">
            <div className="flex items-center justify-between mb-1.5 font-bold">
              <span className="text-stone-700 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-red-600" />
                {shippingFee === 0 ? (
                  <span className="text-emerald-700 font-black">مبروك! حصلت على توصيل مجاني 🎉</span>
                ) : (
                  <span>
                    أضف بـ <strong className="text-red-600 font-black">{remainingForFreeShipping} ج</strong> للحصول على توصيل مجاني!
                  </span>
                )}
              </span>
              <span className="text-stone-500 font-bold">الحد 900 ج</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-emerald-600 transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Success Confirmation Modal View */}
        {orderSuccess ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border-2 border-emerald-300 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-stone-900">تم تأكيد طلبك بنجاح!</h3>
            <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
              شكراً لاختيارك <strong className="text-red-600">شيف فرجاني</strong>. سنقوم بتجهيز لحومك الطازجة وتغليفها فاكيوم فوراً وشحنها مبردة إلى عنوانك:
            </p>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] text-right w-full text-xs space-y-1.5">
              <p className="text-stone-700"><strong>الاسم:</strong> {deliveryDetails.fullName}</p>
              <p className="text-stone-700"><strong>العنوان:</strong> {deliveryDetails.address} - {deliveryDetails.city}</p>
              <p className="text-stone-700"><strong>الموعد المفضل:</strong> {deliveryDetails.deliveryDate || 'اليوم'} ({deliveryDetails.deliveryTimeSlot})</p>
              <p className="text-red-600 font-black pt-1"><strong>الإجمالي للدفع عند الاستلام:</strong> {totalPrice} ج</p>
            </div>
            <button
              onClick={() => {
                setOrderSuccess(false);
                clearCart();
                setIsCartOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-black text-sm hover:bg-red-500 transition-all cursor-pointer shadow-md shadow-red-600/20"
            >
              العودة للتسوق
            </button>
          </div>
        ) : (
          /* Main Drawer Body */
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">سلتك فارغة حالياً</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  تصفح سلطان البط البلدي، متبلات المشاوي، أو استخدم حاسبة العزومات الذكية لتجهيز سفرتك.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-black text-xs hover:bg-red-500 transition-all cursor-pointer shadow-xs"
                >
                  تصفح قائمة الطعام
                </button>
              </div>
            ) : activeStep === 'cart' ? (
              /* Step 1: Itemized Cart Review */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-[#F0EAE1]">
                  <span>الأصناف المختارة ({items.length})</span>
                  <span>الكمية والسعر</span>
                </div>

                <div className="space-y-3">
                  {items.map((item, idx) => {
                    const price = item.product.price + (item.selectedVariant?.priceDelta || 0);
                    return (
                      <div
                        key={`${item.product.id}-${item.selectedVariant?.id || 'default'}-${idx}`}
                        className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-center gap-3 hover:border-red-300 transition-all"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 text-right space-y-1">
                          <h4 className="text-xs sm:text-sm font-black text-stone-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          {item.selectedVariant && (
                            <span className="inline-block text-[10px] text-red-800 font-bold bg-red-100 px-2 py-0.5 rounded-md">
                              {item.selectedVariant.label}
                            </span>
                          )}
                          <div className="text-[11px] text-stone-500">{item.product.weight}</div>
                          <div className="text-xs font-black text-red-600">{price * item.quantity} ج</div>
                        </div>

                        {/* Quantity Counter & Delete */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedVariant?.id)}
                            className="text-stone-400 hover:text-red-600 transition-colors p-1"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1.5 bg-white border border-[#E7DFD5] rounded-lg p-0.5 shadow-2xs">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)
                              }
                              className="w-5 h-5 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-black text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)
                              }
                              className="w-5 h-5 rounded flex items-center justify-center bg-red-600 text-white font-bold hover:bg-red-500 shadow-2xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue to delivery details */}
                <button
                  onClick={() => setActiveStep('checkout')}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-red-600/25 cursor-pointer"
                >
                  <span>متابعة بيانات التوصيل والاستلام</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            ) : (
              /* Step 2: Delivery Details & Preferred Schedule */
              <div className="space-y-5 text-right">
                <button
                  onClick={() => setActiveStep('cart')}
                  className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 mb-2"
                >
                  <span>← العودة لمراجعة الأصناف</span>
                </button>

                <div className="space-y-4">
                  <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-red-600" />
                    بيانات المستلم وعنوان التوصيل:
                  </h3>

                  <div>
                    <label className="text-xs text-stone-700 block mb-1 font-bold">الاسم ثلاثي *</label>
                    <input
                      type="text"
                      value={deliveryDetails.fullName}
                      onChange={(e) => setDeliveryDetails({ fullName: e.target.value })}
                      placeholder="مثال: محمد فرجاني"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-stone-900 focus:outline-none focus:border-red-500 ${
                        formErrors.fullName ? 'border-red-500' : 'border-[#E7DFD5]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <span className="text-[11px] text-red-600 mt-1 block">{formErrors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-stone-700 block mb-1 font-bold">رقم الهاتف (للتأكيد وتتبع الشحن) *</label>
                    <input
                      type="tel"
                      value={deliveryDetails.phone}
                      onChange={(e) => setDeliveryDetails({ phone: e.target.value })}
                      placeholder="010XXXXXXXX"
                      dir="ltr"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-stone-900 focus:outline-none focus:border-red-500 text-right ${
                        formErrors.phone ? 'border-red-500' : 'border-[#E7DFD5]'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-red-600 mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-stone-700 block mb-1 font-bold">المحافظة / المنطقة</label>
                      <select
                        value={deliveryDetails.city}
                        onChange={(e) => setDeliveryDetails({ city: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-red-500"
                      >
                        <option value="القاهرة - مصر الجديدة ومدينة نصر">القاهرة (مصر الجديدة ومدينة نصر)</option>
                        <option value="القاهرة - التجمع والقاهرة الجديدة">القاهرة (التجمع والقاهرة الجديدة)</option>
                        <option value="القاهرة - المعادي وحلوان">القاهرة (المعادي وحلوان)</option>
                        <option value="القاهرة - وسط البلد والزمالك">القاهرة (وسط البلد والزمالك)</option>
                        <option value="الجيزة - الدقي والمهندسين">الجيزة (الدقي والمهندسين)</option>
                        <option value="الجيزة - الشيخ زايد وأكتوبر">الجيزة (الشيخ زايد وأكتوبر)</option>
                        <option value="الجيزة - الهرم وفيصل">الجيزة (الهرم وفيصل)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-stone-700 block mb-1 font-bold">موعد الاستلام المفضل</label>
                      <select
                        value={deliveryDetails.deliveryTimeSlot}
                        onChange={(e) => setDeliveryDetails({ deliveryTimeSlot: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-red-500"
                      >
                        <option value="قبل الغداء (1:00 م - 3:00 م)">قبل الغداء (1:00 م - 3:00 م)</option>
                        <option value="عصراً (3:00 م - 6:00 م)">عصراً (3:00 م - 6:00 م)</option>
                        <option value="مسائي (6:00 م - 9:00 م)">مسائي (6:00 م - 9:00 م)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-stone-700 block mb-1 font-bold">العنوان بالتفصيل *</label>
                    <textarea
                      rows={2}
                      value={deliveryDetails.address}
                      onChange={(e) => setDeliveryDetails({ address: e.target.value })}
                      placeholder="الشارع، رقم العمارة، الدور، رقم الشقة، علامة مميزة..."
                      className={`w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-red-500 ${
                        formErrors.address ? 'border-red-500' : 'border-[#E7DFD5]'
                      }`}
                    />
                    {formErrors.address && (
                      <span className="text-[11px] text-red-600 mt-1 block">{formErrors.address}</span>
                    )}
                  </div>

                  {/* Scheduled Delivery Date with Appetite Red Outline on select */}
                  <div>
                    <label className="text-xs text-stone-700 block mb-1 font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-red-600" />
                      تاريخ التوصيل المطلوب (طازج ومبرد):
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryDetails({ deliveryDate: 'اليوم (توصيل فوري مسائي)' })}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          deliveryDetails.deliveryDate.includes('اليوم')
                            ? 'bg-red-100 border-red-500 text-red-950 font-black'
                            : 'bg-[#FAF7F2] border-[#E7DFD5] text-stone-600 hover:bg-[#F2ECE3]'
                        }`}
                      >
                        اليوم
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryDetails({ deliveryDate: 'غداً صباحاً' })}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          deliveryDetails.deliveryDate.includes('غداً')
                            ? 'bg-red-100 border-red-500 text-red-950 font-black'
                            : 'bg-[#FAF7F2] border-[#E7DFD5] text-stone-600 hover:bg-[#F2ECE3]'
                        }`}
                      >
                        غداً
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryDetails({ deliveryDate: 'يوم الجمعة (قبل صلاة الجمعة/الغداء)' })}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          deliveryDetails.deliveryDate.includes('الجمعة')
                            ? 'bg-red-100 border-red-500 text-red-950 font-black'
                            : 'bg-[#FAF7F2] border-[#E7DFD5] text-stone-600 hover:bg-[#F2ECE3]'
                        }`}
                      >
                        عزومة الجمعة
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Drawer Footer Actions */}
        {items.length > 0 && !orderSuccess && (
          <div className="p-5 bg-[#FAF7F2] border-t border-[#E7DFD5] space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>قيمة الأصناف:</span>
                <span className="font-bold text-stone-900">{subtotal} ج</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>شحن مبرد (سيارات مجهزة):</span>
                <span className="font-bold">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-black">مجاناً 🎁</span>
                  ) : (
                    <span className="text-stone-900">{shippingFee} ج</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-[#E7DFD5]">
                <span>المجموع النهائي:</span>
                <span className="text-red-600 text-xl">{totalPrice} ج</span>
              </div>
            </div>

            {/* Action Buttons: Context-aware Step 1 vs Step 2 */}
            {activeStep === 'cart' ? (
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setActiveStep('checkout')}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-red-600/25 transition-all cursor-pointer"
                >
                  <span>متابعة بيانات التوصيل والاستلام</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                {/* WhatsApp Checkout Button */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>إرسال الطلب فوراً عبر الواتساب (فاتورة جاهزة)</span>
                </button>

                {/* Standard COD Checkout Button */}
                <button
                  onClick={handleCODCheckout}
                  className="w-full py-2.5 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs border border-[#D5C7B7] transition-all cursor-pointer shadow-2xs"
                >
                  أو الدفع عند الاستلام كاش (COD)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
