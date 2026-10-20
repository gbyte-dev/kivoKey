import Link from "next/link";

// Soft "bokeh" circles on the light-blue sides (left/top in %, size in cqw, from the Figma)
const bubbles = [
    { left: "1.25%", top: "-5.7%", size: "5cqw" },
    { left: "4.1%", top: "12.5%", size: "3.6cqw" },
    { left: "0.65%", top: "31.8%", size: "4.4cqw" },
    { left: "4.75%", top: "60.8%", size: "3cqw" },
    { left: "1.4%", top: "78.4%", size: "2.4cqw" },
    { left: "8.05%", top: "69.3%", size: "2.8cqw" },
    { left: "81.5%", top: "8.5%", size: "2cqw" },
    { left: "85.25%", top: "14.2%", size: "4cqw" },
    { left: "95.05%", top: "26.1%", size: "4.4cqw" },
    { left: "94.5%", top: "1.1%", size: "2.8cqw" },
    { left: "90.3%", top: "60.2%", size: "4.8cqw" },
    { left: "94.45%", top: "79.5%", size: "3.2cqw" },
    { left: "88.5%", top: "45.5%", size: "2cqw" },
];

export default function SatisfactionBanner() {
    return (
        <section className="@container relative w-full overflow-hidden bg-[#0171C4] lg:bg-[#0297E3]">

            {/* Darker diagonal center panel (desktop) */}
            <div
                aria-hidden="true"
                className="absolute inset-0 hidden lg:block bg-[#0171C4]"
                style={{ clipPath: "polygon(16.6% 0, 77.8% 0, 73.8% 100%, 12.5% 100%)" }}
            />

            {/* Bokeh circles (desktop) */}
            <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
                {bubbles.map((b, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        style={{ left: b.left, top: b.top, width: b.size, height: b.size }}
                    />
                ))}
            </div>

            {/* Content: stacked on mobile, single row on desktop */}
            <div className="relative flex flex-col items-center text-center gap-4 px-6 py-10 lg:flex-row lg:text-left lg:gap-0 lg:h-[8.8cqw] lg:py-0 lg:pl-[11.4cqw] lg:pr-[10cqw]">

                {/* Logo */}
                <span className="inline-flex items-baseline text-4xl font-extrabold tracking-tight text-white select-none lg:text-[length:3.55cqw]">
                    KivoKey
                    <sup className="text-xs font-bold ml-0.5 -translate-y-3 lg:text-[length:0.6cqw] lg:-translate-y-[1.4cqw]">®</sup>
                </span>

                {/* Vertical divider */}
                <span aria-hidden="true" className="hidden lg:block shrink-0 w-[max(2px,0.12cqw)] h-[3.9cqw] bg-white/90 ml-[2.15cqw] mr-[1.95cqw]" />

                {/* Title + subtitle */}
                <div className="lg:flex-1 lg:min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight lg:text-[length:1.85cqw] lg:whitespace-nowrap">
                        Customer Satisfaction Drives Everything We Do
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-white/95 lg:mt-[0.35cqw] lg:text-[length:1.25cqw] lg:whitespace-nowrap">
                        Get spare keys, replacements, and key fob programming at your location.
                    </p>
                </div>

                {/* White pill button */}
                <Link
                    href="/services"
                    className="inline-flex items-center justify-center shrink-0 bg-white text-[#0171C4] font-bold rounded-full px-8 py-3 text-base shadow-sm transition-transform hover:scale-[1.03] active:scale-95 lg:w-[11cqw] lg:h-[2.85cqw] lg:p-0 lg:text-[length:1.4cqw]"
                >
                    Learn More
                </Link>

            </div>
        </section>
    );
}
