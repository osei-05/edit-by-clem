import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-[#27272a] bg-[#0a0a0a] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-['Archivo',sans-serif] text-2xl font-bold tracking-widest uppercase text-[#fafafa] mb-3">
              Edit_ByClem
            </p>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs">
              Professional photography capturing your most important moments — with intention, depth, and style.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs tracking-widest uppercase text-[#C9A84C] mb-5">Navigate</p>
            <ul className="flex flex-col gap-3">
              {["/", "/portfolio", "/about", "/contact"].map((href, i) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200"
                  >
                    {["Home", "Portfolio", "About", "Contact"][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-widest uppercase text-[#C9A84C] mb-5">Get in Touch</p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:Caboateng98@gmail.com"
                  className="flex items-center gap-3 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200"
                >
                  <Mail size={15} className="text-[#C9A84C]" />
                  Caboateng98@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:7328961119"
                  className="flex items-center gap-3 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200"
                >
                  <Phone size={15} className="text-[#C9A84C]" />
                  732-896-1119
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/edit_byclem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200"
                >
                  <InstagramIcon size={15} className="text-[#C9A84C]" />
                  @edit_byclem
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#52525b]">
            &copy; {new Date().getFullYear()} Edit_ByClem · Clement Akuamoh-Boateng. All rights reserved.
          </p>
          <a
            href="https://clemedits.pixieset.com/nanabirthday/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#52525b] hover:text-[#C9A84C] transition-colors duration-200 tracking-wider"
          >
            View Full Pixieset Portfolio →
          </a>
        </div>
      </div>
    </footer>
  );
}
