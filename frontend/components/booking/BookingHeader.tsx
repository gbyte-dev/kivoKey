"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { BOOKING_STEPS } from "@/lib/booking";

type BookingHeaderProps = {
    step: number;
    stepsOpen?: boolean;
    onToggleSteps?: () => void; // not passed in the loading skeleton
};

// Focused header for the booking flow (Safelite-style): thin progress line on top, logo, help phone,
// and a "Step 1 of 8" pill that opens the progress drawer (it turns into "Close" while open).
export default function BookingHeader({ step, stepsOpen = false, onToggleSteps }: BookingHeaderProps) {
    const progress = ((step + 0.5) / BOOKING_STEPS.length) * 100;

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            {/* Overall progress */}
            <div className="h-1 w-full bg-[#E3F2FD]" aria-hidden="true">
                <div className="h-full bg-[#0084FE] transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>

            <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
                <Link href="/" aria-label="KivoKey home" className="shrink-0">
                    <Image src="/images/kivokey-logo.png" alt="KivoKey" width={820} height={216} loading="eager" className="h-7 min-[375px]:h-8 lg:h-10 w-auto" />
                </Link>

                <div className="flex shrink-0 items-center gap-2 min-[375px]:gap-3 sm:gap-5">
                    <a href="tel:18001234567" className="group flex items-center gap-2">
                        <span className="hidden md:block text-[13px] font-semibold uppercase tracking-wide text-[#0084FE] group-hover:text-[#0070D0]">
                            Need help?
                        </span>
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0084FE] text-white" aria-label="Call 1 (800) 123-4567">
                            <Phone className="w-4 h-4 fill-current" strokeWidth={0} />
                        </span>
                    </a>

                    <button
                        type="button"
                        onClick={onToggleSteps}
                        disabled={!onToggleSteps}
                        aria-expanded={stepsOpen}
                        aria-controls="booking-steps"
                        className="flex items-center gap-2 min-[375px]:gap-2.5 h-10 pl-3.5 pr-3 min-[375px]:pl-4 rounded-full bg-white whitespace-nowrap text-sm min-[375px]:text-[15px] font-semibold text-[#0084FE] shadow-[0_1px_6px_rgba(16,24,40,0.14)] hover:shadow-[0_2px_10px_rgba(16,24,40,0.18)] transition-shadow"
                    >
                        {stepsOpen ? (
                            <>
                                Close
                                <X className="w-5 h-5 shrink-0" strokeWidth={2} />
                            </>
                        ) : (
                            <>
                                {/* very small phones: "1 of 8" */}
                                <span>
                                    <span className="max-[359px]:sr-only">Step </span>
                                    {step + 1} of {BOOKING_STEPS.length}
                                </span>
                                <Menu className="w-5 h-5 shrink-0" strokeWidth={2} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
