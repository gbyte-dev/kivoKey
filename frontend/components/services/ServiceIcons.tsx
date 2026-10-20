import type { SVGProps } from "react";

// Shared outline style for all service icons (matches the Figma line icons)
function IconBase({ children, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {children}
        </svg>
    );
}

/* --- Car front with a location pin above it --- */
export function MobileServiceIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            {/* Location pin */}
            <path d="M32 22c-4-4.5-7-8-7-11.5a7 7 0 0 1 14 0C39 14 36 17.5 32 22z" />
            <circle cx="32" cy="10.5" r="2.5" fill="currentColor" stroke="none" />
            {/* Speed lines */}
            <path d="M43 9h7M44 13h5" />
            {/* Windshield */}
            <path d="M17 37l3.5-9a3 3 0 0 1 2.8-2h17.4a3 3 0 0 1 2.8 2l3.5 9" />
            {/* Body */}
            <path d="M14 37h36a4 4 0 0 1 4 4v7a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2v-7a4 4 0 0 1 4-4z" />
            {/* Mirrors */}
            <path d="M16.5 32H13M47.5 32H51" />
            {/* Wheels */}
            <path d="M15 50v4a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-4M42 50v4a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-4" />
            {/* Headlights + grille */}
            <circle cx="17" cy="43" r="2" />
            <circle cx="47" cy="43" r="2" />
            <path d="M28 41.5h8a2 2 0 0 1 0 4h-8a2 2 0 0 1 0-4z" />
        </IconBase>
    );
}

/* --- Quote document with a check badge --- */
export function UpfrontQuoteIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            {/* Page with folded corner */}
            <path d="M34 58H16a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h24l10 10v18" />
            <path d="M40 6v8a2 2 0 0 0 2 2h8" />
            {/* Dollar sign */}
            <path d="M28 15.5h-5a2.75 2.75 0 0 0 0 5.5h3a2.75 2.75 0 0 1 0 5.5h-5M24.5 13v15.5" />
            {/* Text lines */}
            <path d="M33 18h10M33 24h10M20 34h8M32 34h10M20 41h12M20 48h10" />
            {/* Check badge */}
            <circle cx="46" cy="46" r="10" />
            <path d="M41.5 46l3 3 6-6" />
        </IconBase>
    );
}

/* --- Car key fob sending a signal --- */
export function KeyFobIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            {/* Tilted fob with two buttons */}
            <g transform="rotate(35 24 40)">
                <rect x="14" y="21" width="20" height="38" rx="10" />
                <rect x="18.5" y="26" width="11" height="9" rx="3" />
                <rect x="18.5" y="38" width="11" height="9" rx="3" />
                <circle cx="24" cy="53" r="2" />
            </g>
            {/* Signal waves */}
            <path d="M40.9 15.1a5 5 0 0 1 4 4M41.7 10.2a10 10 0 0 1 8.1 8.1M42.6 5.2a15 15 0 0 1 12.2 12.2" />
        </IconBase>
    );
}

/* --- Shield with a check mark and glow rays --- */
export function TrustedShieldIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            {/* Outer + inner shield */}
            <path d="M32 8l17 6.5V29c0 13-7.5 22-17 27-9.5-5-17-14-17-27V14.5z" />
            <path d="M32 14l11.5 4.4V29c0 9-5 16-11.5 20-6.5-4-11.5-11-11.5-20V18.4z" />
            {/* Check mark */}
            <path d="M26.5 31.5l4 4 8-8.5" />
            {/* Rays */}
            <path d="M10 23l-4.5-2.5M9.5 31.5H4M10 40l-4.5 2.5M54 23l4.5-2.5M54.5 31.5H60M54 40l4.5 2.5" />
        </IconBase>
    );
}
