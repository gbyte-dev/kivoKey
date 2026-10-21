"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, CircleCheck } from "lucide-react";
import { US_STATES } from "@/lib/us-states";

// Same field style as dropoff.com's "Request A Location" form
const inputClass =
    "w-full h-12 rounded-lg border-2 border-[#ECEEF1] bg-[#F8F9FA] px-4 text-base text-[#00061A] outline-none transition-colors focus:border-[#0090FF] focus:bg-white";
const labelClass = "block text-sm text-[#33435C] mb-2";

export default function RequestLocationForm({ onDone }: { onDone?: () => void }) {
    const [requested, setRequested] = useState<string | null>(null);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // TODO(backend): send the request (firstName, email, phone, company, state, city) to the Node.js API /
        // admin dashboard. Until then nothing is saved; this only shows the confirmation.
        setRequested(`${data.get("city")}, ${data.get("state")}`);
    }

    if (requested) {
        return (
            <div role="status" className="flex flex-col items-center text-center py-4">
                <CircleCheck className="w-12 h-12 text-[#0084FE]" strokeWidth={1.75} />
                <p className="mt-4 text-xl font-bold">Thanks for your request!</p>
                <p className="mt-2 text-[#33435C]">We&apos;ll let you know when KivoKey comes to {requested}.</p>
                {onDone && (
                    <button
                        type="button"
                        onClick={onDone}
                        className="mt-6 h-12 px-10 rounded-full bg-[#0084FE] hover:bg-[#0074e0] text-white font-bold transition-colors"
                    >
                        Close
                    </button>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-x-3 gap-y-6 sm:grid-cols-2">
            <div>
                <label htmlFor="req-first-name" className={labelClass}>First name</label>
                <input id="req-first-name" name="firstName" required autoComplete="given-name" className={inputClass} />
            </div>
            <div>
                <label htmlFor="req-email" className={labelClass}>Email</label>
                <input id="req-email" name="email" type="email" required autoComplete="email" className={inputClass} />
            </div>
            <div>
                <label htmlFor="req-phone" className={labelClass}>Phone</label>
                <input id="req-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} />
            </div>
            <div>
                <label htmlFor="req-company" className={labelClass}>Company</label>
                {/* not required: most KivoKey customers are individuals */}
                <input id="req-company" name="company" autoComplete="organization" className={inputClass} />
            </div>
            <div>
                <label htmlFor="req-state" className={labelClass}>State</label>
                <div className="relative">
                    <select id="req-state" name="state" required defaultValue="" className={`${inputClass} appearance-none pr-10 cursor-pointer`}>
                        <option value="" disabled hidden />
                        {US_STATES.map((s) => (
                            <option key={s.abbr} value={s.abbr}>{s.name}</option>
                        ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 w-5 h-5 -translate-y-1/2 text-[#33435C]" />
                </div>
            </div>
            <div>
                <label htmlFor="req-city" className={labelClass}>City</label>
                <input id="req-city" name="city" required autoComplete="address-level2" className={inputClass} />
            </div>
            <div className="sm:col-span-2 mt-1">
                <button
                    type="submit"
                    className="h-12 px-8 rounded-full bg-[#0084FE] hover:bg-[#0074e0] text-white text-base font-bold transition-colors active:scale-[0.98]"
                >
                    Submit Request
                </button>
            </div>
        </form>
    );
}
