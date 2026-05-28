"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // If no Web3Forms key is set yet, fall back to mailto
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      const name    = data.get("name") as string;
      const email   = data.get("email") as string;
      const phone   = data.get("phone") as string;
      const type    = data.get("type") as string;
      const message = data.get("message") as string;
      const subject = encodeURIComponent(`Booking Inquiry — ${type || "Photography Session"}`);
      const body    = encodeURIComponent(
        `Hi Clement,\n\nMy name is ${name}.\n\nSession type: ${type}\nPhone: ${phone || "N/A"}\nReply to: ${email}\n\n${message}`
      );
      window.location.href = `mailto:Caboateng98@gmail.com?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    // Web3Forms — sends straight to Caboateng98@gmail.com
    try {
      const payload = {
        access_key: accessKey,
        subject: `Edit_ByClem Booking — ${data.get("type") || "New Inquiry"}`,
        from_name: data.get("name") as string,
        email: data.get("email") as string,
        phone: data.get("phone") as string,
        session_type: data.get("type") as string,
        message: data.get("message") as string,
        botcheck: "",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        throw new Error(json.message || "Something went wrong");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-3">Get in Touch</p>
        <h1 className="font-['Archivo',sans-serif] font-black text-5xl sm:text-6xl uppercase text-[#fafafa] mb-4">
          Book a Session
        </h1>
        <p className="text-[#a1a1aa] max-w-md mx-auto text-sm leading-relaxed">
          Ready to capture your moment? Fill out the form and Clement will reply directly to your email.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Contact info sidebar */}
        <div ref={addRef} className="reveal lg:col-span-2 flex flex-col gap-8">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-6">Direct Contact</p>
            <div className="flex flex-col gap-6">
              <a href="mailto:Caboateng98@gmail.com" className="group flex items-start gap-4 cursor-pointer">
                <div className="mt-0.5 w-10 h-10 flex items-center justify-center border border-[#27272a] group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/10 transition-all duration-300">
                  <Mail size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs text-[#52525b] tracking-widest uppercase mb-1">Email</p>
                  <p className="text-[#fafafa] text-sm group-hover:text-[#C9A84C] transition-colors duration-200">
                    Caboateng98@gmail.com
                  </p>
                </div>
              </a>

              <a href="tel:7328961119" className="group flex items-start gap-4 cursor-pointer">
                <div className="mt-0.5 w-10 h-10 flex items-center justify-center border border-[#27272a] group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/10 transition-all duration-300">
                  <Phone size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs text-[#52525b] tracking-widest uppercase mb-1">Phone</p>
                  <p className="text-[#fafafa] text-sm group-hover:text-[#C9A84C] transition-colors duration-200">
                    732-896-1119
                  </p>
                </div>
              </a>

              <a href="https://www.instagram.com/edit_byclem" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 cursor-pointer">
                <div className="mt-0.5 w-10 h-10 flex items-center justify-center border border-[#27272a] group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/10 transition-all duration-300">
                  <InstagramIcon size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs text-[#52525b] tracking-widest uppercase mb-1">Instagram</p>
                  <p className="text-[#fafafa] text-sm group-hover:text-[#C9A84C] transition-colors duration-200">
                    @edit_byclem
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Session types */}
          <div className="border border-[#27272a] p-6">
            <p className="text-xs tracking-[0.35em] uppercase text-[#C9A84C] mb-5">Session Types</p>
            <ul className="flex flex-col gap-3">
              {["Graduation Portraits", "Wedding Photography & Film", "Artist / Performer", "Fashion Editorial"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                  <div className="w-1 h-1 rounded-full bg-[#C9A84C] flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Note about email delivery */}
          <p className="text-xs text-[#52525b] leading-relaxed">
            Messages submitted here go directly to{" "}
            <span className="text-[#C9A84C]">Caboateng98@gmail.com</span>. Clement typically responds within 24 hours.
          </p>
        </div>

        {/* Form */}
        <div ref={addRef} className="reveal lg:col-span-3" style={{ transitionDelay: "100ms" }}>
          {status === "sent" ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-20 border border-[#C9A84C]/30 bg-[#C9A84C]/5">
              <CheckCircle size={52} className="text-[#C9A84C]" />
              <div>
                <p className="font-['Archivo',sans-serif] font-bold text-2xl text-[#fafafa] mb-2">Message Sent!</p>
                <p className="text-[#a1a1aa] text-sm max-w-xs">
                  Clement will be in touch at your email soon. Check your inbox!
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs tracking-widest uppercase text-[#C9A84C] hover:underline cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Hidden honeypot for spam protection */}
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase text-[#52525b]" htmlFor="name">
                    Full Name <span className="text-[#C9A84C]">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    placeholder="Your name"
                    className="bg-[#1a1a1a] border border-[#27272a] focus:border-[#C9A84C] text-[#fafafa] placeholder-[#52525b] px-4 py-3 text-sm outline-none transition-colors duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase text-[#52525b]" htmlFor="email">
                    Your Email <span className="text-[#C9A84C]">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    placeholder="your@email.com"
                    className="bg-[#1a1a1a] border border-[#27272a] focus:border-[#C9A84C] text-[#fafafa] placeholder-[#52525b] px-4 py-3 text-sm outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase text-[#52525b]" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone" name="phone" type="tel"
                    placeholder="Your phone number"
                    className="bg-[#1a1a1a] border border-[#27272a] focus:border-[#C9A84C] text-[#fafafa] placeholder-[#52525b] px-4 py-3 text-sm outline-none transition-colors duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase text-[#52525b]" htmlFor="type">
                    Session Type <span className="text-[#C9A84C]">*</span>
                  </label>
                  <select
                    id="type" name="type" required
                    className="bg-[#1a1a1a] border border-[#27272a] focus:border-[#C9A84C] text-[#fafafa] px-4 py-3 text-sm outline-none transition-colors duration-200 cursor-pointer appearance-none"
                  >
                    <option value="" className="bg-[#1a1a1a]">Select type…</option>
                    <option value="Graduation" className="bg-[#1a1a1a]">Graduation</option>
                    <option value="Wedding" className="bg-[#1a1a1a]">Wedding</option>
                    <option value="Artists / Performers" className="bg-[#1a1a1a]">Artists / Performers</option>
                    <option value="Fashion" className="bg-[#1a1a1a]">Fashion</option>
                    <option value="Other" className="bg-[#1a1a1a]">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-[#52525b]" htmlFor="message">
                  Tell Me About Your Event <span className="text-[#C9A84C]">*</span>
                </label>
                <textarea
                  id="message" name="message" required rows={6}
                  placeholder="Date, location, vibe, and anything else I should know…"
                  className="bg-[#1a1a1a] border border-[#27272a] focus:border-[#C9A84C] text-[#fafafa] placeholder-[#52525b] px-4 py-3 text-sm outline-none transition-colors duration-200 resize-none"
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <div className="flex items-center gap-3 bg-red-900/20 border border-red-500/30 px-4 py-3">
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{errorMsg || "Something went wrong. Please try again or email directly."}</p>
                </div>
              )}

              <div className="flex items-center gap-4 flex-wrap">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0a0a0a] px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#b8962f] transition-colors duration-300 cursor-pointer disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <><span className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={16} /> Send to Clement</>
                  )}
                </button>
                <p className="text-xs text-[#52525b]">
                  Goes directly to <span className="text-[#a1a1aa]">Caboateng98@gmail.com</span>
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
