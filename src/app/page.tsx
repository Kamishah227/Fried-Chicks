'use client';

import { useState, useRef, memo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Scene, { type CategoryKey } from '@/components/Scene';

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Deals', href: '#deals' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const categories: { key: CategoryKey; title: string; subtitle: string; items: { name: string; price: string; desc: string }[] }[] = [
  {
    key: 'fastfood',
    title: 'Fast Food',
    subtitle: 'Crispy, juicy, unforgettable',
    items: [
      { name: 'Mighty Zinger', price: 'Rs 650', desc: 'Double-decker crispy chicken fillet with secret sauce' },
      { name: 'Dragon Burger', price: 'Rs 720', desc: 'Spicy flame-grilled patty, cheddar & jalapeños' },
      { name: 'Chapli Burger', price: 'Rs 580', desc: 'Traditional chapli patty in a toasted brioche' },
      { name: 'Matka Fries', price: 'Rs 320', desc: 'Crispy fries tossed in desi masala, served in a matka' },
    ],
  },
  {
    key: 'pizza',
    title: 'Pizza & Italian',
    subtitle: 'Cheesy indulgence',
    items: [
      { name: 'Crown Crust Pizza', price: 'Rs 1,450', desc: 'Stuffed cheese-filled crust with premium toppings' },
      { name: 'Kabab Crust Pizza', price: 'Rs 1,550', desc: 'Seekh kabab stuffed crust with spicy tikka chunks' },
      { name: 'FC Creamy Pasta', price: 'Rs 750', desc: 'Penne in rich creamy Alfredo with grilled chicken' },
    ],
  },
  {
    key: 'bbq',
    title: 'BBQ & Wraps',
    subtitle: 'Smoky & tender',
    items: [
      { name: 'Malai Boti', price: 'Rs 850', desc: 'Creamy, melt-in-mouth chicken boti with raita' },
      { name: 'Reshmi Kabab', price: 'Rs 900', desc: 'Silky minced chicken skewers, char-grilled' },
      { name: 'Twister Wrap', price: 'Rs 450', desc: 'Crispy chicken strips with fresh veggies & sauce' },
    ],
  },
  {
    key: 'desi',
    title: 'Traditional/Desi',
    subtitle: 'Authentic family recipes',
    items: [
      { name: 'FC Special Chicken Karahi', price: 'Rs 1,650', desc: 'Signature karahi slow-cooked in desi ghee & spices' },
      { name: 'Mutton Shinwari', price: 'Rs 2,100', desc: 'Tender mutton in rich tomato-based gravy' },
      { name: 'Beef Afghani Pulao', price: 'Rs 1,250', desc: 'Fragrant rice with succulent beef and caramelized carrots' },
    ],
  },
  {
    key: 'dessert',
    title: 'Desserts',
    subtitle: 'Sweet endings',
    items: [
      { name: 'Special FC Shahi Halwa', price: 'Rs 450', desc: 'Rich semolina halwa loaded with nuts & ghee' },
      { name: 'Lab-e-Shireen', price: 'Rs 380', desc: 'Creamy fruit trifle with vermicelli & jelly' },
    ],
  },
];

const deals = [
  {
    title: 'Pizza D-5',
    tag: 'Family Feast',
    price: 'Rs 3,999',
    items: [
      '1 Extra Large Pizza',
      '5 Zinger Burgers',
      '10 Hot Wings',
      '1 Family Fries',
      '1.5L Drink',
    ],
  },
  {
    title: 'FC Special Birthday Deal',
    tag: 'Party Package',
    price: 'Rs 8,999',
    items: [
      '2 Extra Large Pizzas',
      '20pcs Nuggets',
      'Special Handi',
      'Chicken Kabab',
      '3 Full Biryani',
      '1 Pound Free Cake',
      '& more surprises',
    ],
  },
];

const gallery = [
  { src: '/images/hero-burger.png', alt: 'Mighty Zinger Burger' },
  { src: '/images/crown-pizza.jpg', alt: 'Crown Crust Pizza' },
  { src: '/images/traditional-platter.jpg', alt: 'Traditional Platter' },
  { src: '/images/dessert-halwa.jpg', alt: 'Special FC Shahi Halwa' },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('fastfood');
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0a07]">
      <Navbar />

      {/* 3D background scene */}
      <Scene scrollProgress={scrollYProgress} activeCategory={activeCategory} />

      {/* Hero Section */}
      <Hero reducedMotion={reducedMotion} scrollProgress={scrollYProgress} />

      {/* Story / About Section */}
      <Story reducedMotion={reducedMotion} />

      {/* Menu Section */}
      <Menu
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        reducedMotion={reducedMotion}
      />

      {/* Deals Section */}
      <Deals reducedMotion={reducedMotion} />

      {/* Gallery Section */}
      <Gallery reducedMotion={reducedMotion} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
// Hero
/* ------------------------------------------------------------------ */

