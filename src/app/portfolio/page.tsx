"use client";

import Image from "next/image";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Play, X, ExternalLink } from "lucide-react";
import Lightbox from "@/components/Lightbox";

type Category = "all" | "graduation" | "wedding" | "artists" | "fashion" | "events";

const photos: { src: string; alt: string; category: Exclude<Category, "all"> }[] = [
  { src: "/images/graduation/grad-1.jpg", alt: "Graduation portrait 2025", category: "graduation" },
  { src: "/images/graduation/grad-2.jpg", alt: "Graduation Class of 2025", category: "graduation" },
  { src: "/images/graduation/grad-3.jpg", alt: "Graduation celebration", category: "graduation" },
  { src: "/images/artists/artist-1.jpg", alt: "Artist performing on stage", category: "artists" },
  { src: "/images/fashion/fashion-1.jpg", alt: "Fashion editorial portrait", category: "fashion" },
  { src: "/images/fashion/fashion-2.jpg", alt: "Runway — crochet and pink", category: "fashion" },
  { src: "/images/fashion/fashion-3.jpg", alt: "Runway — brown crochet shirt", category: "fashion" },
  { src: "/images/fashion/fashion-4.jpg", alt: "Runway — brown crochet portrait", category: "fashion" },
  { src: "/images/fashion/fashion-5.jpg", alt: "Runway — green African dress", category: "fashion" },
  { src: "/images/fashion/fashion-6.jpg", alt: "Runway — African print jumpsuit", category: "fashion" },
  { src: "/images/fashion/fashion-7.jpg", alt: "Runway — dashiki print dress", category: "fashion" },
  { src: "/images/fashion/fashion-8.jpg", alt: "Cultural event — red and black", category: "events" },
  { src: "/images/fashion/fashion-9.jpg", alt: "Cultural event — group portrait", category: "events" },
  { src: "/images/fashion/fashion-10.jpg", alt: "Cultural event — couple portrait", category: "events" },
];

const videos: { src: string; poster?: string; label: string }[] = [
  { src: "/videos/wedding-2.mov", label: "Wedding Film I" },
  { src: "/videos/wedding-3.mov", label: "Wedding Film II" },
  // { src: "/videos/wedding-1.mov", label: "Wedding Film III" }, // Add when desibanks.mov is ready
];

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "graduation", label: "Graduation" },
  { id: "wedding", label: "Wedding" },
  { id: "artists", label: "Artists" },
  { id: "fashion", label: "Fashion" },
  { id: "events", label: "Events" },
];

function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("category") as Category) || "all";

  const [active, setActive] = useState<Category>(initialCat);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const cat = (searchParams.get("category") as Category) || "all";
    setActive(cat);
  }, [searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [active]);

  const addRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const filtered = active === "wedding"
    ? []
    : active === "all"
    ? photos
    : photos.filter((p) => p.category === active);

  const showVideos = active === "all" || active === "wedding";

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-3">The Work</p>
        <h1 className="font-['Archivo',sans-serif] font-black text-5xl sm:text-6xl uppercase text-[#fafafa] mb-4">
          Portfolio
        </h1>
        <p className="text-[#a1a1aa] max-w-md mx-auto text-sm leading-relaxed">
          Graduating moments, wedding memories, artist sessions, and editorial fashion — every album has a story.
        </p>
      </section>

      {/* Nana Birthday album card */}
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <a
          href="https://clemedits.pixieset.com/nanabirthday/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden cursor-pointer"
        >
          {/* Photo */}
          <div className="relative w-full h-64 sm:h-80 overflow-hidden">
            <Image
              src="/images/events/nana-birthday.jpg"
              alt="Nana Birthday — Full Album on Pixieset"
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              style={{ objectPosition: "50% 15%" }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
          </div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
            <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C]">Full Gallery Available</p>
            <p className="font-['Archivo',sans-serif] font-black text-3xl sm:text-4xl uppercase text-[#fafafa] leading-tight">
              Nana Birthday
            </p>
            <div className="flex items-center gap-2 mt-2 border border-[#C9A84C] px-5 py-2.5 group-hover:bg-[#C9A84C] transition-colors duration-300">
              <ExternalLink size={14} className="text-[#C9A84C] group-hover:text-[#0a0a0a] transition-colors duration-300" />
              <span className="text-xs tracking-widest uppercase text-[#C9A84C] group-hover:text-[#0a0a0a] transition-colors duration-300 font-semibold">
                View Full Album on Pixieset
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* Category filter */}
      <nav className="sticky top-16 z-30 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#27272a] px-6 py-4">
        <ul className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {categories.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => setActive(id)}
                className={`px-5 py-2 text-xs tracking-widest uppercase cursor-pointer transition-all duration-300 ${
                  active === id
                    ? "bg-[#C9A84C] text-[#0a0a0a] font-semibold"
                    : "border border-[#27272a] text-[#a1a1aa] hover:border-[#C9A84C] hover:text-[#fafafa]"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-12">

        {/* Wedding videos */}
        {showVideos && (
          <div className="mb-14">
            {active === "all" && (
              <>
                <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-2">Wedding Films</p>
                <h2 className="font-['Archivo',sans-serif] font-bold text-2xl text-[#fafafa] mb-8">Wedding</h2>
              </>
            )}
            {active === "wedding" && (
              <p className="font-['Archivo',sans-serif] font-bold text-2xl text-[#fafafa] mb-8">Wedding Films</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.map((v, i) => (
                <div
                  key={i}
                  ref={addRef as React.Ref<HTMLDivElement>}
                  className="reveal group relative aspect-video bg-[#1a1a1a] overflow-hidden cursor-pointer"
                  onClick={() => setVideoModal(v.src)}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Preview thumbnail using video element */}
                  <video
                    src={v.src}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[#C9A84C]/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play size={24} className="text-[#0a0a0a] ml-1" fill="currentColor" />
                    </div>
                    <p className="text-white font-['Archivo',sans-serif] font-semibold tracking-wider text-sm">{v.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {active === "wedding" && videos.length === 0 && (
              <p className="text-[#52525b] text-center py-16 text-sm">Wedding photos coming soon.</p>
            )}

            {active === "all" && <div className="mt-12 border-t border-[#1a1a1a]" />}
          </div>
        )}

        {/* Photo masonry grid */}
        {filtered.length > 0 && (
          <>
            {active === "all" && (
              <p className="font-['Archivo',sans-serif] font-bold text-2xl text-[#fafafa] mb-8">Photography</p>
            )}
            <div className="masonry-grid">
              {filtered.map((photo, i) => (
                <div
                  key={photo.src}
                  ref={addRef as React.Ref<HTMLDivElement>}
                  className="masonry-item reveal group relative overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(i)}
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-4">
                    <p className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transition-transform">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state for non-wedding filtered category with no photos */}
        {filtered.length === 0 && !showVideos && (
          <div className="text-center py-24">
            <p className="text-[#52525b] text-sm">Photos coming soon.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={filtered.map((p) => ({ src: p.src, alt: p.alt }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % filtered.length)}
        />
      )}

      {/* Video modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setVideoModal(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2 cursor-pointer"
            onClick={() => setVideoModal(null)}
            aria-label="Close video"
          >
            <X size={28} />
          </button>
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoModal}
              controls
              autoPlay
              className="w-full h-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-[#a1a1aa] text-sm">Loading portfolio…</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
