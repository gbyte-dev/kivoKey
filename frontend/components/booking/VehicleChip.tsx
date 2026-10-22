import { CarFront } from "lucide-react";
import { vehicleLabel, type Vehicle } from "@/lib/booking";

// "For your 2020 Honda Civic" reminder under a step's heading
export default function VehicleChip({ vehicle }: { vehicle: Vehicle | null }) {
    if (!vehicle) return null;
    return (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F5F8FC] px-3.5 py-1.5 text-[13px] text-[#475467]">
            <CarFront className="w-4 h-4 text-[#0084FE]" />
            For your <span className="font-semibold text-[#00061A]">{vehicleLabel(vehicle)}</span>
        </p>
    );
}
