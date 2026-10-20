"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { serviceHref, serviceLinks } from "@/lib/service-links";

// Shared menu data (also used by the mobile menu)
export const servicesMenu = {
    primary: {
        title: "Auto Key Services",
        href: "/services",
        links: serviceLinks.map(({ slug, title }) => ({ label: title, href: serviceHref(slug) })),
    },
    feature: {
        title: "On-Site Key Cutting",
        href: "/services",
        image: "/images/step-2-quote.jpg",
        description: "Advanced mobile key cutting and electronic diagnostics at your doorstep.",
    },
    secondary: [
        {
            title: "Mobile Auto Key Repair",
            href: "/services",
            description: "We’ll come to your home, office or wherever you are!",
        },
        {
            title: "Commercial & Fleet",
            href: "/#contact",
            description: "Personalized fleet key management for commercial vehicles.",
        },
    ],
};

// Shared pieces (also used by the mobile menu)
export function MenuHeading({ href, onClick, children }: { href: string; onClick?: () => void; children: ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#222] hover:text-[#0070D0] transition-colors"
        >
            {children}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={3} />
        </Link>
    );
}

// Featured service photo with the yellow accent strokes at its top-right corner
export function FeatureImage({ className = "", imageClassName = "" }: { className?: string; imageClassName?: string }) {
    return (
        <div className={`relative ${className}`}>
            <Image
                src={servicesMenu.feature.image}
                alt=""
                width={881}
                height={412}
                sizes="(min-width: 1024px) 215px, 100vw"
                className={`w-full rounded-lg object-cover ${imageClassName}`}
            />
            <svg
                aria-hidden="true"
                viewBox="0 0 32 32"
                className="absolute -top-6 -right-8 w-8 h-8"
                fill="none"
                stroke="#FED402"
                strokeWidth={3}
                strokeLinecap="round"
            >
                <path d="M8 18 6 9M12 21l9-8M14 27l10-2" />
            </svg>
        </div>
    );
}

export default function ServicesMegaMenu() {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    const { primary, feature, secondary } = servicesMenu;

    return (
        // Not positioned on purpose: the panel is positioned against the (sticky) header,
        // so it spans under the whole header while still being inside this hover area.
        <div
            className="h-full flex items-center"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={close}
            onKeyDown={(e) => e.key === "Escape" && close()}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
            }}
        >
            <button
                type="button"
                aria-expanded={open}
                aria-controls="services-mega-menu"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 text-[15px] font-medium text-gray-900 hover:text-[#00A9FE] transition-colors"
            >
                Services
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Mega Dropdown Panel */}
            <div
                id="services-mega-menu"
                className={`absolute left-1/2 top-full -translate-x-1/2 w-250 transition-all duration-200 ease-out ${open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1 pointer-events-none"}`}
            >
                <div className="grid grid-cols-3 overflow-hidden rounded-b-lg bg-white text-[#222] shadow-[0_16px_32px_rgba(0,0,0,0.14)]">

                    {/* Column 1: service links on a gray background */}
                    <div className="bg-[#F4F4F4] px-15 pt-8 pb-10">
                        <MenuHeading href={primary.href} onClick={close}>{primary.title}</MenuHeading>
                        <ul className="mt-6 space-y-5">
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

                    {/* Column 2: featured service with image */}
                    <div className="px-15 pt-8 pb-10">
                        <MenuHeading href={feature.href} onClick={close}>{feature.title}</MenuHeading>
                        <FeatureImage className="mt-5" imageClassName="h-[136px]" />
                        <p className="mt-7 text-sm leading-relaxed">{feature.description}</p>
                    </div>

                    {/* Column 3: two text sections with a divider */}
                    <div className="px-15 pt-8 pb-10">
                        {secondary.map((item, i) => (
                            <div key={item.href} className={i > 0 ? "mt-6 pt-6 border-t border-gray-200" : ""}>
                                <MenuHeading href={item.href} onClick={close}>{item.title}</MenuHeading>
                                <p className="mt-5 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
