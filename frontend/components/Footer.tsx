import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const linkColumns = [
    {
        title: 'Services',
        links: [
            { label: 'Replacement Keys', href: '/services/car-key-replacement' },
            { label: 'Key Fob Programming', href: '/services/car-key-replacement' },
            { label: 'All Keys Lost', href: '/services/all-keys-lost' },
            { label: 'Spare Keys', href: '/services/spare-car-keys' },
            { label: 'Mobile Car Key Service', href: '/services' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '#about' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Our Technicians', href: '#technicians' },
            { label: 'Locations', href: '/locations' },
            { label: 'Contact Us', href: '#contact' },
        ],
    },
    {
        title: 'Quick Links',
        links: [
            { label: 'Book a Service', href: '#quote' },
            { label: 'Get a Quote', href: '#quote' },
            { label: 'FAQs', href: '#faqs' },
            { label: 'Join the Team', href: '/join-the-team' },
        ],
    },
];

const socials = [
    { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebook },
    { label: 'YouTube', href: 'https://youtube.com', icon: FaYoutube },
    { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedin },
];

const legalLinks = [
    { label: 'Terms & Conditions', href: '#terms' },
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Web Accessibility', href: '#accessibility' },
    { label: 'Site Map', href: '#sitemap' },
];

// Halftone strip measured from the Figma: [dot radius px, opacity] per row, top -> bottom.
// Rows are staggered (every other row shifted by half the dot spacing).
const halftoneRows: [number, number][] = [
    [1.7, 1], [1.93, 0.92], [2.13, 0.88], [2.38, 0.89], [2.43, 0.85], [2.7, 0.89],
    [2.78, 0.74], [2.95, 0.62], [2.83, 0.53], [2.75, 0.35], [2.75, 0.29], [2.58, 0.3],
    [1.05, 0.27], [1.3, 0.24], [1.05, 0.22], [0.85, 0.22],
];
const DOT_SPACING = 13.43;
const ROW_SPACING = 6.7;
const FIRST_ROW_Y = 10;
const HALFTONE_HEIGHT = 118;

function Halftone() {
    return (
        <svg aria-hidden="true" className="block w-full" height={HALFTONE_HEIGHT}>
            <defs>
                <pattern id="footer-halftone" width={DOT_SPACING} height={HALFTONE_HEIGHT} patternUnits="userSpaceOnUse">
                    {halftoneRows.map(([r, opacity], i) => {
                        const cy = FIRST_ROW_Y + i * ROW_SPACING;
                        // Even rows sit on the tile edges (halves join across tiles), odd rows in the middle
                        const xs = i % 2 === 0 ? [0, DOT_SPACING] : [DOT_SPACING / 2];
                        return xs.map((cx) => (
                            <circle key={`${i}-${cx}`} cx={cx} cy={cy} r={r} fill="#0BB0FD" fillOpacity={opacity} />
                        ));
                    })}
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-halftone)" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-white text-[#00013D]">

            {/* Top Halftone Dot Strip */}
            <Halftone />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-4 pb-8 lg:pb-10">

                {/* Main Grid: 2 cols on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.24fr_1fr_1.18fr_1.48fr] lg:gap-x-0">

                    {/* Link Columns: SERVICES / COMPANY / QUICK LINKS */}
                    {linkColumns.map((column, i) => (
                        <div key={column.title} className={`lg:pt-4 ${i === 0 ? 'lg:pl-2' : ''}`}>
                            <h4 className="text-sm lg:text-[15px] font-extrabold tracking-wide uppercase text-[#00ABFF]">
                                {column.title}
                            </h4>
                            <ul className="mt-4 space-y-3 text-[15px] lg:text-base">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="hover:text-[#00ABFF] transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Brand Block: logo, phone, CTA, socials (centered) */}
                    <div className="col-span-2 lg:col-span-1 flex flex-col items-center text-center">

                        <Link href="/" aria-label="KivoKey home">
                            <Image
                                src="/images/kivokey-logo.png"
                                alt="KivoKey"
                                width={820}
                                height={216}
                                className="w-52 sm:w-60 lg:w-72 max-w-full h-auto"
                            />
                        </Link>

                        <a
                            href="tel:18001234567"
                            className="mt-1 inline-flex items-center gap-3 text-lg lg:text-xl font-bold text-[#000439] hover:text-[#00A9FE] transition-colors"
                        >
                            <Phone className="w-5 h-5 lg:w-6 lg:h-6 fill-[#00A9FE] text-[#00A9FE]" strokeWidth={0} />
                            <span>1 (800) 123-4567</span>
                        </a>

                        <Link
                            href="#quote"
                            className="mt-4 flex items-center justify-center w-full max-w-70 h-12 rounded-full bg-[#FED402] hover:bg-[#F2C900] text-[#040629] text-base lg:text-lg font-bold transition-colors active:scale-95"
                        >
                            Get Quote + Schedule
                        </Link>

                        <div className="mt-5 flex items-center gap-8">
                            {socials.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="text-[#000435] hover:text-[#00A9FE] transition-colors"
                                >
                                    <Icon className="w-7 h-7" />
                                </a>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Divider & Legal Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-[#D3DAE8] flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-[#00084C]">
                    <p className="text-center lg:text-left">
                        © 2026 KivoKey. All rights reserved.
                    </p>

                    <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 lg:gap-x-6 gap-y-2">
                        {legalLinks.map((link, i) => (
                            <Fragment key={link.label}>
                                {i > 0 && <span aria-hidden="true" className="hidden sm:inline">|</span>}
                                <Link href={link.href} className="hover:text-[#00ABFF] transition-colors">
                                    {link.label}
                                </Link>
                            </Fragment>
                        ))}
                    </nav>
                </div>

            </div>
        </footer>
    );
}
