"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!images[currentIndex]) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 z-10 text-white/70 hover:text-white p-2 cursor-pointer transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {/* Counter */}
      <p className="absolute top-5 left-5 text-white/50 text-sm tracking-widest">
        {currentIndex + 1} / {images.length}
      </p>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-3 md:left-6 z-10 text-white/60 hover:text-white p-3 cursor-pointer transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[88vh] w-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          width={1200}
          height={900}
          className="object-contain max-h-[88vh] w-auto mx-auto"
          priority
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-3 md:right-6 z-10 text-white/60 hover:text-white p-3 cursor-pointer transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <ChevronRight size={36} />
        </button>
      )}
    </div>
  );
}
