"use client";

import { useCallback, useState, useTransition } from "react";
import { ArrowLeft } from "lucide-react";
import { getAvailabilityAction, getQuoteAction } from "@/app/(booking)/quote/actions";
import {
    BOOKING_STEPS,
    arrivalWindow,
    formatDay,
    formatPrice,
    isScheduleAvailable,
    keyStatusLabel,
    keyTypeLabel,
    vehicleLabel,
    type Availability,
    type BookingDetails,
    type KeyStatus,
    type KeyType,
    type Quote,
    type Schedule,
    type ServiceArea,
    type Vehicle,
    type ZipCheckResult,
} from "@/lib/booking";
import BookingHeader from "./BookingHeader";
import BookingStepsDrawer from "./BookingStepsDrawer";
import BookingSummary from "./BookingSummary";
import DetailsStep from "./DetailsStep";
import KeyStatusStep from "./KeyStatusStep";
import KeyTypeStep from "./KeyTypeStep";
import LocationStep from "./LocationStep";
import PriceStep from "./PriceStep";
import ScheduleStep from "./ScheduleStep";
import VehicleStep from "./VehicleStep";

type BookingWizardProps = {
    initialZip: string;
    initialZipResult: ZipCheckResult | null;
    vehicleYears: number[];
};

// The quote + schedule flow: one page, 8 steps, with a Safelite-style progress drawer.
// Steps are added one at a time; steps that aren't built yet show a placeholder.
export default function BookingWizard({ initialZip, initialZipResult, vehicleYears }: BookingWizardProps) {
    const [step, setStep] = useState(0);
    const [stepsOpen, setStepsOpen] = useState(false);
    const [serviceArea, setServiceArea] = useState<ServiceArea | null>(
        initialZipResult?.status === "available" ? initialZipResult : null,
    );
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [keyType, setKeyType] = useState<KeyType | null>(null);
    const [keyStatus, setKeyStatus] = useState<KeyStatus | null>(null);
    const [quote, setQuote] = useState<Quote | null>(null);
    const [isPricing, startPricing] = useTransition();
    const [availability, setAvailability] = useState<Availability | null>(null);
    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [isLoadingDays, startLoadingDays] = useTransition();
    const [details, setDetails] = useState<BookingDetails | null>(null);

    const goTo = (next: number) => {
        setStep(next);
        setStepsOpen(false);
        window.scrollTo({ top: 0 });
    };
    const closeSteps = useCallback(() => setStepsOpen(false), []);

    // Leaving "working key": work out the price from everything chosen so far, then show it
    function showPrice() {
        if (!vehicle || !keyType || !keyStatus) return;
        startPricing(async () => {
            const result = await getQuoteAction({ year: vehicle.year, makeId: vehicle.makeId, keyType, keyStatus });
            setQuote(result);
            goTo(4);
        });
    }

    // Leaving the price: load the market's bookable days; drop a picked window that's no longer open
    function showSchedule() {
        if (!serviceArea) return;
        startLoadingDays(async () => {
            const result = await getAvailabilityAction(serviceArea.slug);
            if (!result) return;
            setAvailability(result);
            if (schedule && !isScheduleAvailable(result, schedule)) setSchedule(null);
            goTo(5);
        });
    }

    // Answer shown under each finished step in the drawer (filled in as steps are built)
    const values = BOOKING_STEPS.map((s) => {
        if (s.id === "location" && serviceArea) return `${serviceArea.zip} · ${serviceArea.city}, ${serviceArea.state}`;
        if (s.id === "vehicle" && vehicle) return vehicleLabel(vehicle);
        if (s.id === "key-type" && keyType) return keyTypeLabel(keyType);
        if (s.id === "key-status" && keyStatus) return keyStatusLabel(keyStatus);
        if (s.id === "price" && quote) return quote.status === "priced" ? formatPrice(quote.total) : "Needs review";
        if (s.id === "window" && schedule) return `${formatDay(schedule.date)} · ${arrivalWindow(schedule.windowId).short}`;
        if (s.id === "details" && details) return `${details.address.street} · ${details.customer.firstName} ${details.customer.lastName}`;
        return null;
    });

    return (
        <>
            <BookingHeader step={step} stepsOpen={stepsOpen} onToggleSteps={() => setStepsOpen((open) => !open)} />
            <BookingStepsDrawer open={stepsOpen} step={step} values={values} onSelectStep={goTo} onClose={closeSteps} />

            <main className="flex-1 w-full bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14">
                    {step === 0 ? (
                        <LocationStep
                            initialZip={serviceArea?.zip ?? initialZip}
                            initialResult={serviceArea ? { status: "available", ...serviceArea } : initialZipResult}
                            onServiceAreaChange={setServiceArea}
                            onContinue={() => goTo(1)}
                        />
                    ) : step === 1 ? (
                        <VehicleStep
                            years={vehicleYears}
                            value={vehicle}
                            serviceArea={serviceArea}
                            onChange={setVehicle}
                            onBack={() => goTo(0)}
                            onContinue={() => goTo(2)}
                        />
                    ) : step === 2 ? (
                        <KeyTypeStep
                            vehicle={vehicle}
                            value={keyType}
                            onChange={setKeyType}
                            onBack={() => goTo(1)}
                            onContinue={() => goTo(3)}
                        />
                    ) : step === 3 ? (
                        <KeyStatusStep
                            vehicle={vehicle}
                            value={keyStatus}
                            onChange={setKeyStatus}
                            onBack={() => goTo(2)}
                            onContinue={showPrice}
                            continuing={isPricing}
                        />
                    ) : step === 4 && quote ? (
                        <PriceStep
                            quote={quote}
                            serviceArea={serviceArea}
                            vehicle={vehicle}
                            keyType={keyType}
                            keyStatus={keyStatus}
                            onEdit={goTo}
                            onBack={() => goTo(3)}
                            onContinue={showSchedule}
                            continuing={isLoadingDays}
                        />
                    ) : step === 5 && availability ? (
                        <ScheduleStep
                            availability={availability}
                            value={schedule}
                            serviceArea={serviceArea}
                            quote={quote}
                            onChange={setSchedule}
                            onBack={() => goTo(4)}
                            onContinue={() => goTo(6)}
                        />
                    ) : step === 6 ? (
                        <DetailsStep
                            value={details}
                            serviceArea={serviceArea}
                            summary={
                                <BookingSummary
                                    vehicle={vehicle}
                                    keyType={keyType}
                                    keyStatus={keyStatus}
                                    schedule={schedule}
                                    serviceArea={serviceArea}
                                    quote={quote}
                                />
                            }
                            onSubmit={(next) => {
                                setDetails(next);
                                goTo(7);
                            }}
                            onBack={() => goTo(5)}
                        />
                    ) : (
                        <StepPlaceholder step={step} onBack={() => goTo(step - 1)} />
                    )}
                </div>
            </main>

            <footer className="border-t border-[#EDF0F4] py-6 text-center text-[13px] text-[#667085]">
                © 2026 KivoKey. All rights reserved.
            </footer>
        </>
    );
}

// TODO: temporary, until the next steps are built
function StepPlaceholder({ step, onBack }: { step: number; onBack: () => void }) {
    return (
        <section className="max-w-140">
            <h1 className="text-[28px] sm:text-[34px] font-semibold leading-tight tracking-tight">{BOOKING_STEPS[step].title}</h1>
            <p className="mt-3 text-[#475467]">This step is coming next.</p>
            <button
                type="button"
                onClick={onBack}
                className="mt-10 inline-flex items-center gap-2 h-12 px-6 rounded-full border border-[#C9D1DC] text-[15px] font-semibold hover:border-[#0084FE] hover:text-[#0084FE] transition-colors"
            >
                <ArrowLeft className="w-4.5 h-4.5" />
                Back
            </button>
        </section>
    );
}
