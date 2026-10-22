"use client";

import type { FormEvent } from "react";
import { Check, KeyRound, ShieldCheck, X } from "lucide-react";
import { KEY_STATUSES, type KeyStatus, type Vehicle } from "@/lib/booking";
import ChoiceCard from "./ChoiceCard";
import StepNav from "./StepNav";
import VehicleChip from "./VehicleChip";

type KeyStatusStepProps = {
    vehicle: Vehicle | null;
    value: KeyStatus | null;
    onChange: (status: KeyStatus) => void;
    onBack: () => void;
    onContinue: () => void;
    continuing?: boolean; // the price is being worked out
};

// Key icon with a small "has key" / "no key" badge
function StatusIcon({ status }: { status: KeyStatus }) {
    const working = status === "working";
    return (
        <span
            className={`relative flex items-center justify-center w-13 h-13 min-[375px]:w-15 min-[375px]:h-15 sm:w-22 sm:h-22 rounded-full ${
                working ? "bg-[#E3F2FD] text-[#0084FE]" : "bg-[#EEF1F5] text-[#667085]"
            }`}
        >
            <KeyRound className="w-6.5 h-6.5 min-[375px]:w-7.5 min-[375px]:h-7.5 sm:w-11 sm:h-11" strokeWidth={1.75} />
            <span
                className={`absolute -bottom-0.5 -right-0.5 flex items-center justify-center w-5.5 h-5.5 sm:w-8 sm:h-8 rounded-full text-white ring-[3px] ring-white ${
                    working ? "bg-[#16A34A]" : "bg-[#F59E0B]"
                }`}
            >
                {working ? <Check className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={3} /> : <X className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" strokeWidth={3} />}
            </span>
        </span>
    );
}

// Step 4: does the customer still have a working key? (spec §2 step 5)
export default function KeyStatusStep({ vehicle, value, onChange, onBack, onContinue, continuing = false }: KeyStatusStepProps) {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (value) onContinue();
    }

    return (
        <section className="max-w-3xl">
            <h1 className="text-[28px] sm:text-[34px] font-semibold leading-tight tracking-tight">Do you have a working key for this vehicle?</h1>
            <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[#475467]">This helps us prepare the right tools for your visit.</p>
            <VehicleChip vehicle={vehicle} />

            <form onSubmit={handleSubmit} className="mt-8">
                <fieldset>
                    <legend className="sr-only">Working key</legend>
                    <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
                        {KEY_STATUSES.map((status) => (
                            <ChoiceCard
                                key={status.id}
                                name="key-status"
                                value={status.id}
                                checked={value === status.id}
                                onSelect={() => onChange(status.id)}
                                visual={<StatusIcon status={status.id} />}
                                title={status.label}
                                description={status.description}
                            />
                        ))}
                    </div>
                </fieldset>

                {/* Proof of ownership (spec §11) */}
                <p className="mt-6 flex items-start gap-3 rounded-lg bg-[#F5F8FC] px-4 py-3.5 text-sm leading-relaxed text-[#475467]">
                    <ShieldCheck className="mt-0.5 w-4.5 h-4.5 shrink-0 text-[#0084FE]" />
                    <span>
                        <span className="font-semibold text-[#00061A]">For your security:</span> before making a key, our technician will ask
                        for a photo ID and proof that you own the vehicle, like your registration or title.
                    </span>
                </p>

                <StepNav onBack={onBack} canContinue={value !== null} loading={continuing} continueLabel="See your price" className="mt-10" />
            </form>
        </section>
    );
}
