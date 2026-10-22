import { CalendarDays, CarFront, KeyRound, MapPin } from "lucide-react";
import {
    arrivalWindow,
    formatDay,
    formatPrice,
    keyStatusLabel,
    keyTypeLabel,
    vehicleLabel,
    type KeyStatus,
    type KeyType,
    type Quote,
    type Schedule,
    type ServiceArea,
    type Vehicle,
} from "@/lib/booking";

type BookingSummaryProps = {
    vehicle: Vehicle | null;
    keyType: KeyType | null;
    keyStatus: KeyStatus | null;
    schedule: Schedule | null;
    serviceArea: ServiceArea | null;
    quote: Quote | null;
    className?: string;
};

// "Your booking" side card: what's been chosen so far and the all-inclusive total
export default function BookingSummary({ vehicle, keyType, keyStatus, schedule, serviceArea, quote, className = "" }: BookingSummaryProps) {
    const rows = [
        { icon: CarFront, value: vehicle && vehicleLabel(vehicle) },
        { icon: KeyRound, value: keyType && `${keyTypeLabel(keyType)}${keyStatus ? ` · ${keyStatusLabel(keyStatus)}` : ""}` },
        { icon: CalendarDays, value: schedule && `${formatDay(schedule.date, "long")}, ${arrivalWindow(schedule.windowId).label}` },
        { icon: MapPin, value: serviceArea && `${serviceArea.city}, ${serviceArea.state} ${serviceArea.zip}` },
    ].filter((r) => r.value);

    return (
        <aside className={`self-start rounded-2xl bg-[#F5F8FC] p-7 ${className}`}>
            <p className="text-sm font-semibold">Your booking</p>
            <ul className="mt-4 space-y-3.5">
                {rows.map(({ icon: Icon, value }) => (
                    <li key={value} className="flex items-start gap-3 text-[15px] leading-snug text-[#344054]">
                        <Icon className="mt-0.5 w-4.5 h-4.5 shrink-0 text-[#0084FE]" />
                        {value}
                    </li>
                ))}
            </ul>
            {quote?.status === "priced" && (
                <div className="mt-6 flex items-center justify-between border-t border-[#E4E7EC] pt-5">
                    <span className="text-sm text-[#475467]">All-inclusive price</span>
                    <span className="text-xl font-bold">{formatPrice(quote.total)}</span>
                </div>
            )}
        </aside>
    );
}
