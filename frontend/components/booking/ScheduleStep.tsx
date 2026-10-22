"use client";

import { useRef, useState, type FormEvent } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin, MessageSquareText } from "lucide-react";
import {
    ARRIVAL_WINDOWS,
    arrivalWindow,
    formatDay,
    formatPrice,
    type Availability,
    type Quote,
    type Schedule,
    type ServiceArea,
} from "@/lib/booking";
import StepNav from "./StepNav";

type ScheduleStepProps = {
    availability: Availability;
    value: Schedule | null;
    serviceArea: ServiceArea | null;
    quote: Quote | null;
    onChange: (schedule: Schedule | null) => void;
    onBack: () => void;
    onContinue: () => void;
};

const hasOpenWindow = (day: Availability["days"][number]) => day.windows.some((w) => w.available);

// Step 6: a day + one of six 2-hour arrival windows, in the market's local time (spec §2 step 7, §4, AC-06).
// Wording never promises an exact arrival time (AC-18).
export default function ScheduleStep({ availability, value, serviceArea, quote, onChange, onBack, onContinue }: ScheduleStepProps) {
    const firstOpenDay = availability.days.find(hasOpenWindow)?.date ?? availability.days[0].date;
    const [date, setDate] = useState(value?.date ?? firstOpenDay);
    const daysRef = useRef<HTMLDivElement>(null);

    const day = availability.days.find((d) => d.date === date) ?? availability.days[0];
    const chosenWindow = value && value.date === date ? arrivalWindow(value.windowId) : null;

    function selectDay(next: string) {
        setDate(next);
        if (value && value.date !== next) onChange(null);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (value) onContinue();
    }

    const scrollDays = (direction: 1 | -1) => daysRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" });

    return (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,600px)_1fr] lg:gap-14">
            <section className="min-w-0">
                <h1 className="text-[28px] sm:text-[34px] font-semibold leading-tight tracking-tight">Select your arrival window</h1>
                <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[#475467]">
                    Pick a day and a 2-hour window. Your technician will arrive during the window you choose.
                </p>

                <form onSubmit={handleSubmit} className="mt-8">
                    {/* Days (min-w-0: a fieldset otherwise grows to fit the scrolling row) */}
                    <fieldset className="min-w-0">
                        <div className="flex items-center justify-between gap-4">
                            <legend className="text-[15px] font-semibold">Choose a day</legend>
                            <div className="hidden sm:flex gap-2">
                                <button type="button" onClick={() => scrollDays(-1)} aria-label="Earlier days" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#D0D7E2] text-[#475467] hover:border-[#0084FE] hover:text-[#0084FE]">
                                    <ChevronLeft className="w-4.5 h-4.5" />
                                </button>
                                <button type="button" onClick={() => scrollDays(1)} aria-label="Later days" className="flex items-center justify-center w-9 h-9 rounded-full border border-[#D0D7E2] text-[#475467] hover:border-[#0084FE] hover:text-[#0084FE]">
                                    <ChevronRight className="w-4.5 h-4.5" />
                                </button>
                            </div>
                        </div>

                        <div ref={daysRef} className="-mx-4 mt-3 flex snap-x scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0 [scrollbar-width:thin]">
                            {availability.days.map((d) => {
                                const open = hasOpenWindow(d);
                                const selected = d.date === date;
                                return (
                                    <label
                                        key={d.date}
                                        // relative: keeps the visually-hidden radio inside the scrolling row
                                        className={`relative flex w-20 shrink-0 snap-start flex-col items-center rounded-xl border-2 px-2 py-3 text-center transition-colors has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-[#0084FE]/25 ${
                                            !open
                                                ? "cursor-not-allowed border-[#EEF0F3] bg-[#F7F8FA] text-[#98A2B3]"
                                                : selected
                                                  ? "cursor-pointer border-[#0084FE] bg-[#F3F9FF]"
                                                  : "cursor-pointer border-[#E4E7EC] hover:border-[#9CC9FF]"
                                        }`}
                                    >
                                        <input type="radio" name="schedule-day" value={d.date} checked={selected} disabled={!open} onChange={() => selectDay(d.date)} className="sr-only" />
                                        <span className={`text-[13px] font-semibold ${selected && open ? "text-[#0084FE]" : ""}`}>{d.label}</span>
                                        <span className="mt-0.5 text-sm">{d.monthDay}</span>
                                        <span className={`mt-1.5 text-[11px] font-medium ${open ? "text-[#16A34A]" : ""}`}>
                                            {open ? "Available" : d.closed ? "Closed" : "Full"}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* Windows */}
                    <fieldset className="mt-8 min-w-0">
                        <legend className="text-[15px] font-semibold">Choose a 2-hour arrival window</legend>
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {ARRIVAL_WINDOWS.map((w) => {
                                const available = day.windows.find((x) => x.id === w.id)?.available ?? false;
                                const selected = chosenWindow?.id === w.id;
                                return (
                                    <label
                                        key={w.id}
                                        className={`relative flex flex-col rounded-xl border-2 px-3.5 py-3 transition-colors has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-[#0084FE]/25 ${
                                            !available
                                                ? "cursor-not-allowed border-[#EEF0F3] bg-[#F7F8FA] text-[#98A2B3]"
                                                : selected
                                                  ? "cursor-pointer border-[#0084FE] bg-[#F3F9FF]"
                                                  : "cursor-pointer border-[#E4E7EC] hover:border-[#9CC9FF]"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="schedule-window"
                                            value={w.id}
                                            checked={selected}
                                            disabled={!available}
                                            onChange={() => onChange({ date, windowId: w.id, timeZone: availability.timeZone })}
                                            className="sr-only"
                                        />
                                        <span className={`text-[15px] font-semibold whitespace-nowrap ${selected ? "text-[#0084FE]" : ""}`}>{w.short}</span>
                                        <span className="mt-0.5 text-xs">{available ? w.part : "Unavailable"}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>

                    <div className="mt-6 space-y-2 text-[13px] leading-relaxed text-[#667085]">
                        <p className="flex items-start gap-2">
                            <Clock className="mt-0.5 w-4 h-4 shrink-0 text-[#0084FE]" />
                            All times are {availability.timeZoneName}{serviceArea ? `, local to ${serviceArea.city}, ${serviceArea.state}` : ""}.
                        </p>
                        <p className="flex items-start gap-2">
                            <MessageSquareText className="mt-0.5 w-4 h-4 shrink-0 text-[#0084FE]" />
                            We&apos;ll text you when a technician is assigned and when they&apos;re on the way.
                        </p>
                    </div>

                    <StepNav onBack={onBack} canContinue={value !== null} continueLabel="Continue to your details" className="mt-10" />
                </form>
            </section>

            {/* Appointment summary (desktop) */}
            <aside className="hidden lg:block self-start rounded-2xl bg-[#F5F8FC] p-8">
                <p className="text-sm font-semibold">Your appointment</p>
                <div className="mt-5 flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-[#0084FE]">
                        <CalendarDays className="w-5 h-5" />
                    </span>
                    <div>
                        <p className="text-lg font-semibold">{formatDay(date, "long")}</p>
                        <p className={`text-[15px] ${chosenWindow ? "text-[#0084FE] font-semibold" : "text-[#98A2B3]"}`}>
                            {chosenWindow ? `Arrival between ${chosenWindow.label}` : "Choose an arrival window"}
                        </p>
                    </div>
                </div>
                {serviceArea && (
                    <p className="mt-5 flex items-center gap-2 text-sm text-[#475467]">
                        <MapPin className="w-4 h-4 text-[#0084FE]" />
                        {serviceArea.city}, {serviceArea.state} {serviceArea.zip}
                    </p>
                )}
                {quote?.status === "priced" && (
                    <div className="mt-6 flex items-center justify-between border-t border-[#E4E7EC] pt-5">
                        <span className="text-sm text-[#475467]">All-inclusive price</span>
                        <span className="text-xl font-bold">{formatPrice(quote.total)}</span>
                    </div>
                )}
            </aside>
        </div>
    );
}
