import type { Metadata } from "next";
import { services } from "@/lib/services";
import BrushTag from "@/components/how-it-works/BrushTag";
import Breadcrumbs from "@/components/service-page/Breadcrumbs";
import ServiceLinkCard from "@/components/service-page/ServiceLinkCard";
import ServicesSection from "@/components/services/ServicesSection";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";
import GetStartedSection from "@/components/get-started/GetStartedSection";

export const metadata: Metadata = {
    title: "Car Key Services",
    description:
        "Mobile car key replacement, spare car keys, and all-keys-lost service in Columbus, OH and nearby areas. We come to you.",
};

export default function ServicesPage() {
    return (
        <>
            {/* Page header */}
            <section className="w-full bg-[#F3F8FF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
                    <Breadcrumbs
                        className="flex justify-center"
                        items={[{ label: "Home", href: "/" }, { label: "Services" }]}
                    />
                    <div className="mt-6">
                        <BrushTag>Our Services</BrushTag>
                    </div>
                    <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#00061A]">
                        Mobile Car Key Services
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-[#33435C]">
                        Replacement keys, spares, and all-keys-lost help, done at your vehicle in Columbus, OH and nearby areas.
                    </p>
                </div>
            </section>

            {/* The three service subpages */}
            <section className="w-full bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <ServiceLinkCard key={service.slug} service={service} />
                    ))}
                </div>
            </section>

            <ServicesSection />
            <HowItWorksSection />
            <GetStartedSection />
        </>
    );
}
