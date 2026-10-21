import { MapPin } from "lucide-react";
import type { ServiceLocation } from "@/lib/locations";
import RequestLocationButton from "./RequestLocationButton";
import ZipChecker from "./ZipChecker";

// ZIP checker + the city's ZIP codes, and the "We also cover these areas" card
export default function CityServiceArea({ location }: { location: ServiceLocation }) {
    const label = `${location.city}, ${location.state}`;

    return (
        <section className="w-full bg-white py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">

                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00061A]">
                        ZIP codes we serve in {location.city}
                    </h2>
                    <p className="mt-3 text-base sm:text-lg text-[#33435C]">
                        Enter your ZIP code to check if we come to you.
                    </p>
                    <div className="mt-6">
                        <ZipChecker zips={location.zips} cityLabel={label} />
                    </div>
                    <ul aria-label={`ZIP codes served in ${label}`} className="mt-8 flex flex-wrap gap-2">
                        {location.zips.map((zip) => (
                            <li key={zip} className="rounded-full bg-[#F3F8FF] px-3 py-1.5 text-sm font-semibold text-[#0070D0]">
                                {zip}
                            </li>
                        ))}
                    </ul>
                </div>

                {location.nearbyAreas.length > 0 && (
                    <div className="self-start rounded-2xl bg-[#121F29] p-7 sm:p-9 text-white">
                        <h2 className="text-2xl font-extrabold tracking-tight">We also cover these areas</h2>
                        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-base">
                            {location.nearbyAreas.map((area) => (
                                <li key={area} className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 shrink-0 text-[#FEE802]" />
                                    {area}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-sm text-white/70">
                            Don&apos;t see your area?{" "}
                            <RequestLocationButton className="font-semibold text-[#FEE802] underline underline-offset-2">
                                Request it
                            </RequestLocationButton>
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}
