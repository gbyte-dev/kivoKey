"use client";

import { useEffect } from "react";
import { Check, Phone } from "lucide-react";
import { BOOKING_STEPS } from "@/lib/booking";

type BookingStepsDrawerProps = {
    open: boolean;
    step: number; // current step index
    values: (string | null)[]; // what the customer picked in each step (shown under finished steps)
    onSelectStep: (index: number) => void;
    onClose: () => void;
};

// Safelite-style progress drawer: a vertical rail that fills as steps are completed.
// Finished steps show their answer and can be clicked to go back and change it.
// Every row has the same height, so the rail fill can stop exactly at the current step's dot
const ROW_HEIGHT = 88; // px, matches h-22
const DOT_TOP = 16; // px, matches pt-4
const DOT_SIZE = 24; // px, matches w-6 / h-6

export default function BookingStepsDrawer({ open, step, values, onSelectStep, onClose }: BookingStepsDrawerProps) {
    const fillHeight = step * ROW_HEIGHT + DOT_SIZE / 2;

    // While open: Esc closes, page behind doesn't scroll
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        document.documentElement.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.documentElement.style.overflow = "";
        };
    }, [open, onClose]);

    return (
        <>
            {/* Dim the page (the header stays on top so the pill can close it) */}
            <div
                aria-hidden="true"
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-[#00061A]/45 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />

            <nav
                id="booking-steps"
                aria-label="Booking steps"
                inert={!open}
                className={`fixed inset-y-0 right-0 z-40 flex w-[min(340px,88vw)] flex-col overflow-y-auto bg-white pt-24 lg:pt-28 pb-8 pl-8 pr-6 transition-transform duration-300 ease-out ${open ? "translate-x-0 shadow-[-8px_0_30px_rgba(0,6,26,0.12)]" : "translate-x-full"}`}
            >
                <ol className="relative">
                    {/* Rail: light track from the first to the last dot, blue fill up to the current step */}
                    <span
                        aria-hidden="true"
                        className="absolute left-0 w-6 rounded-full bg-[#E3F2FD]"
                        style={{ top: DOT_TOP, bottom: ROW_HEIGHT - DOT_TOP - DOT_SIZE }}
                    >
                        <span className="block w-full rounded-full bg-[#0084FE] transition-[height] duration-500" style={{ height: fillHeight }} />
                    </span>

                    {BOOKING_STEPS.map((s, i) => {
                        const done = i < step;
                        const current = i === step;
                        const value = values[i];
                        return (
                            <li key={s.id} className="relative">
                                <button
                                    type="button"
                                    disabled={i > step}
                                    onClick={() => onSelectStep(i)}
                                    aria-current={current ? "step" : undefined}
                                    className="group flex h-22 w-full items-start gap-5 pt-4 text-left disabled:cursor-default"
                                >
                                    {/* Dot */}
                                    <span
                                        className={`relative z-10 flex items-center justify-center w-6 h-6 shrink-0 rounded-full ${
                                            done
                                                ? "bg-[#0084FE] text-white ring-2 ring-white"
                                                : current
                                                  ? "bg-white border-[3px] border-[#0084FE] ring-4 ring-[#0084FE]/15"
                                                  : "bg-white border-[1.5px] border-[#C9D1DC]"
                                        }`}
                                    >
                                        {done && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                                    </span>

                                    <span className="min-w-0 -mt-0.5">
                                        <span className="block text-xs text-[#667085]">
                                            Step {i + 1} of {BOOKING_STEPS.length}
                                        </span>
                                        <span
                                            className={`block text-xl leading-tight ${
                                                current ? "font-semibold text-[#00061A]" : done ? "text-[#00061A] group-hover:text-[#0084FE]" : "text-[#475467]"
                                            }`}
                                        >
                                            {s.label}
                                        </span>
                                        {done && value && <span className="mt-0.5 block truncate text-[13px] text-[#0084FE]">{value}</span>}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ol>

                <a href="tel:18001234567" className="mt-auto flex items-center gap-3 border-t border-[#EDF0F4] pt-6 text-sm">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#EAF4FF] text-[#0084FE]">
                        <Phone className="w-4 h-4 fill-current" strokeWidth={0} />
                    </span>
                    <span className="leading-tight">
                        <span className="block text-[#667085]">Questions about your booking?</span>
                        <span className="block font-semibold text-[#00061A]">Call 1 (800) 123-4567</span>
                    </span>
                </a>
            </nav>
        </>
    );
}
