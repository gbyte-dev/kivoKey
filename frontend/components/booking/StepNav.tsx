import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";

type StepNavProps = {
    onBack: () => void;
    canContinue: boolean;
    loading?: boolean; // e.g. while the price is being worked out
    continueLabel?: string;
    className?: string;
};

// Back + Continue row at the bottom of a step. Continue submits the step's <form>.
export default function StepNav({ onBack, canContinue, loading = false, continueLabel = "Continue", className = "" }: StepNavProps) {
    return (
        <div className={`flex items-center justify-between gap-3 ${className}`}>
            <button
                type="button"
                onClick={onBack}
                className="inline-flex shrink-0 items-center gap-2 h-12 px-5 sm:px-6 rounded-full border border-[#C9D1DC] text-[15px] font-semibold hover:border-[#0084FE] hover:text-[#0084FE] transition-colors"
            >
                <ArrowLeft className="w-4.5 h-4.5" />
                Back
            </button>
            <button
                type="submit"
                disabled={!canContinue || loading}
                className="inline-flex items-center justify-center gap-2 h-12 min-w-36 px-6 sm:px-9 rounded-full whitespace-nowrap bg-[#0084FE] hover:bg-[#0074e0] disabled:bg-[#E4E9F0] disabled:text-[#98A2B3] disabled:cursor-not-allowed text-white text-base font-semibold transition-colors"
            >
                {loading && <LoaderCircle className="w-4.5 h-4.5 animate-spin" />}
                {continueLabel === "Continue" ? (
                    "Continue"
                ) : (
                    <>
                        {/* phones: a short label so the button never wraps */}
                        <span className="hidden sm:inline">{continueLabel}</span>
                        <span className="sm:hidden">Continue</span>
                        {!loading && <ArrowRight className="hidden sm:block w-4.5 h-4.5" />}
                    </>
                )}
            </button>
        </div>
    );
}
