import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import ServiceHero from "@/components/service-page/ServiceHero";
import ServiceHighlights from "@/components/service-page/ServiceHighlights";
import ServiceChecklist from "@/components/service-page/ServiceChecklist";
import ServiceFaq from "@/components/service-page/ServiceFaq";
import OtherServices from "@/components/service-page/OtherServices";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";
import GetStartedSection from "@/components/get-started/GetStartedSection";

// Prerender every service subpage at build time
export function generateStaticParams() {
    return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
    const service = getService((await params).slug);
    if (!service) return {};
    return { title: service.title, description: service.metaDescription };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
    const service = getService((await params).slug);
    if (!service) notFound();

    return (
        <>
            <ServiceHero service={service} />
            <ServiceHighlights highlights={service.highlights} />
            <ServiceChecklist checklist={service.checklist} />
            <HowItWorksSection />
            <ServiceFaq faqs={service.faqs} />
            <OtherServices services={services.filter((s) => s.slug !== service.slug)} />
            <GetStartedSection />
        </>
    );
}
