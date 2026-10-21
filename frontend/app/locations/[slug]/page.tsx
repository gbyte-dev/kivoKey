import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveLocations, getLocation, getZipAreas } from "@/lib/locations";
import CityHero from "@/components/locations/CityHero";
import CityServiceArea from "@/components/locations/CityServiceArea";
import ServicesGrid from "@/components/service-page/ServicesGrid";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";
import GetStartedSection from "@/components/get-started/GetStartedSection";

// The whole page depends on the city in the URL, and reading params outside <Suspense> keeps a real
// 404 status for unknown cities (inside Suspense it becomes a "soft" 404 with status 200). The pages
// are prerendered, so opting out of instant-navigation validation costs little.
export const instant = false;

// Prerender a page for every active city
export async function generateStaticParams() {
    return (await getActiveLocations()).map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
    const location = await getLocation((await params).slug);
    if (!location) return {};
    const label = `${location.city}, ${location.state}`;
    return {
        title: `Car Key Service in ${label}`,
        description: `Mobile car key replacement, spare keys, and all-keys-lost service in ${label} and nearby areas. We come to you.`,
    };
}

export default async function CityPage({ params }: PageProps<"/locations/[slug]">) {
    const location = await getLocation((await params).slug);
    if (!location) notFound();
    const areas = await getZipAreas(location.zips);

    return (
        <>
            <CityHero location={location} areas={areas} />
            <CityServiceArea location={location} />
            <HowItWorksSection />
            <ServicesGrid title={`Our services in ${location.city}`} />
            <GetStartedSection />
        </>
    );
}