function Hero({ reducedMotion, scrollProgress }: { reducedMotion: boolean | null; scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const heroOpacity = useTransform(scrollProgress, [0, 0.18], [1, 0]);
  const heroY = useTransform(scrollProgress, [0, 0.18], [0, -80]);
  const style = reducedMotion ? {} : { opacity: heroOpacity, y: heroY };

  return (
    <section className="relative z-10 flex min-h-screen items-center px-6 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div style={style as React.CSSProperties} className="max-w-2xl will-change-transform">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-block font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]"
          >
            Established 2020
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-white"
          >
            Fried-Chicks
            <span className="mt-2 block text-[clamp(1.5rem,4vw,3rem)] font-normal italic text-[#fab026]">
              Secret Recipe 2020
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/70 md:text-xl"
          >
            The ultimate fusion of premium fast food and authentic traditional cuisine, crafted for families who crave both comfort and celebration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="tel:0325-7866767"
              className="inline-flex items-center gap-2 rounded-full bg-[#fab026] px-8 py-4 text-base font-bold text-[#1a1200] shadow-[0_0_40px_rgba(250,176,38,0.45)] transition-transform hover:scale-105"
            >
              Free Home Delivery
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#fab026]/50 hover:bg-white/10"
            >
              Explore Menu
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-2 w-2 rounded-full bg-[#fab026]"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Story
/* ------------------------------------------------------------------ */

const StoryImage = memo(function StoryImage() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
      <Image
        src="/images/restaurant-interior.jpg"
        alt="Fried-Chicks restaurant interior"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a07]/60 to-transparent" />
    </div>
  );
});

function Story({ reducedMotion }: { reducedMotion: boolean | null }) {
  const anim = reducedMotion ? {} : { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 } };
  const anim2 = reducedMotion ? {} : { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 } };

  return (
    <section className="relative z-10 px-6 py-28 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          {...anim}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="will-change-transform"
        >
          <StoryImage />
        </motion.div>

        <motion.div
          {...anim2}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]">Our Story</span>
          <h2 className="mt-4 font-serif text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] text-white">
            Where Fast Food Meets Family Tradition
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Since 2020, Fried-Chicks has been serving the twin joys of crunchy, premium fast food and soul-warming desi flavors under one roof. Every recipe carries a secret — a blend of heritage spices and modern technique — made to bring people together.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            From our signature Mighty Zinger to the slow-simmered FC Special Chicken Karahi, each dish is prepared fresh, served hot, and delivered with love.
          </p>
          <div className="mt-10 flex gap-10">
            <div>
              <p className="font-serif text-4xl font-semibold text-[#fab026]">5+</p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/50">Years of Taste</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-semibold text-[#fab026]">50k+</p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/50">Happy Customers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Menu
/* ------------------------------------------------------------------ */

const MenuItems = memo(function MenuItems({
  activeCategory,
}: {
  activeCategory: CategoryKey;
}) {
  const items = categories.find((c) => c.key === activeCategory)?.items ?? [];

  return (
    <motion.div
      key={activeCategory}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="grid gap-5 sm:grid-cols-2"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-[#fab026]/40 hover:bg-white/[0.06]"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-serif text-xl font-semibold text-white transition-colors group-hover:text-[#fab026]">
              {item.name}
            </h3>
            <span className="whitespace-nowrap font-bold text-[#fab026]">{item.price}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
});

function Menu({
  activeCategory,
  setActiveCategory,
  reducedMotion,
}: {
  activeCategory: CategoryKey;
  setActiveCategory: (k: CategoryKey) => void;
  reducedMotion: boolean | null;
}) {
  const anim = reducedMotion ? {} : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section id="menu" className="relative z-10 px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...anim}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center will-change-transform"
        >
          <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]">Discover</span>
          <h2 className="mt-3 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold text-white">Our Menu</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Hover a category to transform the 3D scene, or tap through to build your perfect order.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-wrap gap-3 lg:flex-col">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                onMouseEnter={() => setActiveCategory(cat.key)}
                className={`group relative flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors ${
                  activeCategory === cat.key
                    ? 'border-[#fab026]/60 bg-[#fab026]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div>
                  <p className={`font-semibold ${activeCategory === cat.key ? 'text-white' : 'text-white/80'}`}>
                    {cat.title}
                  </p>
                  <p className="text-xs text-white/40">{cat.items.length} items</p>
                </div>
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    activeCategory === cat.key ? 'bg-[#fab026]' : 'bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>

          <MenuItems activeCategory={activeCategory} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Deals
/* ------------------------------------------------------------------ */

function Deals({ reducedMotion }: { reducedMotion: boolean | null }) {
  const anim = reducedMotion ? {} : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section id="deals" className="relative z-10 px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...anim}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center will-change-transform"
        >
          <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]">Limited Time</span>
          <h2 className="mt-3 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold text-white">Special Deals</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {deals.map((deal, i) => (
            <motion.div
              key={deal.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={reducedMotion ? undefined : { y: -8 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl transition-colors hover:border-[#fab026]/40"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#fab026]/15 blur-3xl transition-colors group-hover:bg-[#fab026]/25" />
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-[#fab026]/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#fab026]">
                  {deal.tag}
                </span>
                <h3 className="mt-4 font-serif text-3xl font-semibold text-white md:text-4xl">{deal.title}</h3>
                <p className="mt-2 font-serif text-3xl font-semibold text-[#fab026]">{deal.price}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {deal.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/80">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#fab026]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 rounded-xl bg-[#fab026] px-8 py-3 font-bold text-[#1a1200] shadow-lg transition-transform hover:scale-105">
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Gallery
/* ------------------------------------------------------------------ */

const GalleryImage = memo(function GalleryImage({
  img,
  large,
  index,
}: {
  img: { src: string; alt: string };
  large: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl will-change-transform"
    >
      <div className={`relative w-full ${large ? 'aspect-square lg:aspect-auto lg:h-full' : 'aspect-square'}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a07]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <p className="absolute bottom-4 left-4 translate-y-4 font-serif text-lg font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {img.alt}
        </p>
      </div>
    </motion.div>
  );
});

