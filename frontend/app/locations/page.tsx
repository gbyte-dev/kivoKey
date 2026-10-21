import type { Metadata } from "next";
import { getActiveLocations } from "@/lib/locations";
import { buildServiceMap } from "@/lib/service-map";
import BrushTag from "@/components/how-it-works/BrushTag";
import Breadcrumbs from "@/components/service-page/Breadcrumbs";
import ServicesGrid from "@/components/service-page/ServicesGrid";
import LocationsExplorer from "@/components/locations/LocationsExplorer";
import RequestLocationButton from "@/components/locations/RequestLocationButton";
import GetStartedSection from "@/components/get-started/GetStartedSection";

export const metadata: Metadata = {
    title: "Locations",
    description: "See the cities where KivoKey's mobile car key service is available, and request a new location.",
};

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export default async function LocationsPage() {
    const locations = await getActiveLocations();
    const map = buildServiceMap(locations);
    const stateCount = new Set(locations.map((l) => l.state)).size;

    return (
        <>
            {/* Page header */}
            <section className="w-full bg-[#F3F8FF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
                    <Breadcrumbs className="flex justify-center" items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
                    <div className="mt-6">
                        <BrushTag>Locations</BrushTag>
                    </div>
                    <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#00061A]">
                        Cities We Serve
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-[#33435C]">
                        KivoKey is currently available in {plural(locations.length, "city", "cities")} across{" "}
                        {plural(stateCount, "state", "states")}. Don&apos;t see yours?{" "}
                        <RequestLocationButton className="font-semibold text-[#0084FE] underline underline-offset-2 hover:text-[#0070D0]">
                            Request a new location
                        </RequestLocationButton>
                        , we&apos;re adding new cities as we grow.
                    </p>
                </div>
            </section>

            {/* Pick a location: list + map */}
            <section className="w-full bg-white py-14 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00061A]">Pick a location</h2>
                    <div className="mt-8">
                        <LocationsExplorer locations={locations} map={map} />
                    </div>
                </div>
            </section>

            <ServicesGrid />
            <GetStartedSection />
        </>
    );
}
