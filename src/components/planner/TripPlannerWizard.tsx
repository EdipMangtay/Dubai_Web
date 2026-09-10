'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Compass, Ship, Sparkles, Utensils, Car } from 'lucide-react';
import { formatCurrency } from '@/lib/formatCurrency';
import Reveal from '../ui/Reveal';

type PlannerData = { nights: number; startDate: string; pax: number; hotel: string; experiences: string[]; name: string; phone: string; specialRequests: string };
const HOTELS = [
  { id: 'atlantis-royal', name: 'Atlantis The Royal', area: 'Palm Jumeirah', pricePerNight: 4200 },
  { id: 'burj-al-arab', name: 'Burj Al Arab Jumeirah', area: 'Umm Suqeim', pricePerNight: 6500 },
  { id: 'armani-hotel', name: 'Armani Hotel Dubai', area: 'Downtown', pricePerNight: 3200 },
  { id: 'bulgari-resort', name: 'Bulgari Resort Dubai', area: 'Jumeira Bay', pricePerNight: 5500 },
];
const EXPERIENCES = [
  { id: 'yacht', name: 'Özel yat gün batımı turu', price: 6800, icon: Ship },
  { id: 'safari', name: 'VIP kızıl kum çöl safarisi', price: 4200, icon: Compass },
  { id: 'helicopter', name: '25 dk helikopter şehir turu', price: 3600, icon: Sparkles },
  { id: 'dining', name: 'Fine-dining masa rezervasyonu', price: 2800, icon: Utensils },
  { id: 'chauffeur', name: 'Seyahat boyunca özel şoför', price: 5000, icon: Car },
];
const STEP_LABELS = ['Tarih', 'Konaklama', 'Deneyimler', 'İletişim'];

