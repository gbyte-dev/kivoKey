import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import type { ServiceLocation, ZipAreas } from "@/lib/locations";
import Breadcrumbs from "@/components/service-page/Breadcrumbs";
import CtaButtons from "@/components/service-page/CtaButtons";
import ServiceAreaMap from "./ServiceAreaMap";

const perks = ["Same-day & next-day", "Upfront quotes", "We come to you"];

// City page hero (like dropoff's city pages): text on the left, live service-area map on the right
export default function CityHero({ location, areas }: { location: ServiceLocation; areas: ZipAreas }) {
    const label = `${location.city}, ${location.state}`;

    return (
        <section className="w-full bg-[#F3F8FF]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20 grid gap-12 lg:grid-cols-2 lg:gap-14 lg:items-center">

                <div>
                    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label }]} />
                    <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#00061A]">
                        Mobile Car Key Service in {location.city}
                    </h1>
                    <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#33435C]">
                        KivoKey brings car key replacement, spare keys, and all-keys-lost help to {location.city} and nearby
                        areas. Our technicians come to your home, work, or roadside location, with upfront quotes and
                        same-day or next-day appointments.
                    </p>
                    <CtaButtons className="mt-8" />
                    <Link href="/locations" className="group mt-6 inline-flex items-center gap-2 font-bold text-[#0084FE]">
                        Check all cities
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Service-area map with a floating checklist card */}
                <div className="relative">
                    {/* isolate keeps Leaflet's internal z-indexes below the sticky header */}
                    <div className="relative isolate h-85 sm:h-105 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
                        <ServiceAreaMap areas={areas} center={[location.lat, location.lng]} label={label} />
                    </div>
                    <ul className="absolute -bottom-6 left-4 sm:-left-5 z-10 space-y-2 rounded-xl border-2 border-[#0084FE] bg-white px-5 py-4 text-sm font-semibold text-[#00061A] shadow-lg">
                        {perks.map((perk) => (
                            <li key={perk} className="flex items-center gap-2">
                                <CircleCheck className="w-4 h-4 text-[#0084FE]" />
                                {perk}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}
