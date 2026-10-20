import Link from "next/link";
import BrushTag from "./BrushTag";
import StepCard from "./StepCard";

const steps = [
    {
        image: "/images/step-1-vehicle.jpg",
        title: "Tell us about your vehicle",
        description: "Enter your vehicle information and service needs to get a free quote.",
    },
    {
        image: "/images/step-2-quote.jpg",
        title: "Get your quote",
        description: "See your quote, choose a convenient appointment time, and confirm online.",
    },
    {
        image: "/images/step-3-service.jpg",
        title: "Schedule your service",
        description: "A certified technician will come to you at your home, work, or any convenient location.",
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="w-full bg-white py-16 sm:py-20">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-center">
                    <BrushTag>Its Easy!</BrushTag>
                    <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#00061A]">
                        How It Works
                    </h2>
                    <p className="mt-3 text-lg sm:text-xl lg:text-[22px] text-[#1E3F8A]">
                        From quote to service, we make replacing or programming your car key simple and convenient.
                    </p>
                </div>

                {/* Steps: 1 column on mobile/tablet, 3 on desktop */}
                <ol className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 max-w-xl mx-auto lg:max-w-none lg:grid-cols-3 lg:gap-5">
                    {steps.map((step, i) => (
                        <li key={step.title} className="flex">
                            <StepCard step={i + 1} {...step} />
                        </li>
                    ))}
                </ol>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/quote"
                        className="inline-flex items-center justify-center w-full sm:w-auto sm:min-w-[340px] h-14 px-10 rounded-full bg-[#0084FE] text-white text-lg sm:text-xl font-bold shadow-sm transition-transform hover:bg-[#0074e0] active:scale-95"
                    >
                        Get Quote + Schedule
                    </Link>
                    <a
                        href="tel:18001234567"
                        className="inline-flex items-center justify-center w-full sm:w-auto sm:min-w-[320px] h-14 px-10 rounded-full border-2 border-[#0084FE] bg-white text-[#0084FE] text-lg sm:text-xl font-bold transition-colors hover:bg-[#0084FE]/5"
                    >
                        Call 1 (800) 123-4567
                    </a>
                </div>

            </div>
        </section>
    );
}
