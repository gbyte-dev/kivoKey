"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import StarRating from "./StarRating";

export type Testimonial = {
    quote: string;
    name: string;
    rating: number;
};

type TestimonialCardProps = {
    testimonials: Testimonial[];
    averageRating: string;
};

const arrowButton =
    "flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#111] text-[#111] transition-colors hover:bg-[#111] hover:text-white lg:w-[2.8cqw] lg:h-[2.8cqw] lg:border-[max(2px,0.15cqw)]";

export default function TestimonialCard({ testimonials, averageRating }: TestimonialCardProps) {
    const [index, setIndex] = useState(0);
    const current = testimonials[index];

    const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    const next = () => setIndex((i) => (i + 1) % testimonials.length);

    return (
        // lg+: sizes are in cqw (% of section width) so the card sits exactly over the Figma card
        <div className="flex flex-col w-full max-w-[560px] bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center lg:absolute lg:left-[3.75%] lg:top-[6.9%] lg:w-[36.4%] lg:max-w-none lg:min-h-[85%] lg:rounded-[0.7cqw] lg:shadow-none lg:pt-[2.23cqw] lg:pb-[2cqw] lg:px-[2.35cqw]">

            <h2 className="text-3xl sm:text-4xl font-bold text-[#111] leading-tight lg:text-[length:3cqw] lg:leading-[1.2]">
                Our Customers Say
            </h2>
            <p className="mt-1 text-lg uppercase text-[#1a1a1a] lg:mt-[0.31cqw] lg:text-[length:1.75cqw] lg:leading-[1.3]">
                {averageRating} out of 5 stars
            </p>

            {/* Review box (grows so the arrows stay pinned to the bottom) */}
            <div className="mt-5 flex flex-1 flex-col justify-center rounded-xl bg-[#F4F6F8] px-5 py-6 lg:mt-[1.1cqw] lg:rounded-[0.4cqw] lg:px-[3cqw] lg:pt-[1.8cqw] lg:pb-[1.5cqw]">
                <StarRating rating={current.rating} />
                <blockquote aria-live="polite" className="mt-4 lg:mt-[1.18cqw]">
                    <p className="text-base text-[#222] leading-relaxed lg:text-[length:1.32cqw] lg:leading-[1.5]">
                        {current.quote}
                    </p>
                    <footer className="mt-3 text-base text-[#222] lg:mt-[1.1cqw] lg:text-[length:1.3cqw] lg:leading-[1.5]">
                        {current.name}
                    </footer>
                </blockquote>
            </div>

            {/* Carousel arrows */}
            <div className="mt-5 flex justify-center gap-4 lg:mt-[1.56cqw] lg:gap-[1.85cqw]">
                <button type="button" onClick={prev} className={arrowButton} aria-label="Previous review">
                    <ArrowLeft className="w-[55%] h-[55%]" strokeWidth={2.5} />
                </button>
                <button type="button" onClick={next} className={arrowButton} aria-label="Next review">
                    <ArrowRight className="w-[55%] h-[55%]" strokeWidth={2.5} />
                </button>
            </div>

        </div>
    );
}
