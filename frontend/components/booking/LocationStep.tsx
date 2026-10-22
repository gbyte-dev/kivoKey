"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import Image from "next/image";
import { Check, CircleAlert, CircleCheck, LoaderCircle, MapPin } from "lucide-react";
import { checkZipAction } from "@/app/(booking)/quote/actions";
import { normalizeZip, type ServiceArea, type ZipCheckResult } from "@/lib/booking";
import RequestLocationButton from "@/components/locations/RequestLocationButton";

type LocationStepProps = {
    initialZip: string;
    initialResult: ZipCheckResult | null; // already checked on the server when the URL has ?zip=
    onServiceAreaChange: (area: ServiceArea | null) => void;
    onContinue: () => void;
};

const perks = ["One all-inclusive price", "2-hour arrival windows", "We come to you"];

// Step 1: the customer enters a ZIP; it's checked as soon as 5 digits are typed.
// Booking continues only if an active city serves it; unserved ZIPs get a "notify me" option (spec §2.2, AC-01).
export default function LocationStep({ initialZip, initialResult, onServiceAreaChange, onContinue }: LocationStepProps) {
    const [zip, setZip] = useState(initialZip);
    const [result, setResult] = useState<ZipCheckResult | null>(initialResult);
    const [isChecking, startTransition] = useTransition();
    const latestZip = useRef(initialZip); // ignore answers for a ZIP the customer already changed

    const available = result?.status === "available";

    function check(value: string, continueIfAvailable = false) {
        latestZip.current = value;
        startTransition(async () => {
            const checked = await checkZipAction(value);
            if (latestZip.current !== value) return;
            setResult(checked);
            const area = checked.status === "available" ? { zip: checked.zip, city: checked.city, state: checked.state, slug: checked.slug } : null;
            onServiceAreaChange(area);
            if (area && continueIfAvailable) onContinue();
        });
    }

    function handleChange(raw: string) {
        const value = raw.replace(/[^\d-]/g, "").slice(0, 10);
        setZip(value);
        latestZip.current = value;
        if (result) {
            setResult(null);
            onServiceAreaChange(null);
        }
        // check as soon as a full ZIP is typed
        if (normalizeZip(value)) check(value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (available) onContinue();
        else check(zip, true);
    }

    return (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-16">

            <section>
                <h1 className="text-[28px] sm:text-[34px] font-semibold leading-tight tracking-tight">Where do you need service?</h1>
                <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[#475467]">
                    Enter the ZIP code where your vehicle is. We&apos;ll check that KivoKey serves your area.
                </p>

                <form onSubmit={handleSubmit} className="mt-9">
                    <label htmlFor="booking-zip" className="block text-[15px] font-semibold">
                        ZIP code
                    </label>
                    <div className="relative mt-2">
                        <MapPin aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 text-[#0084FE]" />
                        <input
                            id="booking-zip"
                            value={zip}
                            onChange={(e) => handleChange(e.target.value)}
                            inputMode="numeric"
                            autoComplete="postal-code"
                            pattern="\d{5}(-\d{4})?"
                            title="Please enter a 5-digit ZIP code"
                            required
                            placeholder="Enter ZIP code"
                            aria-describedby="booking-zip-status"
                            className="w-full h-14 rounded-lg border border-[#C9D1DC] bg-white pl-12 pr-12 text-lg outline-none transition-[border-color,box-shadow] placeholder:text-base placeholder:text-[#98A2B3] focus:border-[#0084FE] focus:ring-4 focus:ring-[#0084FE]/10"
                        />
                        {/* status at the end of the field */}
                        <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2">
                            {isChecking ? (
                                <LoaderCircle className="w-5 h-5 animate-spin text-[#0084FE]" />
                            ) : available ? (
                                <CircleCheck className="w-5 h-5 fill-[#16A34A] text-white" />
                            ) : null}
                        </span>
                    </div>

                    {/* Result */}
                    <div id="booking-zip-status" aria-live="polite">
                        {result?.status === "available" && (
                            <p className="mt-3 text-[15px] text-[#166534]">
                                <span className="font-semibold">Good news!</span> KivoKey serves {result.city}, {result.state} ({result.zip}).
                            </p>
                        )}
                        {result?.status === "unavailable" && (
                            <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#F6E3A6] bg-[#FFF9E6] px-4 py-3.5">
                                <CircleAlert className="mt-px w-5 h-5 shrink-0 text-[#B58900]" />
                                <div>
                                    <p className="text-[15px] font-semibold text-[#7A5900]">We don&apos;t serve {result.zip} yet</p>
                                    <p className="mt-0.5 text-sm text-[#475467]">
                                        Online booking isn&apos;t available in this area yet.{" "}
                                        <RequestLocationButton className="font-semibold text-[#0084FE] hover:underline">
                                            Notify me when you&apos;re available
                                        </RequestLocationButton>
                                    </p>
                                </div>
                            </div>
                        )}
                        {result?.status === "invalid" && (
                            <p className="mt-3 text-sm font-medium text-[#C2410C]">Please enter a valid 5-digit ZIP code.</p>
                        )}
                    </div>

                    <div className="mt-10 flex justify-end">
                        <button
                            type="submit"
                            disabled={isChecking || result?.status === "unavailable"}
                            className="h-12 min-w-36 px-9 rounded-full bg-[#0084FE] hover:bg-[#0074e0] disabled:bg-[#E4E9F0] disabled:text-[#98A2B3] disabled:cursor-not-allowed text-white text-base font-semibold transition-colors"
                        >
                            Continue
                        </button>
                    </div>
                </form>

                <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#EDF0F4] pt-6 text-[13px] text-[#667085]">
                    {perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#0084FE]" strokeWidth={3} />
                            {perk}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Photo (desktop) */}
            <div className="relative hidden lg:block overflow-hidden rounded-2xl min-h-110">
                <Image
                    src="/images/hero-van-mobile.jpg"
                    alt="KivoKey mobile service van parked outside a home"
                    fill
                    sizes="(min-width: 1024px) 420px, 0px"
                    preload
                    className="object-cover object-[78%_center]"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/95 px-5 py-4 backdrop-blur">
                    <p className="text-sm font-semibold">Mobile car key service</p>
                    <p className="mt-0.5 text-[13px] text-[#475467]">We come to your home, work, or wherever your car is parked.</p>
                </div>
            </div>
        </div>
    );
}
