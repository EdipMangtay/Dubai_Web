'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Mail, MessageCircle, Phone, LoaderCircle } from 'lucide-react';
import { CONTACT } from '@/lib/constants';
import Reveal from './ui/Reveal';
import TextLines from './ui/TextLines';
import { useMotionSettings } from '@/hooks/useMotionSettings';
import { MOTION } from '@/lib/motion';

const initialData = { name: '', phone: '', date: '', serviceType: 'vip-tour', message: '' };

export default function Contact() {
  const { reduced, duration } = useMotionSettings();
  const [formData, setFormData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const acceptDraft = (message: string) => {
      setFormData(current => ({ ...current, message }));
      setSubmitted(false);
      try { sessionStorage.removeItem('dubai:contact-draft'); } catch {}
    };
    const onDraft = (event: Event) => {
      const message = (event as CustomEvent<unknown>).detail;
      if (typeof message === 'string') acceptDraft(message);
    };
    window.addEventListener('dubai:contact-draft', onDraft);
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try { const draft = sessionStorage.getItem('dubai:contact-draft'); if (draft) acceptDraft(draft); } catch {}
    });
    return () => { mounted = false; window.removeEventListener('dubai:contact-draft', onDraft); };
  }, []);

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
        <Reveal variant="editorial" className="lg:col-span-5"><p className="eyebrow">07 · Concierge</p><h2 id="contact-title" className="display title-lg mt-7"><TextLines lines={['Dubai’niz', <em key="second" className="text-sand-light">burada başlar.</em>]} /></h2><p className="body-lead mt-8 max-w-md text-ivory/60">Aklınızdaki seyahati birkaç cümleyle anlatın. Ekibimiz seçenekleri netleştirmek için sizinle iletişime geçsin.</p>
          <div className="mt-12 border-t border-white/15">
            <a href={CONTACT.contactHref} className="group flex min-h-20 items-center justify-between border-b border-white/15 py-5"><span className="flex items-center gap-4"><MessageCircle className="size-4 text-sand" /><span><small className="block text-[.58rem] uppercase tracking-[.16em] text-ivory/40">Concierge · iletişim formu</small><strong className="mt-1 block text-sm font-medium">{CONTACT.phone}</strong></span></span><ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
            <a href={CONTACT.contactHref} className="group flex min-h-20 items-center justify-between border-b border-white/15 py-5"><span className="flex items-center gap-4"><Phone className="size-4 text-sand" /><span><small className="block text-[.58rem] uppercase tracking-[.16em] text-ivory/40">Telefon · örnek numara</small><strong className="mt-1 block text-sm font-medium">{CONTACT.phone}</strong></span></span><ArrowUpRight className="size-4" /></a>
            {CONTACT.email && <a href={`mailto:${CONTACT.email}`} className="group flex min-h-20 items-center justify-between border-b border-white/15 py-5"><span className="flex min-w-0 items-center gap-4"><Mail className="size-4 shrink-0 text-sand" /><span className="min-w-0"><small className="block text-[.58rem] uppercase tracking-[.16em] text-ivory/40">E-posta</small><strong className="mt-1 block truncate text-sm font-medium">{CONTACT.email}</strong></span></span><ArrowUpRight className="size-4 shrink-0" /></a>}
          </div>
        </Reveal>

        <Reveal id="contact-form" delay={.14} direction="right" className="border border-white/18 p-6 sm:p-10 lg:col-span-7 lg:p-12">
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? <motion.div key="success" role="status" className="flex min-h-[31rem] flex-col items-center justify-center text-center" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: duration('medium'), ease: MOTION.ease }}><span className="success-mark grid size-16 place-items-center border border-sand text-sand"><Check className="size-6" /></span><h3 className="display mt-7 text-5xl">Talebiniz alındı.</h3><p className="mt-4 max-w-md text-sm leading-7 text-ivory/55">Ekibimiz seyahat detaylarını konuşmak için sizinle iletişime geçecek.</p><button type="button" className="btn-quiet mt-8" onClick={() => setSubmitted(false)}>Yeni talep oluştur</button></motion.div> :
            <motion.form key="form" onSubmit={submit} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: duration('medium'), ease: MOTION.ease }} aria-describedby={error ? 'contact-error' : undefined}>
              <div className="grid gap-8 sm:grid-cols-2"><label><span className="field-label">Adınız soyadınız *</span><input className="field" name="name" value={formData.name} onChange={change} required autoComplete="name" placeholder="Adınız" /></label><label><span className="field-label">Telefon numaranız *</span><input className="field" type="tel" name="phone" value={formData.phone} onChange={change} required autoComplete="tel" placeholder={CONTACT.phone} /></label><label><span className="field-label">İlgilendiğiniz hizmet</span><select className="field [color-scheme:dark]" name="serviceType" value={formData.serviceType} onChange={change}><option value="vip-tour">VIP şehir turu</option><option value="visa">Vize danışmanlığı</option><option value="safari">Çöl safarisi</option><option value="yacht">Özel yat</option><option value="full-package">Kapsamlı seyahat</option></select></label><label><span className="field-label">Seyahat tarihi</span><input className="field [color-scheme:dark]" type="date" name="date" value={formData.date} onChange={change} /></label></div>
              <label className="mt-8 block"><span className="field-label">Bize yolculuğunuzu anlatın *</span><textarea className="field min-h-32 resize-y" name="message" value={formData.message} onChange={change} required placeholder="Kişi sayısı, ilgi alanları ve özel istekleriniz..." /></label>
              {error ? <motion.p initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: duration('short'), ease: MOTION.ease }} id="contact-error" role="alert" className="mt-5 border-l-2 border-red-400 pl-3 text-sm text-red-300">{error}</motion.p> : null}
              <button type="submit" disabled={submitting} aria-busy={submitting} className="btn-primary mt-9 w-full disabled:cursor-wait disabled:opacity-55">{submitting ? 'İletiliyor…' : 'Talebi gönder'} {submitting ? <LoaderCircle className="loading-indicator size-4" aria-hidden="true" /> : <ArrowUpRight className="size-4" />}</button>
            </motion.form>}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
