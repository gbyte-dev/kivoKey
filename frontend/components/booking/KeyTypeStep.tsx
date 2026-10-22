"use client";

import type { FormEvent } from "react";
import { Lightbulb } from "lucide-react";
import { KEY_TYPES, type KeyType, type Vehicle } from "@/lib/booking";
import ChoiceCard from "./ChoiceCard";
import KeyIllustration from "./KeyIllustrations";
import StepNav from "./StepNav";
import VehicleChip from "./VehicleChip";

type KeyTypeStepProps = {
    vehicle: Vehicle | null;
    value: KeyType | null;
    onChange: (keyType: KeyType) => void;
    onBack: () => void;
    onContinue: () => void;
};

// Step 3: one of the three key categories, as picture cards (spec §2 step 4).
// Whether a category can be priced for this exact vehicle is decided in the Price step (spec §2 step 6).
export default function KeyTypeStep({ vehicle, value, onChange, onBack, onContinue }: KeyTypeStepProps) {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (value) onContinue();
    }

    return (
        <section>
            <h1 className="text-[28px] sm:text-[34px] font-semibold leading-tight tracking-tight">What type of key do you need?</h1>
            <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[#475467]">Choose the type of key your vehicle uses.</p>
            <VehicleChip vehicle={vehicle} />

            <form onSubmit={handleSubmit} className="mt-8">
                <fieldset>
                    <legend className="sr-only">Key type</legend>
                    <div className="grid gap-4 sm:grid-cols-3 lg:gap-6">
                        {KEY_TYPES.map((key) => (
                            <ChoiceCard
                                key={key.id}
                                name="key-type"
                                value={key.id}
                                checked={value === key.id}
                                onSelect={() => onChange(key.id)}
                                visual={<KeyIllustration type={key.id} className="h-16 min-[375px]:h-20 sm:h-34 w-auto" />}
                                title={
                                    <>
                                        {key.label}
                                        {key.detail && <span className="font-normal text-[#667085]"> ({key.detail})</span>}
                                    </>
                                }
                                description={key.description}
                            />
                        ))}
                    </div>
                </fieldset>

                {/* Help choosing */}
                <p className="mt-6 flex items-start gap-3 rounded-lg bg-[#F5F8FC] px-4 py-3.5 text-sm leading-relaxed text-[#475467]">
                    <Lightbulb className="mt-0.5 w-4.5 h-4.5 shrink-0 text-[#0084FE]" />
                    <span>
                        <span className="font-semibold text-[#00061A]">Not sure?</span> If you start your car by pressing a START button,
                        choose Smart key / Push-to-start. If you turn a key in the ignition, look for buttons on the key head.
                    </span>
                </p>

                <StepNav onBack={onBack} canContinue={value !== null} className="mt-10" />
            </form>
        </section>
    );
}
