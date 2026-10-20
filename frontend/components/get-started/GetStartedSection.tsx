import Link from "next/link";
import { ArrowRight, Clock, FileText, Phone } from "lucide-react";
import BrushHighlight from "./BrushHighlight";
import ContactOption from "./ContactOption";

export default function GetStartedSection() {
    return (
        <section id="contact" className="w-full bg-white py-14 sm:py-16">
            <div className="max-w-250 mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#00061A]">
                        Get Started with{" "}
                        <BrushHighlight>
                            <span className="font-extrabold text-[#0090FF]">KivoKey</span>
                        </BrushHighlight>
                    </h2>
                    <p className="mt-3 text-base sm:text-lg text-[#33435C]">
                        Fast, mobile car key services in Columbus, OH and nearby areas.
                    </p>
                </div>

                <div className="mt-10 sm:mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-x-14">

                    {/* Left: Quote + Schedule */}
                    <div>
                        <ContactOption
                            icon={<FileText className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={2.25} />}
                            title="Get a Quote + Schedule"
                            description="Enter your vehicle details to see your price and book an appointment."
                        />
                        <Link
                            href="/quote"
                            className="group relative mt-7 flex items-center justify-center w-full h-14 sm:h-15 rounded-full bg-[#0095FE] text-white text-lg sm:text-xl font-bold shadow-sm transition-colors hover:bg-[#0080dd] active:scale-[0.99]"
                        >
                            Get a Quote + Schedule
                            <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1 sm:ml-0 sm:absolute sm:right-8" />
                        </Link>
                    </div>

                    {/* Right: Call Us */}
                    <ContactOption
                        icon={<Phone className="w-7 h-7 sm:w-8 sm:h-8 fill-current" strokeWidth={0} />}
                        title="Call Us"
                        description="Need help or have questions? Speak with our team."
                    >
                        <a
                            href="tel:+13803245459"
                            className="mt-3 inline-flex items-center gap-3 whitespace-nowrap text-[26px] sm:text-[32px] font-bold text-[#0095FE] hover:text-[#0080dd] transition-colors"
                        >
                            <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-current" strokeWidth={0} />
                            (380) 324-5459
                        </a>

                        <div className="mt-3 flex items-start gap-3">
                            <Clock className="mt-0.5 w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-[#0095FE]" strokeWidth={2.25} />
                            <p className="text-base sm:text-lg leading-snug">
                                <span className="block font-bold text-[#00061A]">Monday – Saturday</span>
                                <span className="block text-[#3E4F6B]">8:00 AM – 8:00 PM</span>
                            </p>
                        </div>
                    </ContactOption>

                </div>
            </div>
        </section>
    );
}
