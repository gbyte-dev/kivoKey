"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronRight, CircleCheck, CircleX, MapPin } from "lucide-react";
import RequestLocationButton from "./RequestLocationButton";

type ZipCheckerProps = {
    zips: string[];
    cityLabel: string; // e.g. "Columbus, OH"
};

export default function ZipChecker({ zips, cityLabel }: ZipCheckerProps) {
    const [zip, setZip] = useState("");
    const [result, setResult] = useState<{ zip: string; served: boolean } | null>(null);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // TODO(backend): ask the Node.js API which city (if any) serves this ZIP, not just this city's list
        setResult({ zip, served: zips.includes(zip) });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <label className="flex sm:flex-1 items-center gap-3 h-13 rounded-full border border-gray-200 bg-white px-5 transition-colors focus-within:border-[#0090FF] focus-within:ring-2 focus-within:ring-[#0090FF]/20">
                    <MapPin className="w-5 h-5 shrink-0 text-[#0084FE]" />
                    <input
                        value={zip}
                        onChange={(e) => {
                            setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                            setResult(null);
                        }}
                        inputMode="numeric"
                        autoComplete="postal-code"
                        pattern="[0-9]{5}"
                        title="Please enter a 5-digit ZIP code"
                        required
                        placeholder="Enter your ZIP code"
                        aria-label="ZIP code"
                        className="w-full bg-transparent text-base text-[#00061A] placeholder:text-gray-400 outline-none"
                    />
                </label>
                <button
                    type="submit"
                    className="h-13 px-8 rounded-full bg-[#0084FE] hover:bg-[#0074e0] text-white text-base font-bold transition-colors active:scale-95"
                >
                    Check
                </button>
            </form>

            {result && (
                <div
                    role="status"
                    className={`mt-4 flex max-w-lg items-start gap-3 rounded-xl p-4 ${result.served ? "bg-[#E3F2FD]" : "bg-[#FFF6D1]"}`}
                >
                    {result.served ? (
                        <>
                            <CircleCheck className="mt-0.5 w-6 h-6 shrink-0 text-[#0084FE]" />
                            <div>
                                <p className="font-bold text-[#00061A]">Good news! We serve {result.zip}.</p>
                                <p className="mt-0.5 text-sm text-[#33435C]">A technician can come to you in the {cityLabel} area.</p>
                                <Link href={`/quote?zip=${result.zip}`} className="mt-2 inline-flex items-center gap-0.5 text-sm font-bold text-[#0084FE] hover:underline">
                                    Get quote + schedule
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <CircleX className="mt-0.5 w-6 h-6 shrink-0 text-[#B58900]" />
                            <div>
                                <p className="font-bold text-[#00061A]">{result.zip} isn&apos;t in our {cityLabel} area yet.</p>
                                <p className="mt-0.5 text-sm text-[#33435C]">
                                    <Link href="/locations" className="font-semibold text-[#0084FE] hover:underline">See all cities</Link>
                                    {" "}or{" "}
                                    <RequestLocationButton className="font-semibold text-[#0084FE] hover:underline">request your area</RequestLocationButton>.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
