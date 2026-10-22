"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { CarFront, MapPin, Phone } from "lucide-react";
import { getVehicleMakesAction, getVehicleModelsAction } from "@/app/(booking)/quote/actions";
import type { ServiceArea, Vehicle, VehicleOption } from "@/lib/booking";
import SelectField from "./SelectField";
import StepNav from "./StepNav";

type VehicleStepProps = {
    years: number[];
    value: Vehicle | null;
    serviceArea: ServiceArea | null;
    onChange: (vehicle: Vehicle | null) => void;
    onBack: () => void;
    onContinue: () => void;
};

// Loaded lists are kept for the whole visit, so coming back to this step shows the same options instantly
const makesCache = new Map<number, VehicleOption[]>();
const modelsCache = new Map<string, VehicleOption[]>();
const modelsKey = (year: number, makeId: string) => `${year}:${makeId}`;

const toOptions = (list: VehicleOption[]) => list.map((o) => ({ value: o.id, label: o.name }));

// Step 2: Year → Make → Model (spec §2 step 3). Only supported vehicles are listed;
// anything else goes through "Can't find your vehicle?" (manual help).
export default function VehicleStep({ years, value, serviceArea, onChange, onBack, onContinue }: VehicleStepProps) {
    const [year, setYear] = useState(value ? String(value.year) : "");
    const [makeId, setMakeId] = useState(value?.makeId ?? "");
    const [modelId, setModelId] = useState(value?.modelId ?? "");
    const [makes, setMakes] = useState<VehicleOption[]>(value ? (makesCache.get(value.year) ?? []) : []);
    const [models, setModels] = useState<VehicleOption[]>(value ? (modelsCache.get(modelsKey(value.year, value.makeId)) ?? []) : []);
    const [loadingMakes, startMakes] = useTransition();
    const [loadingModels, startModels] = useTransition();
    const latest = useRef({ year: "", makeId: "" }); // ignore answers for a selection the customer already changed

    const make = makes.find((m) => m.id === makeId);
    const model = models.find((m) => m.id === modelId);
    const preview = [year, make?.name, model?.name].filter(Boolean).join(" ");

    function selectYear(next: string) {
        setYear(next);
        setMakeId("");
        setModelId("");
        setModels([]);
        onChange(null);
        latest.current = { year: next, makeId: "" };

        const y = Number(next);
        const cached = makesCache.get(y);
        if (cached) return setMakes(cached);
        setMakes([]);
        startMakes(async () => {
            const list = await getVehicleMakesAction(y);
            makesCache.set(y, list);
            if (latest.current.year === next) setMakes(list);
        });
    }

    function selectMake(next: string) {
        setMakeId(next);
        setModelId("");
        onChange(null);
        latest.current = { year, makeId: next };

        const key = modelsKey(Number(year), next);
        const cached = modelsCache.get(key);
        if (cached) return setModels(cached);
        setModels([]);
        startModels(async () => {
            const list = await getVehicleModelsAction(Number(year), next);
            modelsCache.set(key, list);
            if (latest.current.year === year && latest.current.makeId === next) setModels(list);
        });
    }

    function selectModel(next: string) {
        setModelId(next);
        const picked = models.find((m) => m.id === next);
        onChange(make && picked ? { year: Number(year), makeId: make.id, make: make.name, modelId: picked.id, model: picked.name } : null);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (value) onContinue();
    }

    return (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-16">

            <section>
                <h1 className="text-[28px] sm:text-[34px] font-semibold leading-tight tracking-tight">Tell us about your vehicle</h1>
                <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[#475467]">
                    Select your vehicle&apos;s year, make, and model.
                </p>

                <form onSubmit={handleSubmit} className="mt-9 space-y-6">
                    <SelectField
                        id="vehicle-year"
                        label="Year"
                        value={year}
                        onChange={selectYear}
                        options={years.map((y) => ({ value: String(y), label: String(y) }))}
                        placeholder="Select year"
                    />
                    <SelectField
                        id="vehicle-make"
                        label="Make"
                        value={makeId}
                        onChange={selectMake}
                        options={toOptions(makes)}
                        placeholder={year ? "Select make" : "Select a year first"}
                        disabled={!year}
                        loading={loadingMakes}
                    />
                    <SelectField
                        id="vehicle-model"
                        label="Model"
                        value={modelId}
                        onChange={selectModel}
                        options={toOptions(models)}
                        placeholder={makeId ? "Select model" : "Select a make first"}
                        disabled={!makeId}
                        loading={loadingModels}
                    />

                    {/* Can't find your vehicle */}
                    <div className="flex items-start gap-3 rounded-lg bg-[#F5F8FC] px-4 py-4">
                        <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-white text-[#0084FE]">
                            <Phone className="w-4 h-4 fill-current" strokeWidth={0} />
                        </span>
                        <p className="text-sm leading-relaxed text-[#475467]">
                            <span className="block font-semibold text-[#00061A]">Can&apos;t find your vehicle?</span>
                            Some vehicles need a quick check by our team.{" "}
                            <a href="tel:18001234567" className="font-semibold whitespace-nowrap text-[#0084FE] hover:underline">
                                Call 1 (800) 123-4567
                            </a>
                        </p>
                    </div>

                    <StepNav onBack={onBack} canContinue={value !== null} className="pt-4" />
                </form>
            </section>

            {/* Live preview of the chosen vehicle (desktop) */}
            <aside aria-hidden="true" className="hidden lg:flex flex-col items-center justify-center self-start rounded-2xl bg-[#F5F8FC] px-8 py-12 text-center">
                <span
                    className={`flex items-center justify-center w-28 h-28 rounded-full bg-white shadow-[0_2px_10px_rgba(16,24,40,0.06)] transition-colors ${value ? "text-[#0084FE]" : "text-[#B4BDCA]"}`}
                >
                    <CarFront className="w-14 h-14" strokeWidth={1.5} />
                </span>
                <p className="mt-6 text-sm text-[#667085]">Your vehicle</p>
                <p className={`mt-1 min-h-8 text-2xl font-semibold ${preview ? "" : "text-[#B4BDCA]"}`}>{preview || "Year · Make · Model"}</p>
                {serviceArea && (
                    <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] text-[#475467]">
                        <MapPin className="w-3.5 h-3.5 text-[#0084FE]" />
                        Service in {serviceArea.city}, {serviceArea.state} {serviceArea.zip}
                    </p>
                )}
            </aside>
        </div>
    );
}
