"use client";

import dynamic from "next/dynamic";
import type { ServiceAreaMapProps } from "./ServiceAreaMapInner";

// Leaflet needs the browser (window), so the map is loaded on the client only
const ServiceAreaMapInner = dynamic(() => import("./ServiceAreaMapInner"), {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-[#E8F2FC]" />,
});

export default function ServiceAreaMap(props: ServiceAreaMapProps) {
    return <ServiceAreaMapInner {...props} />;
}
