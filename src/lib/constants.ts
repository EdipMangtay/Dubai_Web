// ─── Renk Paleti ────────────────────────────────────────────
export const COLORS = {
  navy: {
    900: '#05070F',
    800: '#0B0F1A',
    700: '#111827',
  },
  gold: {
    300: '#F0D99A',
    400: '#E8C77A',
    500: '#C9A66B',
    600: '#A8854D',
  },
  cream: '#F5F1E8',
  sapphire: '#1B3A6B',
  white: '#FFFFFF',
} as const;

// ─── İletişim Bilgileri ─────────────────────────────────────
export const CONTACT = {
  phone: '+971 58 267 8228',
  phoneRaw: '+971582678228',
  email: 'info.traviadubai@gmail.com',
  instagram: 'travia.dubai',
  instagramUrl: 'https://www.instagram.com/travia.dubai/',
  whatsappUrl: 'https://wa.me/971582678228',
  address: 'Dubai, Birleşik Arap Emirlikleri',
} as const;

// ─── Navigasyon ─────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Anasayfa', href: '#hero' },
  { label: 'Hakkımızda', href: '#about' },
  { label: 'Turlar', href: '#services' },
  { label: 'Vize Hizmetleri', href: '#process' },
  { label: 'İletişim', href: '#contact' },
] as const;

// ─── İstatistikler ──────────────────────────────────────────
export const STATS = [
  { value: 500, suffix: '+', label: 'VIP Misafir', icon: 'Users' as const },
  { value: 10, suffix: ' Saat', label: 'Özel Araç', icon: 'Car' as const },
  { value: 3, suffix: ' İş Günü', label: 'Vize Süreci', icon: 'FileCheck' as const },
  { value: 7, suffix: '/24', label: 'Türkçe Destek', icon: 'Headset' as const },
] as const;

// ─── Hizmetler ──────────────────────────────────────────────
export const SERVICES = [
  {
    id: 'vip-tours',
    title: 'VIP Şehir Turları',
    description:
      '10 saat boyunca size özel tahsis edilen Mercedes S-Class veya Audi A6 lüks araç ve profesyonel Türkçe rehber eşliğinde Dubai\'nin en ikonik noktalarını keşfedin. Kalabalık gruplar için GMC ve Patrol araçlarımız da hizmetinizde.',
    icon: 'MapPin' as const,
  },
  {
    id: 'visa',
    title: 'Vize Danışmanlığı',
    description:
      'Bordo pasaport sahipleri için Dubai vizesi başvuru sürecinin her adımında yanınızdayız. Belge hazırlığından başvuru takibine kadar tüm süreç profesyonel ekibimiz tarafından yönetilir. Ortalama 3 iş günü içinde sonuç.',
    icon: 'Shield' as const,
  },
  {
    id: 'experiences',
    title: 'Özel Aktiviteler',
    description:
      'Çöl safarisi, özel yat turları, fine-dining deneyimleri, helikopter turları ve daha fazlası. Dubai\'nin sunduğu en özel deneyimleri sizin için organize ediyor, unutulmaz anılar biriktirmenizi sağlıyoruz.',
    icon: 'Sparkles' as const,
  },
] as const;

// ─── Süreç Adımları ─────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'İletişim',
    description: 'WhatsApp, telefon veya formumuzu kullanarak bize ulaşın. Hayalinizdeki Dubai deneyimini birlikte planlamaya başlayalım.',
  },
  {
    step: 2,
    title: 'Planlama',
    description: 'Beklentilerinize, seyahat tarihlerinize ve ilgi alanlarınıza göre tamamen size özel bir tur programı hazırlıyoruz.',
  },
  {
    step: 3,
    title: 'Onay & Rezervasyon',
    description: 'Programınızı birlikte gözden geçirip son haline getiriyoruz. Ödeme sonrası tüm rezervasyonlar tarafımızca yapılır.',
  },
  {
    step: 4,
    title: 'Dubai Deneyimi',
    description: 'Dubai\'ye vardığınız andan itibaren VIP ayrıcalıklarla karşılanır, rehberiniz ve özel aracınız sizleri bekler.',
  },
] as const;

// ─── SSS ────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    question: 'Dubai\'ye gitmek için vize gerekli mi?',
    answer:
      'Evet, Türkiye Cumhuriyeti bordo pasaport sahipleri Dubai\'ye seyahat edebilmek için vize almak zorundadır. Online başvuru sistemi üzerinden yapılan vize işlemleri ortalama 3 iş günü içinde sonuçlanmaktadır. Tüm süreçte profesyonel ekibimiz sizinle birliktedir.',
  },
  {
    question: 'Sadece vize hizmeti alabilir miyim?',
    answer:
      'Elbette. Tur paketi almadan yalnızca vize danışmanlığı hizmetimizden faydalanabilirsiniz. Belge hazırlığından başvuru takibine kadar tüm süreç tarafımızca yönetilir.',
  },
  {
    question: 'Vize başvurusu için hangi belgeler gerekiyor?',
    answer:
      'Geçerli pasaport (en az 6 ay süreli), biyometrik fotoğraf, uçak bileti veya rezervasyon, otel rezervasyonu ve son 3 aya ait banka hesap özeti temel belgeler arasındadır. Detaylı bilgi için bizimle iletişime geçebilirsiniz.',
  },
  {
    question: 'Tur ne kadar sürüyor? Araç tüm gün bende mi kalıyor?',
    answer:
      '10 saatlik VIP şehir turlarımızda lüks aracınız ve Türkçe rehberiniz gün boyunca sadece size hizmet verir. Programı tamamen sizin tercihlerinize göre şekillendiriyoruz — isterseniz alışveriş, isterseniz tarihi mekanlar, isterseniz de plaj keyfi.',
  },
  {
    question: 'Hangi araçları kullanıyorsunuz?',
    answer:
      'Filomuzda Mercedes S-Class, Audi A6 gibi üst segment sedan araçlar bulunmaktadır. Kalabalık gruplar ve aileler için GMC Yukon ve Nissan Patrol gibi geniş SUV araçlarımız da mevcuttur.',
  },
  {
    question: 'Özel aktiviteler nelerdir?',
    answer:
      'Çöl safarisi (quad, sandboarding, deve binme), özel yat turları, lüks restoranlarda fine-dining, helikopter turları, akvaryum dalışı, tema park VIP geçişleri ve çok daha fazlası. İlgi alanlarınıza göre özel bir program oluşturuyoruz.',
  },
] as const;
