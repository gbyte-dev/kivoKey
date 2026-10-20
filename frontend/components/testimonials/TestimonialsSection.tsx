import { getImageProps } from "next/image";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";

// The arrows cycle through this list.
// TODO: these are placeholder reviews for development; replace them with real customer reviews before launch.
const testimonials: Testimonial[] = [
    {
        quote: "KivoKey was fast, professional, and very convenient. They came to my location, made a new key, and programmed it on the spot. The whole process was smooth and stress-free.",
        name: "Michael R.",
        rating: 5,
    },
    {
        quote: "Lost my only car key at work and expected a huge dealership bill. KivoKey met me in the parking lot, cut a new key, and had me driving home within the hour.",
        name: "Sarah T.",
        rating: 5,
    },
    {
        quote: "The quote was clear and upfront, with no surprise fees. The technician showed up on time, programmed two new fobs for our SUV, and explained everything.",
        name: "David L.",
        rating: 5,
    },
    {
        quote: "Booking online took two minutes. The technician arrived right on schedule and made a spare key in my driveway. Great service, just wish the arrival window was shorter.",
        name: "Priya S.",
        rating: 4,
    },
    {
        quote: "My key fob stopped working on a Sunday. KivoKey came out the next morning, replaced it on the spot, and saved me a tow and a trip to the dealer.",
        name: "James K.",
        rating: 5,
    },
];

// Art direction: full Figma photo on desktop, crop without the baked-in card on mobile/tablet.
// On lg+ TestimonialCard is positioned (in % of the section) to sit exactly on top of the baked card.
const common = { alt: "", sizes: "100vw" } as const;

const {
    props: { srcSet: desktopSrcSet },
} = getImageProps({ ...common, src: "/images/testimonial-bg.jpg", width: 2880, height: 1187 });

const {
    props: { srcSet: mobileSrcSet, ...imgProps },
} = getImageProps({ ...common, src: "/images/testimonial-bg-mobile.jpg", width: 1728, height: 1187 });

export default function TestimonialsSection() {
    return (
        <section className="relative w-full bg-slate-100">

            {/* Background Image: in normal flow so the section keeps the image's exact aspect ratio */}
            <picture>
                <source media="(min-width: 1024px)" srcSet={desktopSrcSet} sizes="100vw" width={2880} height={1187} />
                <img {...imgProps} alt="" srcSet={mobileSrcSet} className="block w-full h-auto" />
            </picture>

            {/* Card: below the image on mobile, overlaid on the image on desktop */}
            <div className="@container relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:absolute lg:inset-0 lg:max-w-none lg:p-0">
                <TestimonialCard testimonials={testimonials} averageRating="4.9" />
            </div>

        </section>
    );
}
