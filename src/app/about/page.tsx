"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

export default function AboutPage() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* B&W portrait */}
          <div ref={addRef} className="reveal relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <Image
                src="/images/owner/clement.jpg"
                alt="Clement Akuamoh-Boateng — Edit_ByClem photographer"
                fill
                className="object-cover grayscale"
                style={{ objectPosition: "50% 15%" }}
                priority
              />
              {/* Gold frame accent */}
              <div className="absolute -bottom-5 -right-5 w-[calc(100%-20px)] h-[calc(100%-20px)] border border-[#C9A84C]/40 pointer-events-none" />
            </div>
            {/* Floating stat */}
            <div className="absolute top-8 -right-6 hidden lg:block bg-[#C9A84C] px-6 py-4 text-[#0a0a0a]">
              <p className="font-['Archivo',sans-serif] font-black text-3xl">4+</p>
              <p className="text-xs tracking-widest uppercase font-semibold">Albums</p>
            </div>
          </div>

          {/* Bio */}
          <div ref={addRef} className="reveal" style={{ transitionDelay: "150ms" }}>
            <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-4">The Photographer</p>
            <h1 className="font-['Archivo',sans-serif] font-black text-5xl sm:text-6xl uppercase leading-none text-[#fafafa] mb-6">
              Clement<br />Akuamoh-<br />Boateng
            </h1>
            <div className="w-16 h-px bg-[#C9A84C] mb-8" />
            <p className="text-[#a1a1aa] text-base leading-relaxed mb-5">
              Clement is a New Jersey–based photographer and visual storyteller who believes every moment — no matter how brief — deserves to be captured with care. Trading generic snapshots for intentional frames, he brings a cinematic eye to every shoot.
            </p>
            <p className="text-[#a1a1aa] text-base leading-relaxed mb-5">
              Whether it&apos;s the profile of a graduating student against a dark studio backdrop, a couple&apos;s first dance, a performer losing themselves on stage, or a fashion editorial in the middle of a mall — Clement finds the soul in every scene.
            </p>
            <p className="text-[#a1a1aa] text-base leading-relaxed mb-10">
              Under his brand <span className="text-[#C9A84C] font-medium">Edit_ByClem</span>, he delivers images and films that clients keep coming back to, year after year.
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-4">
              <a href="mailto:Caboateng98@gmail.com" className="flex items-center gap-3 text-sm text-[#a1a1aa] hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer">
                <Mail size={16} className="text-[#C9A84C]" /> Caboateng98@gmail.com
              </a>
              <a href="tel:7328961119" className="flex items-center gap-3 text-sm text-[#a1a1aa] hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer">
                <Phone size={16} className="text-[#C9A84C]" /> 732-896-1119
              </a>
              <a href="https://www.instagram.com/edit_byclem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#a1a1aa] hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer">
                <InstagramIcon size={16} className="text-[#C9A84C]" /> @edit_byclem
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT I SHOOT ── */}
      <section ref={addRef} className="reveal bg-[#0f0f0f] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-3 text-center">Specialties</p>
          <h2 className="font-['Archivo',sans-serif] font-bold text-3xl sm:text-4xl text-[#fafafa] text-center mb-14">
            What I Shoot
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                num: "01", title: "Graduation",
                desc: "Senior portraits, cap-and-gown sessions, and post-ceremony celebrations. Each shot is designed to honor your achievement with the weight it deserves.",
              },
              {
                num: "02", title: "Wedding",
                desc: "From the first look to the last dance, I document weddings as they actually feel — with real emotion, stunning video, and photos that last generations.",
              },
              {
                num: "03", title: "Artists",
                desc: "Performers, musicians, comedians, and creatives on stage or in studio. Capturing the energy and passion that makes an artist unforgettable.",
              },
              {
                num: "04", title: "Fashion",
                desc: "Editorial portraits and lifestyle fashion shoots. Clean, deliberate compositions that showcase the subject and the story behind the style.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="border border-[#27272a] p-8 hover:border-[#C9A84C]/40 transition-colors duration-300">
                <p className="font-['Archivo',sans-serif] font-black text-5xl text-[#1a1a1a] mb-2">{num}</p>
                <p className="font-['Archivo',sans-serif] font-bold text-xl text-[#fafafa] mb-3">{title}</p>
                <p className="text-sm text-[#71717a] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={addRef} className="reveal py-24 px-6 text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-3">Let&apos;s work together</p>
        <h2 className="font-['Archivo',sans-serif] font-black text-4xl sm:text-5xl uppercase text-[#fafafa] mb-8">
          Your story deserves<br />to be told.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0a0a0a] px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-[#b8962f] transition-colors cursor-pointer"
          >
            Book a Session <ArrowRight size={16} />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 border border-[#27272a] text-[#a1a1aa] px-8 py-3.5 text-sm tracking-widest uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all cursor-pointer"
          >
            View Portfolio
          </Link>
        </div>
      </section>
    </>
  );
}
