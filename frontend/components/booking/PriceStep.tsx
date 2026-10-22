"use client";

import type { FormEvent } from "react";
import { CircleAlert, CircleCheck, Info, Phone } from "lucide-react";
import {
    formatPrice,
    keyStatusLabel,
    keyTypeLabel,
    vehicleLabel,
    type KeyStatus,
    type KeyType,
    type Quote,
    type ServiceArea,
    type Vehicle,
} from "@/lib/booking";
import KeyIllustration from "./KeyIllustrations";
import StepNav from "./StepNav";

type PriceStepProps = {
    quote: Quote;
    serviceArea: ServiceArea | null;
    vehicle: Vehicle | null;
    keyType: KeyType | null;
    keyStatus: KeyStatus | null;
    onEdit: (step: number) => void;
    onBack: () => void;
    onContinue: () => void;
    continuing?: boolean; // available days are being loaded
};

// Only things the spec supports; no "OEM", "guarantee" or "no hidden fees" claims until the owner approves them
const included = ["We come to your home, work, or wherever your car is parked", "Key cut and programmed at your vehicle", "Mobile service visit included in this price"];

// Step 5: ONE all-inclusive total, no separate mobile-fee line (spec §2 step 6, AC-03).
// Cases that can't be priced automatically stop here with a call path instead of checkout (AC-05).
export default function PriceStep({ quote, serviceArea, vehicle, keyType, keyStatus, onEdit, onBack, onContinue, continuing = false }: PriceStepProps) {
    const priced = quote.status === "priced";

    const choices = [
        { label: "Vehicle", value: vehicle && vehicleLabel(vehicle), step: 1 },
        { label: "Key type", value: keyType && keyTypeLabel(keyType), step: 2 },
        { label: "Working key", value: keyStatus && keyStatusLabel(keyStatus), step: 3 },
        { label: "Service location", value: serviceArea && `${serviceArea.city}, ${serviceArea.state} ${serviceArea.zip}`, step: 0 },
    ];

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (priced) onContinue();
    }

    return (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-16">
            <section>
                <h1 className="text-[28px] sm:text-[34px] font-semibold leading-tight tracking-tight">
                    {priced ? "Your all-inclusive price" : "Let's confirm your price"}
                </h1>

                <form onSubmit={handleSubmit} className="mt-8">
                    {priced ? (
                        <div className="rounded-2xl border border-[#CFE6FF] bg-[#F3F9FF] p-6 sm:p-8">
                            <p className="text-sm font-medium text-[#475467]">Total price</p>
                            <p className="mt-1 text-5xl sm:text-6xl font-bold tracking-tight">{formatPrice(quote.total)}</p>
                            <p className="mt-4 inline-flex rounded-md bg-[#FEE802] px-3 py-1.5 text-[13px] font-semibold text-[#02020E]">
                                All-inclusive price
                            </p>

                            <ul className="mt-6 space-y-2.5">
                                {included.map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#344054]">
                                        <CircleCheck className="mt-0.5 w-5 h-5 shrink-0 fill-[#16A34A] text-white" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {quote.notice && (
                                <p className="mt-6 flex items-start gap-2.5 rounded-lg bg-white px-4 py-3 text-sm leading-relaxed text-[#475467]">
                                    <Info className="mt-0.5 w-4.5 h-4.5 shrink-0 text-[#0084FE]" />
                                    {quote.notice}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-[#F6E3A6] bg-[#FFF9E6] p-6 sm:p-8">
                            <CircleAlert className="w-8 h-8 text-[#B58900]" />
                            <p className="mt-4 text-lg font-semibold text-[#7A5900]">Your booking needs a quick review</p>
                            <p className="mt-2 text-[15px] leading-relaxed text-[#475467]">
                                {quote.reason} Call us and our team will confirm the right key and price for you.
                            </p>
                            <a
                                href="tel:18001234567"
                                className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#0084FE] hover:bg-[#0074e0] text-white text-base font-semibold transition-colors"
                            >
                                <Phone className="w-4.5 h-4.5 fill-current" strokeWidth={0} />
                                Call 1 (800) 123-4567
                            </a>
                            <p className="mt-4 text-sm text-[#475467]">Or go back and change your vehicle or key type.</p>
                        </div>
                    )}

                    {/* What the price is for */}
                    <dl className="mt-8 divide-y divide-[#EDF0F4] rounded-2xl border border-[#E4E7EC]">
                        {choices.map((c) => (
                            <div key={c.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                                <div className="min-w-0">
                                    <dt className="text-[13px] text-[#667085]">{c.label}</dt>
                                    <dd className="truncate text-[15px] font-medium">{c.value ?? "—"}</dd>
                                </div>
                                <button type="button" onClick={() => onEdit(c.step)} className="shrink-0 text-sm font-semibold text-[#0084FE] hover:underline">
                                    Edit
                                </button>
                            </div>
                        ))}
                    </dl>

                    <StepNav onBack={onBack} canContinue={priced} loading={continuing} continueLabel="Choose arrival window" className="mt-10" />
                </form>
            </section>

            {/* Chosen key (desktop) */}
            {keyType && (
                <aside aria-hidden="true" className="hidden lg:flex flex-col items-center justify-center self-start rounded-2xl bg-[#F5F8FC] px-8 py-12 text-center">
                    <KeyIllustration type={keyType} className="h-44 w-auto" />
                    <p className="mt-6 text-sm text-[#667085]">Your key</p>
                    <p className="mt-1 text-xl font-semibold">{keyTypeLabel(keyType)}</p>
                    {vehicle && <p className="mt-1 text-[15px] text-[#475467]">for your {vehicleLabel(vehicle)}</p>}
                </aside>
            )}
        </div>
    );
}
