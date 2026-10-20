import { getImageProps } from "next/image";
import HeroCard from "./HeroCard";

// Art direction: full Figma hero on desktop, van-only crop on mobile/tablet.
// The desktop image has the card baked in on the left, so on lg+ HeroCard is
// positioned (in % of the hero) to sit exactly on top of it.
const common = { alt: "", sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;

const {
    props: { srcSet: desktopSrcSet },
} = getImageProps({ ...common, src: "/images/hero-van.jpg", width: 2880, height: 951 });

const {
    props: { srcSet: mobileSrcSet, ...imgProps },
} = getImageProps({ ...common, src: "/images/hero-van-mobile.jpg", width: 1692, height: 951 });

export default function Hero() {
    return (
        <section className="relative w-full bg-slate-100">

            {/* Background Image: in normal flow so the hero keeps the image's exact aspect ratio */}
            <picture>
                <source media="(min-width: 1024px)" srcSet={desktopSrcSet} sizes="100vw" width={2880} height={951} />
                <img {...imgProps} alt="" srcSet={mobileSrcSet} className="block w-full h-auto" />
            </picture>

            {/* Card: below the image on mobile, overlaid on the image on desktop */}
            <div className="@container relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:absolute lg:inset-0 lg:max-w-none lg:p-0">
                <HeroCard />
            </div>

        </section>
    );
}
