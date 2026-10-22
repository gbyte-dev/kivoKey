import { Suspense } from "react";
import type { Metadata } from "next";
import { checkZipCoverage } from "@/lib/coverage";
import { getVehicleYears } from "@/lib/vehicles";
import BookingHeader from "@/components/booking/BookingHeader";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
    title: "Get Quote + Schedule",
    description: "Check if KivoKey serves your ZIP code, get your all-inclusive price, and schedule a 2-hour arrival window.",
};

// The flow reads ?zip= (sent by the homepage hero form), so it renders per request inside Suspense;
// the header + skeleton below is the static shell shown instantly.
export default function QuotePage({ searchParams }: PageProps<"/quote">) {
    return (
        <Suspense fallback={<BookingSkeleton />}>
            <Booking searchParams={searchParams} />
        </Suspense>
    );
}

async function Booking({ searchParams }: Pick<PageProps<"/quote">, "searchParams">) {
    const { zip } = await searchParams;
    const initialZip = typeof zip === "string" ? zip : "";
    // ZIP from the URL is checked right away, so the customer lands on the result
    const initialZipResult = initialZip ? await checkZipCoverage(initialZip) : null;
    const vehicleYears = await getVehicleYears();

    return <BookingWizard initialZip={initialZip} initialZipResult={initialZipResult} vehicleYears={vehicleYears} />;
}

function BookingSkeleton() {
    return (
        <>
            <BookingHeader step={0} />
            <main aria-busy="true" className="flex-1 w-full bg-[#F5F8FC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10 grid gap-6 lg:grid-cols-[1fr_320px] animate-pulse">
                    <div className="h-96 rounded-2xl bg-white border border-[#E7EBF0]" />
                    <div className="h-96 rounded-2xl bg-white border border-[#E7EBF0]" />
                </div>
            </main>
        </>
    );
}
