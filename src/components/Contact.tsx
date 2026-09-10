'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Mail, MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/constants';
import Reveal from './ui/Reveal';

const initialData = { name: '', phone: '', date: '', serviceType: 'vip-tour', message: '' };

export default function Contact() {
  const [formData, setFormData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setFormData(current => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSubmitting(true); setError(null);
    try {
      const response = await fetch('/api/website/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Talep iletilemedi. Lütfen tekrar deneyin.');
      setSubmitted(true); setFormData(initialData);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Bağlantı hatası. Lütfen tekrar deneyin.'); }
    finally { setSubmitting(false); }
  };

  return (
    <section id="contact" className="section-space bg-canvas" aria-labelledby="contact-title">
      <div className="container-wide grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5"><p className="eyebrow">07 · Concierge</p><h2 id="contact-title" className="display title-lg mt-7">Dubai’niz<br /><em className="text-sand-light">burada başlar.</em></h2><p className="body-lead mt-8 max-w-md text-ivory/60">Aklınızdaki seyahati birkaç cümleyle anlatın. Ekibimiz seçenekleri netleştirmek için sizinle iletişime geçsin.</p>
          <div className="mt-12 border-t border-white/15">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex min-h-20 items-center justify-between border-b border-white/15 py-5"><span className="flex items-center gap-4"><MessageCircle className="size-4 text-sand" /><span><small className="block text-[.58rem] uppercase tracking-[.16em] text-ivory/40">WhatsApp</small><strong className="mt-1 block text-sm font-medium">{CONTACT.phone}</strong></span></span><ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
            <a href={`tel:${CONTACT.phoneRaw}`} className="group flex min-h-20 items-center justify-between border-b border-white/15 py-5"><span className="flex items-center gap-4"><Phone className="size-4 text-sand" /><span><small className="block text-[.58rem] uppercase tracking-[.16em] text-ivory/40">Doğrudan arayın</small><strong className="mt-1 block text-sm font-medium">Türkçe destek</strong></span></span><ArrowUpRight className="size-4" /></a>
            <a href={`mailto:${CONTACT.email}`} className="group flex min-h-20 items-center justify-between border-b border-white/15 py-5"><span className="flex min-w-0 items-center gap-4"><Mail className="size-4 shrink-0 text-sand" /><span className="min-w-0"><small className="block text-[.58rem] uppercase tracking-[.16em] text-ivory/40">E-posta</small><strong className="mt-1 block truncate text-sm font-medium">{CONTACT.email}</strong></span></span><ArrowUpRight className="size-4 shrink-0" /></a>
          </div>
        </Reveal>

        <Reveal delay={.14} direction="right" className="border border-white/18 p-6 sm:p-10 lg:col-span-7 lg:p-12">
          <AnimatePresence mode="wait">
            {submitted ? <motion.div key="success" className="flex min-h-[31rem] flex-col items-center justify-center text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span className="grid size-16 place-items-center border border-sand text-sand"><Check className="size-6" /></span><h3 className="display mt-7 text-5xl">Talebiniz alındı.</h3><p className="mt-4 max-w-md text-sm leading-7 text-ivory/55">Ekibimiz seyahat detaylarını konuşmak için sizinle iletişime geçecek.</p><button type="button" className="btn-quiet mt-8" onClick={() => setSubmitted(false)}>Yeni talep oluştur</button></motion.div> :
            <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-describedby={error ? 'contact-error' : undefined}>
              <div className="grid gap-8 sm:grid-cols-2"><label><span className="field-label">Adınız soyadınız *</span><input className="field" name="name" value={formData.name} onChange={change} required autoComplete="name" placeholder="Adınız" /></label><label><span className="field-label">Telefon numaranız *</span><input className="field" type="tel" name="phone" value={formData.phone} onChange={change} required autoComplete="tel" placeholder="+90 5XX XXX XX XX" /></label><label><span className="field-label">İlgilendiğiniz hizmet</span><select className="field [color-scheme:dark]" name="serviceType" value={formData.serviceType} onChange={change}><option value="vip-tour">VIP şehir turu</option><option value="visa">Vize danışmanlığı</option><option value="safari">Çöl safarisi</option><option value="yacht">Özel yat</option><option value="full-package">Kapsamlı seyahat</option></select></label><label><span className="field-label">Seyahat tarihi</span><input className="field [color-scheme:dark]" type="date" name="date" value={formData.date} onChange={change} /></label></div>
              <label className="mt-8 block"><span className="field-label">Bize yolculuğunuzu anlatın *</span><textarea className="field min-h-32 resize-y" name="message" value={formData.message} onChange={change} required placeholder="Kişi sayısı, ilgi alanları ve özel istekleriniz..." /></label>
              {error ? <p id="contact-error" role="alert" className="mt-5 border-l-2 border-red-400 pl-3 text-sm text-red-300">{error}</p> : null}
              <button type="submit" disabled={submitting} className="btn-primary mt-9 w-full disabled:cursor-wait disabled:opacity-55">{submitting ? 'İletiliyor…' : 'Talebi gönder'} <ArrowUpRight className="size-4" /></button>
            </motion.form>}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
