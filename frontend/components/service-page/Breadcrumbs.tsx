import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#33435C]">
                {items.map((item, i) => (
                    <li key={item.label} className="flex items-center gap-1.5">
                        {i > 0 && <ChevronRight aria-hidden="true" className="w-3.5 h-3.5 text-gray-400" />}
                        {item.href ? (
                            <Link href={item.href} className="hover:text-[#0084FE] transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span aria-current="page" className="font-semibold text-[#00061A]">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
