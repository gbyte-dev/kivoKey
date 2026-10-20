"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu } from "lucide-react";
import ServicesMegaMenu from "./ServicesMegaMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">

            {/* Side padding in % to match the Figma (logo 5.5% from the left, button 2.4% from the right) */}
            <div className="flex items-center justify-between h-16 lg:h-[66px] px-4 sm:px-6 lg:pl-[5.5%] lg:pr-[2.4%]">

                {/* --- 1. LOGO --- */}
                <Link href="/" aria-label="KivoKey home" className="shrink-0">
                    <Image
                        src="/images/kivokey-logo.png"
                        alt="KivoKey"
                        width={820}
                        height={216}
                        loading="eager"
                        className="h-10 lg:h-12 w-auto"
                    />
                </Link>

                {/* --- 2. DESKTOP NAVIGATION --- */}
                <nav className="hidden lg:flex items-center h-full">

                    {/* Services with Hover Mega-Menu */}
                    <ServicesMegaMenu />

                    {/* Locations */}
                    <Link
                        href="/locations"
                        className="ml-9 text-[15px] font-medium text-gray-900 hover:text-[#00A9FE] transition-colors"
                    >
                        Locations
                    </Link>

                    {/* Phone Call Link */}
                    <a
                        href="tel:18001234567"
                        className="ml-14 flex items-center gap-3 text-[15px] text-gray-900 hover:text-[#00A9FE] transition-colors"
                    >
                        <Phone className="w-6 h-6 fill-[#00A9FE] text-[#00A9FE]" strokeWidth={0} />
                        <span>1 (800) 123-4567</span>
                    </a>

                    {/* Yellow Action Button */}
                    <Link
                        href="/quote"
                        className="ml-8 inline-flex items-center justify-center h-[41px] px-6 rounded-lg bg-[#FEE802] hover:bg-[#F2DC00] text-[#02020E] text-[15px] font-bold whitespace-nowrap transition-transform active:scale-95"
                    >
                        Get quote + schedule
                    </Link>

                </nav>

                {/* --- 3. MOBILE MENU BUTTON --- */}
                <div className="flex lg:hidden items-center gap-3">
                    <Link
                        href="/quote"
                        className="bg-[#FEE802] text-[#02020E] font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-sm"
                    >
                        Get quote
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
                        aria-label="Open menu"
                        aria-controls="mobile-menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

            </div>

            {/* --- 4. MOBILE FULL-SCREEN MENU --- */}
            <MobileMenu open={mobileMenuOpen} onClose={closeMobile} />
        </header>
    );
}
