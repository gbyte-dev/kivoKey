import type { KeyType } from "@/lib/booking";

// Simple illustrations of the three key types (spec §2 step 4: "show understandable illustrations")
const BODY = "#1F2A37";
const BUTTON = "#3A4656";
const BLADE = "#CBD2DC";
const BLADE_EDGE = "#98A2B3";
const BRAND = "#0084FE";

function Shadow() {
    return <ellipse cx="60" cy="112" rx="22" ry="4" fill="#00061A" opacity="0.08" />;
}

// Metal blade with cut teeth, hanging below a key head
function Blade({ top }: { top: number }) {
    return (
        <>
            <path
                d={`M54 ${top} H66 V${top + 30} L60 ${top + 38} L54 ${top + 32} V${top + 26} L57.5 ${top + 23} L54 ${top + 20} V${top + 14} L57.5 ${top + 11} L54 ${top + 8} Z`}
                fill={BLADE}
                stroke={BLADE_EDGE}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path d={`M62 ${top + 3} V${top + 29}`} stroke={BLADE_EDGE} strokeWidth="1.5" strokeLinecap="round" />
        </>
    );
}

function TraditionalKey() {
    return (
        <>
            <Shadow />
            <Blade top={62} />
            <rect x="38" y="10" width="44" height="56" rx="20" fill={BODY} />
            <circle cx="60" cy="25" r="6" fill="#fff" />
            {/* the chip, highlighted */}
            <rect x="50" y="39" width="20" height="14" rx="3" fill={BRAND} />
            <path d="M54 39v-3M60 39v-3M66 39v-3M54 53v3M60 53v3M66 53v3" stroke={BRAND} strokeWidth="2" strokeLinecap="round" />
        </>
    );
}

function RemoteKey() {
    return (
        <>
            <Shadow />
            <Blade top={70} />
            <rect x="34" y="4" width="52" height="72" rx="22" fill={BODY} />
            {/* lock / unlock / trunk buttons */}
            <rect x="46" y="16" width="28" height="13" rx="6.5" fill={BUTTON} />
            <path d="M56.5 24.5v-3a3.5 3.5 0 0 1 7 0v3M55 24.5h10v4h-10z" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinejoin="round" transform="translate(0 -2)" />
            <rect x="46" y="33" width="28" height="13" rx="6.5" fill={BUTTON} />
            <path d="M56.5 41.5v-3a3.5 3.5 0 0 1 7 0M55 41.5h10v4h-10z" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinejoin="round" transform="translate(0 -2)" />
            <rect x="46" y="50" width="28" height="13" rx="6.5" fill={BRAND} />
            <path d="M54 59.5h12M57 55.5h6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </>
    );
}

function SmartKey() {
    return (
        <>
            <Shadow />
            <rect x="36" y="14" width="48" height="90" rx="22" fill={BODY} />
            <rect x="47" y="30" width="26" height="14" rx="7" fill={BUTTON} />
            <rect x="47" y="49" width="26" height="14" rx="7" fill={BUTTON} />
            {/* push-to-start symbol */}
            <circle cx="60" cy="81" r="10" fill={BRAND} />
            <path d="M60 75.5v5.5M56 78.2a5.5 5.5 0 1 0 8 0" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* wireless signal */}
            <path d="M90 22a10 10 0 0 1 0 14M96 17a17 17 0 0 1 0 24" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
    );
}

export default function KeyIllustration({ type, className = "" }: { type: KeyType; className?: string }) {
    return (
        // cropped to the drawings (x 22–104) so they fill their box
        <svg viewBox="22 0 82 120" aria-hidden="true" className={className}>
            {type === "traditional" ? <TraditionalKey /> : type === "remote" ? <RemoteKey /> : <SmartKey />}
        </svg>
    );
}
