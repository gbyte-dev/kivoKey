"use client";

import { useRef, useState } from "react";
import { Search } from "lucide-react";
import type { ServiceLocation } from "@/lib/locations";
import type { ServiceMap } from "@/lib/service-map";
import LocationMap from "./LocationMap";
import RequestLocationButton from "./RequestLocationButton";

type LocationsExplorerProps = {
    locations: ServiceLocation[];
    map: ServiceMap;
};

// "Pick a location" (like dropoff.com): searchable city list + whole-US map.
// Typing fades the map and keeps only the matching cities bright; hovering a city highlights its pin;
// clicking a city (in the list or on the map) opens its popup.
export default function LocationsExplorer({ locations, map }: LocationsExplorerProps) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    // Search by city name, or by ZIP code (digits match the start of any ZIP the city serves)
    const q = query.trim().toLowerCase();
    const isZip = /^\d+$/.test(q);
    const filtered = locations.filter((l) =>
        isZip ? l.zips.some((zip) => zip.startsWith(q)) : `${l.city}, ${l.state}`.toLowerCase().includes(q),
    );
    const matching = q ? new Set(filtered.map((l) => l.slug)) : null;

    // Picking from the list: make sure the map (above the list on mobile) is in view
    const pickFromList = (slug: string) => {
        setSelected(slug);
        mapRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    return (
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16 lg:items-start">

            {/* City list (below the map on mobile) */}
            <div className="order-2 lg:order-1 rounded border border-[#C9CDD2] bg-white px-5 pt-4 pb-2">
                <label className="flex items-center gap-2.5 border-b border-gray-200 pb-3">
                    <Search className="w-4 h-4 text-[#00061A]" strokeWidth={2.25} />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search city or ZIP"
                        aria-label="Search locations by city or ZIP code"
                        className="w-full bg-transparent text-sm text-[#0070D0] placeholder:text-gray-400 outline-none"
                    />
                </label>

                <ul className="max-h-75 lg:max-h-100 overflow-y-auto py-2">
                    {filtered.map((location) => {
                        const isSelected = location.slug === selected;
                        return (
                            <li key={location.slug}>
                                <button
                                    type="button"
                                    onClick={() => pickFromList(location.slug)}
                                    onMouseEnter={() => setHovered(location.slug)}
                                    onMouseLeave={() => setHovered(null)}
                                    onFocus={() => setHovered(location.slug)}
                                    onBlur={() => setHovered(null)}
                                    aria-pressed={isSelected}
                                    className="py-2.5 text-left text-[15px] text-[#00061A] hover:text-[#0070D0] transition-colors"
                                >
                                    <span className={`pb-1 border-b-2 ${isSelected ? "border-[#0070D0] text-[#0070D0]" : "border-transparent"}`}>
                                        {location.city}, {location.state}
                                    </span>
                                </button>
                            </li>
                        );
                    })}

                    {filtered.length === 0 && (
                        <li className="py-4 text-sm text-[#33435C]">
                            {isZip && q.length === 5 ? `We don't serve ${q} yet.` : <>No locations match &ldquo;{query}&rdquo;.</>}{" "}
                            <RequestLocationButton className="font-semibold text-[#0084FE] hover:underline">
                                Request it
                            </RequestLocationButton>
                        </li>
                    )}
                </ul>
            </div>

            {/* Map */}
            <div ref={mapRef} className="order-1 lg:order-2 scroll-mt-24">
                <LocationMap
                    map={map}
                    locations={locations}
                    selected={selected}
                    highlighted={hovered}
                    matching={matching}
                    onSelect={setSelected}
                />
            </div>

        </div>
    );
}
