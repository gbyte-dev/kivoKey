import Link from "next/link";
import { Phone } from "lucide-react";

// "Get quote + schedule" and "Call" buttons used across the service pages
export default function CtaButtons({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
            <Link
                href="/quote"
                className="inline-flex items-center justify-center h-13 px-8 rounded-full bg-[#FEE802] hover:bg-[#F2DC00] text-[#02020E] text-base sm:text-lg font-bold shadow-sm transition-colors active:scale-95"
            >
                Get quote + schedule
            </Link>
            <a
                href="tel:18001234567"
                className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-full border-2 border-[#0084FE] bg-white text-[#0084FE] text-base sm:text-lg font-bold transition-colors hover:bg-[#0084FE]/5"
            >
                <Phone className="w-5 h-5 fill-current" strokeWidth={0} />
                Call 1 (800) 123-4567
            </a>
        </div>
    );
}
