"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

const featured = [
  { src: "/images/graduation/grad-1.jpg", label: "Graduation", category: "graduation" },
  { src: "/images/artists/artist-1.jpg", label: "Artists", category: "artists" },
  { src: "/images/fashion/fashion-1.jpg", label: "Fashion", category: "fashion" },
  { src: "/images/graduation/grad-2.jpg", label: "Graduation", category: "graduation" },
];

export default function HomePage() {
  const revealRefs = useRef<HTMLElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Start fading at 60% through hero, fully white by 105%
      const progress = Math.min(1, Math.max(0, (scrollY - vh * 0.6) / (vh * 0.45)));
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(1 - progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/owner/clement.jpg"
            alt="Clement — Edit_ByClem"
            fill
            className="object-cover opacity-40"
            style={{ objectPosition: "50% 22%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-6 animate-fade-in">
            Photography by Clement Akuamoh-Boateng
          </p>
          <h1
            className="font-['Archivo',sans-serif] font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-none text-[#fafafa] animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Edit_ByClem
          </h1>
          <p
            className="mt-6 text-[#a1a1aa] text-lg sm:text-xl max-w-lg mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Capturing graduation milestones, weddings, artists, and fashion — one frame at a time.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/portfolio"
              className="flex items-center gap-2 bg-[#C9A84C] text-[#0a0a0a] px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-[#b8962f] transition-colors duration-300 cursor-pointer"
            >
              View Portfolio <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-[#fafafa]/30 text-[#fafafa] px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 cursor-pointer"
            >
              Book a Session
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#52525b]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C] to-transparent" />
        </div>
      </section>

      {/* ── WHITE SECTIONS ── */}
      <div className="relative bg-white">
        {/* Scroll-reveal overlay: starts black, fades to transparent */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#0a0a0a] pointer-events-none z-10"
        />

        {/* ── TAGLINE STRIP ── */}
        <section ref={addRef} className="reveal py-20 px-6 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-4">The Work</p>
          <h2 className="font-['Archivo',sans-serif] font-bold text-3xl sm:text-4xl md:text-5xl text-[#0a0a0a] max-w-3xl mx-auto leading-tight">
            Every moment deserves to be told with purpose.
          </h2>
        </section>

        {/* ── FEATURED GRID ── */}
        <section className="px-6 max-w-7xl mx-auto pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {featured.map((item, i) => (
              <Link
                key={i}
                href={`/portfolio?category=${item.category}`}
                ref={addRef as React.Ref<HTMLAnchorElement>}
                className={`reveal group relative overflow-hidden cursor-pointer ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[3/4] sm:aspect-auto sm:h-[520px]" : "aspect-[3/4]"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-1">Album</p>
                  <p className="font-['Archivo',sans-serif] font-bold text-xl text-white tracking-wide">{item.label}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#C9A84C] hover:gap-4 transition-all duration-300 cursor-pointer"
            >
              See All Work <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section ref={addRef} className="reveal bg-[#f4f4f5] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-3 text-center">Albums</p>
            <h2 className="font-['Archivo',sans-serif] font-bold text-3xl sm:text-4xl text-[#0a0a0a] text-center mb-14">
              What We Shoot
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#d4d4d8]">
              {[
                { label: "Graduation", desc: "Cap & gown portraits that celebrate your milestone", category: "graduation" },
                { label: "Wedding", desc: "Timeless moments from your most important day", category: "wedding" },
                { label: "Artists", desc: "Performers, musicians, and creatives on stage", category: "artists" },
                { label: "Fashion", desc: "Editorial and lifestyle portraits with intention", category: "fashion" },
              ].map(({ label, desc, category }) => (
                <Link
                  key={label}
                  href={`/portfolio?category=${category}`}
                  className="group bg-[#f4f4f5] p-8 hover:bg-white transition-colors duration-300 cursor-pointer"
                >
                  <div className="w-8 h-px bg-[#C9A84C] mb-5 group-hover:w-14 transition-all duration-300" />
                  <p className="font-['Archivo',sans-serif] font-bold text-lg text-[#0a0a0a] mb-2">{label}</p>
                  <p className="text-sm text-[#71717a] leading-relaxed">{desc}</p>
                  <p className="mt-5 text-xs tracking-widest uppercase text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Album →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── OWNER SPOTLIGHT ── */}
        <section ref={addRef} className="reveal py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0">
              <Image
                src="/images/owner/clement.jpg"
                alt="Clement Akuamoh-Boateng — Edit_ByClem"
                fill
                className="object-cover grayscale"
                style={{ objectPosition: "50% 15%" }}
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C9A84C]/30 -z-10" />
            </div>
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-4">Behind the Lens</p>
              <h2 className="font-['Archivo',sans-serif] font-black text-4xl sm:text-5xl text-[#0a0a0a] uppercase leading-none mb-6">
                Clement<br />Akuamoh-<br />Boateng
              </h2>
              <p className="text-[#52525b] text-base leading-relaxed mb-8 max-w-md">
                A photographer with an eye for the in-between moments — the raw, the real, and the beautiful. From graduation stages to wedding aisles, every session is a story waiting to be told.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                  <span className="text-sm text-[#52525b]">New Jersey–based photographer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                  <span className="text-sm text-[#52525b]">Graduation · Wedding · Artists · Fashion</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                  <span className="text-sm text-[#52525b]">Available for booking year-round</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0a0a0a] transition-all duration-300 cursor-pointer"
                >
                  Full Story
                </Link>
                <a
                  href="https://www.instagram.com/edit_byclem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#52525b] hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  <InstagramIcon size={17} /> @edit_byclem
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section ref={addRef} className="reveal bg-[#C9A84C] py-20 px-6 text-center">
          <p className="text-[#0a0a0a]/60 text-xs tracking-[0.35em] uppercase mb-3">Let&apos;s create together</p>
          <h2 className="font-['Archivo',sans-serif] font-black text-4xl sm:text-5xl text-[#0a0a0a] uppercase mb-8">
            Ready to book your session?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-[#fafafa] px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </section>

      </div>{/* end white sections */}
    </>
  );
}