function Gallery({ reducedMotion }: { reducedMotion: boolean | null }) {
  const anim = reducedMotion ? {} : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section id="gallery" className="relative z-10 px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...anim}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center will-change-transform"
        >
          <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#fab026]">Visual Feast</span>
          <h2 className="mt-3 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold text-white">From Our Kitchen</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {gallery.map((img, i) => (
            <div key={img.alt} className={i === 0 || i === 3 ? 'lg:col-span-2 lg:row-span-2' : ''}>
              <GalleryImage img={img} large={i === 0 || i === 3} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
// Footer
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 bg-[#0c0a07] px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-4xl font-semibold text-[#fab026]">Fried-Chicks</h2>
            <p className="mt-4 max-w-md text-white/60">
              Premium fast food and authentic traditional cuisine, served fresh since 2020. Free home delivery across Kotmomin.
            </p>
            <div className="mt-6 flex gap-4">
              <SocialIcon>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </SocialIcon>
              <SocialIcon>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>
              </SocialIcon>
            </div>
          </div>

          <div>
            <p className="font-serif text-lg font-semibold text-white">Contact</p>
            <div className="mt-5 flex flex-col gap-3 text-white/70">
              <a href="tel:0325-7866767" className="transition-colors hover:text-[#fab026]">0325-7866767</a>
              <a href="tel:0325-0786767" className="transition-colors hover:text-[#fab026]">0325-0786767</a>
              <p className="flex items-start gap-2">
                <span className="mt-1 text-[#fab026]">📍</span>
                Midh Road City Center Kotmomin
              </p>
            </div>
          </div>

          <div>
            <p className="font-serif text-lg font-semibold text-white">Hours</p>
            <div className="mt-5 flex flex-col gap-3 text-white/70">
              <p>Mon – Thu: 12pm – 11pm</p>
              <p>Fri – Sun: 12pm – 1am</p>
            </div>
            <div className="mt-6">
              <DeliveryRider />
            </div>
          </div>
        </div>

        <p className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Fried-Chicks. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
// Navbar
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#0c0a07]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">
        <a href="#" className="font-serif text-2xl font-semibold text-[#fab026]">
          Fried-Chicks
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-white/70 transition-colors hover:text-[#fab026]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:0325-7866767"
            className="rounded-full bg-[#fab026] px-5 py-2.5 text-sm font-bold text-[#1a1200] transition-transform hover:scale-105"
          >
            Order Now
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="text-white md:hidden" aria-label="Toggle menu">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0c0a07]/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-wider text-white/80 hover:text-[#fab026]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:0325-7866767"
              className="mt-2 rounded-full bg-[#fab026] px-5 py-3 text-center text-sm font-bold text-[#1a1200]"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-[#fab026]/50 hover:text-[#fab026]"
    >
      {children}
    </a>
  );
}

function DeliveryRider() {
  return (
    <div className="flex items-center gap-4">
      <svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#fab026]"
      >
        <path d="M20 65h55a10 10 0 0 0 0-20H55L45 35H30l5 10H20a8 8 0 0 0 0 16Z" fill="currentColor" />
        <rect x="32" y="18" width="28" height="22" rx="3" fill="#fff" />
        <path d="M38 24h16M38 30h12" stroke="#1a1200" strokeWidth="3" strokeLinecap="round" />
        <circle cx="68" cy="38" r="8" fill="#fff" />
        <path d="M68 30a8 8 0 0 1 8 8v4h-16v-4a8 8 0 0 1 8-8Z" fill="currentColor" />
        <circle cx="28" cy="73" r="10" stroke="#fff" strokeWidth="4" />
        <circle cx="75" cy="73" r="10" stroke="#fff" strokeWidth="4" />
      </svg>
      <div className="text-sm">
        <p className="font-bold text-[#fab026]">Fast Delivery</p>
        <p className="text-white/50">30-45 mins</p>
      </div>
    </div>
  );
}
