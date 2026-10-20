import { ChevronDown } from "lucide-react";
import type { Service } from "@/lib/services";

// Native <details> accordion: works without JavaScript and is keyboard accessible
export default function ServiceFaq({ faqs }: { faqs: Service["faqs"] }) {
    return (
        <section id="faqs" className="w-full bg-[#F3F8FF] py-16 sm:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00061A] text-center">
                    Frequently asked questions
                </h2>

                <div className="mt-10 space-y-3">
                    {faqs.map((faq) => (
                        <details key={faq.question} className="group rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base sm:text-lg font-bold text-[#00061A] [&::-webkit-details-marker]:hidden">
                                {faq.question}
                                <ChevronDown className="w-5 h-5 shrink-0 text-[#0084FE] transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="px-6 pb-6 -mt-1 text-base leading-relaxed text-[#33435C]">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
