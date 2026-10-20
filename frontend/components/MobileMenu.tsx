"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Phone, X } from "lucide-react";
import { FeatureImage, MenuHeading, servicesMenu } from "./ServicesMegaMenu";

const bottomLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQs", href: "#faqs" },
    { label: "About Us", href: "#about" },
    { label: "Contact Us", href: "#contact" },
];

type MobileMenuProps = {
    open: boolean;
    onClose: () => void;
};

// Full-screen mobile menu (styled after autoglassnow.com): slides in from the right,
// "Services" opens a second panel with the same content as the desktop mega menu.
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
    const [servicesOpen, setServicesOpen] = useState(false);
    const { primary, feature, secondary } = servicesMenu;

    const close = useCallback(() => {
        setServicesOpen(false);
        onClose();
    }, [onClose]);

    // While open: lock page scroll, close on Esc, and close if the screen grows to desktop width
    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
        const desktop = window.matchMedia("(min-width: 1024px)");
        const onResize = () => desktop.matches && close();
        window.addEventListener("keydown", onKey);
        desktop.addEventListener("change", onResize);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            desktop.removeEventListener("change", onResize);
        };
    }, [open, close]);

    const rowClass = "flex w-full items-center py-5 text-[17px] font-semibold text-[#222]";

    return (
        <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            inert={!open}
            className={`fixed inset-0 z-60 flex flex-col bg-white lg:hidden transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        >

            {/* Top bar: logo + close */}
            <div className="flex items-center justify-between h-16 shrink-0 px-4 sm:px-6">
                <Link href="/" onClick={close} aria-label="KivoKey home">
                    <Image src="/images/kivokey-logo.png" alt="KivoKey" width={820} height={216} className="h-10 w-auto" />
                </Link>
                <button type="button" onClick={close} aria-label="Close menu" className="p-2 -mr-2 text-[#222]">
                    <X className="w-7 h-7" strokeWidth={1.75} />
                </button>
            </div>

            <div className="relative flex-1 overflow-hidden">

                {/* --- Main panel --- */}
                <div
                    inert={servicesOpen}
                    className={`absolute inset-0 overflow-y-auto px-6 pb-10 transition-transform duration-300 ease-out ${servicesOpen ? "-translate-x-full" : "translate-x-0"}`}
                >
                    <ul className="mt-4">
                        <li className="border-b border-gray-200">
                            <button type="button" onClick={() => setServicesOpen(true)} className={`${rowClass} justify-between`}>
                                Services
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </li>
                        <li className="border-b border-gray-200">
                            <Link href="/locations" onClick={close} className={`${rowClass} gap-2`}>
                                <MapPin className="w-5 h-5" />
                                Locations
                            </Link>
                        </li>
                        <li className="border-b border-gray-200">
                            <a href="tel:18001234567" className={`${rowClass} gap-2`}>
                                <Phone className="w-5 h-5" />
                                1 (800) 123-4567
                            </a>
                        </li>
                    </ul>

                    <Link
                        href="/quote"
                        onClick={close}
                        className="mt-14 flex h-12 w-full items-center justify-center rounded-full bg-[#FEE802] hover:bg-[#F2DC00] text-base font-bold text-[#02020E] transition-colors"
                    >
                        Get quote + schedule
                    </Link>

                    <ul className="mt-10 grid grid-cols-2 gap-y-8 text-sm uppercase tracking-wide text-[#222]">
                        {bottomLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} onClick={close} className="hover:text-[#00A9FE] transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- Services submenu panel --- */}
                <div
                    inert={!servicesOpen}
                    className={`absolute inset-0 overflow-y-auto pb-12 transition-transform duration-300 ease-out ${servicesOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="relative px-16">
                        <button
                            type="button"
                            onClick={() => setServicesOpen(false)}
                            aria-label="Back to menu"
                            className="absolute left-5 top-5 p-1 text-[#222]"
                        >
                            <ChevronLeft className="w-6 h-6" strokeWidth={1.75} />
                        </button>
                        <p className="mt-1 py-5 border-b border-gray-200 text-[17px] font-semibold text-[#222]">Services</p>

                        {/* Auto key services links */}
                        <div className="pt-8">
                            <MenuHeading href={primary.href} onClick={close}>{primary.title}</MenuHeading>
                            <ul className="mt-5 space-y-5">
                                {primary.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={close}
                                            className="block text-[15px] font-semibold leading-snug text-[#0070D0] hover:underline"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Featured service with image */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <MenuHeading href={feature.href} onClick={close}>{feature.title}</MenuHeading>
                            <FeatureImage className="mt-6" imageClassName="aspect-262/166" />
                            <p className="mt-6 text-sm leading-relaxed text-[#222]">{feature.description}</p>
                        </div>

                        {/* Mobile repair + Commercial & fleet */}
                        {secondary.map((item) => (
                            <div key={item.href} className="mt-8 pt-8 border-t border-gray-200">
                                <MenuHeading href={item.href} onClick={close}>{item.title}</MenuHeading>
                                <p className="mt-4 text-sm leading-relaxed text-[#222]">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