export default function TripPlannerWizard() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const [data, setData] = useState<PlannerData>({ nights: 5, startDate: '', pax: 2, hotel: HOTELS[0].id, experiences: ['yacht', 'safari'], name: '', phone: '', specialRequests: '' });
  const hotel = HOTELS.find(item => item.id === data.hotel) ?? HOTELS[0];
  const hotelTotal = hotel.pricePerNight * data.nights;
  const extrasTotal = data.experiences.reduce((sum, id) => sum + (EXPERIENCES.find(item => item.id === id)?.price ?? 0), 0);
  const total = hotelTotal + extrasTotal;
  const toggle = (id: string) => setData(current => ({ ...current, experiences: current.experiences.includes(id) ? current.experiences.filter(item => item !== id) : [...current.experiences, id] }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSubmitting(true); setError(null);
    try {
      const response = await fetch('/api/website/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: data.name, phone: data.phone, date: data.startDate, serviceType: `Özel seyahat: ${hotel.name}`, message: `${data.nights} gece, ${data.pax} misafir. Deneyimler: ${data.experiences.join(', ') || 'belirtilmedi'}. Tahmini toplam: ${total} AED. Not: ${data.specialRequests || 'yok'}` }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Talep iletilemedi.');
      setSuccess(true);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Talep iletilemedi. Lütfen tekrar deneyin.'); }
    finally { setSubmitting(false); }
  };

  return (
    <section id="trip-planner" className="paper-section section-space border-t border-[#0b1513]/15" aria-labelledby="planner-title">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><p className="eyebrow">04 · Bespoke planner</p><h2 id="planner-title" className="display title-md mt-7">Yolculuğunuzu<br /><em className="text-[#80673f]">tasarlayın.</em></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#0b1513]/62">Tercihlerinizi seçin, ilk bütçe çerçevesini görün. Son program concierge ekibimizle birlikte netleşir.</p><p className="mt-8 border-l border-[#80673f] pl-4 text-xs leading-6 text-[#0b1513]/50">Gösterilen tutarlar tahmini başlangıç bedelleridir; tarih ve müsaitliğe göre değişebilir.</p></Reveal>

          <Reveal delay={.12} direction="right" className="lg:col-span-8">
            <div className="border border-[#0b1513]/20 bg-[#ebe5d9] p-5 sm:p-9">
              <ol className="grid grid-cols-4 border-b border-[#0b1513]/18 pb-6" aria-label={`Adım ${step} / 4`}>
                {STEP_LABELS.map((label, index) => <li key={label} className={`${index + 1 <= step ? 'text-[#0b1513]' : 'text-[#0b1513]/30'} flex flex-col gap-2`}><span className="font-serif text-2xl">0{index + 1}</span><span className="hidden text-[.58rem] font-bold uppercase tracking-[.14em] sm:block">{label}</span></li>)}
              </ol>

              {success ? <div className="flex min-h-[30rem] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center border border-[#80673f] text-[#80673f]"><Check className="size-6" /></span><h3 className="display mt-7 text-5xl">Planınız bize ulaştı.</h3><p className="mt-4 max-w-md text-sm leading-7 text-[#0b1513]/60">Concierge ekibimiz seçiminizi inceleyerek sizinle iletişime geçecek.</p><p className="mt-6 font-serif text-2xl text-[#80673f]">{formatCurrency(total)}</p></div> :
              <form onSubmit={submit} className="pt-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={step} initial={{ opacity: 0, x: reduced ? 0 : 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : -20 }} transition={{ duration: reduced ? .01 : .3 }} className="min-h-[23rem]">
                    {step === 1 ? <div><h3 className="font-serif text-3xl">Ne zaman, kaç kişi?</h3><div className="mt-8 grid gap-7 sm:grid-cols-2"><label><span className="block text-[.62rem] font-bold uppercase tracking-[.14em] text-[#80673f]">Gece sayısı</span><select className="mt-3 w-full border-0 border-b border-[#0b1513]/25 bg-transparent py-3 outline-none" value={data.nights} onChange={e => setData({ ...data, nights: Number(e.target.value) })}>{[3,5,7,10].map(n => <option key={n} value={n}>{n} gece</option>)}</select></label><label><span className="block text-[.62rem] font-bold uppercase tracking-[.14em] text-[#80673f]">Misafir sayısı</span><select className="mt-3 w-full border-0 border-b border-[#0b1513]/25 bg-transparent py-3 outline-none" value={data.pax} onChange={e => setData({ ...data, pax: Number(e.target.value) })}>{[1,2,4,6].map(n => <option key={n} value={n}>{n}{n === 6 ? '+' : ''} kişi</option>)}</select></label><label className="sm:col-span-2"><span className="block text-[.62rem] font-bold uppercase tracking-[.14em] text-[#80673f]">Tahmini başlangıç tarihi</span><input type="date" className="mt-3 w-full border-0 border-b border-[#0b1513]/25 bg-transparent py-3 outline-none" value={data.startDate} onChange={e => setData({ ...data, startDate: e.target.value })} /></label></div></div> : null}
                    {step === 2 ? <div><h3 className="font-serif text-3xl">Nasıl bir konaklama?</h3><div className="mt-7 divide-y divide-[#0b1513]/15 border-y border-[#0b1513]/15">{HOTELS.map(item => <label key={item.id} className="flex min-h-20 cursor-pointer items-center justify-between gap-4 py-4"><span><strong className="block font-serif text-xl font-medium">{item.name}</strong><small className="mt-1 block text-xs text-[#0b1513]/48">{item.area}</small></span><span className="flex items-center gap-4 text-right"><span className="text-xs text-[#80673f]">{formatCurrency(item.pricePerNight)} / gece</span><input type="radio" name="hotel" value={item.id} checked={data.hotel === item.id} onChange={() => setData({ ...data, hotel: item.id })} className="size-4 accent-[#80673f]" /></span></label>)}</div></div> : null}
                    {step === 3 ? <div><h3 className="font-serif text-3xl">Hangi anları ekleyelim?</h3><div className="mt-7 grid gap-px bg-[#0b1513]/15 sm:grid-cols-2">{EXPERIENCES.map(item => { const Icon = item.icon; const active = data.experiences.includes(item.id); return <button key={item.id} type="button" aria-pressed={active} onClick={() => toggle(item.id)} className={`flex min-h-28 items-start justify-between gap-4 p-5 text-left transition-colors ${active ? 'bg-[#0b1513] text-[#f4f0e7]' : 'bg-[#ebe5d9] hover:bg-[#e3dccf]'}`}><span><Icon className={`size-4 ${active ? 'text-[#d2b98c]' : 'text-[#80673f]'}`} /><strong className="mt-4 block font-serif text-xl font-medium leading-tight">{item.name}</strong></span><span className="shrink-0 text-[.62rem]">+{formatCurrency(item.price)}</span></button>; })}</div></div> : null}
                    {step === 4 ? <div><h3 className="font-serif text-3xl">Planı nereye gönderelim?</h3><div className="mt-8 grid gap-7 sm:grid-cols-2"><label><span className="block text-[.62rem] font-bold uppercase tracking-[.14em] text-[#80673f]">Adınız soyadınız *</span><input required autoComplete="name" className="mt-3 w-full border-0 border-b border-[#0b1513]/25 bg-transparent py-3 outline-none" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} /></label><label><span className="block text-[.62rem] font-bold uppercase tracking-[.14em] text-[#80673f]">Telefon *</span><input required type="tel" autoComplete="tel" className="mt-3 w-full border-0 border-b border-[#0b1513]/25 bg-transparent py-3 outline-none" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} /></label><label className="sm:col-span-2"><span className="block text-[.62rem] font-bold uppercase tracking-[.14em] text-[#80673f]">Özel notlar</span><textarea className="mt-3 min-h-24 w-full resize-y border-0 border-b border-[#0b1513]/25 bg-transparent py-3 outline-none" value={data.specialRequests} onChange={e => setData({ ...data, specialRequests: e.target.value })} /></label><div className="flex items-baseline justify-between border-t border-[#0b1513]/18 pt-5 sm:col-span-2"><span className="text-xs uppercase tracking-[.12em] text-[#0b1513]/50">Tahmini başlangıç</span><strong className="font-serif text-3xl text-[#80673f]">{formatCurrency(total)}</strong></div>{error ? <p role="alert" className="text-sm text-red-700 sm:col-span-2">{error}</p> : null}</div></div> : null}
                  </motion.div>
                </AnimatePresence>
                <div className="mt-6 flex items-center justify-between border-t border-[#0b1513]/18 pt-6">{step > 1 ? <button type="button" className="inline-flex min-h-11 items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.13em]" onClick={() => setStep(value => value - 1)}><ArrowLeft className="size-4" /> Geri</button> : <span />}{step < 4 ? <button type="button" className="inline-flex min-h-11 items-center gap-2 bg-[#0b1513] px-5 text-[.65rem] font-bold uppercase tracking-[.13em] text-[#f4f0e7]" onClick={() => setStep(value => value + 1)}>Devam <ArrowRight className="size-4" /></button> : <button type="submit" disabled={submitting} className="inline-flex min-h-11 items-center gap-2 bg-[#0b1513] px-5 text-[.65rem] font-bold uppercase tracking-[.13em] text-[#f4f0e7] disabled:opacity-50">{submitting ? 'İletiliyor…' : 'Planı gönder'} <ArrowRight className="size-4" /></button>}</div>
              </form>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
