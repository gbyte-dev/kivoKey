"use client";

import type { ReactNode } from "react";

// Event the "Request a location" modal (mounted once in the root layout) listens for
export const OPEN_REQUEST_LOCATION = "kivokey:open-request-location";

// Looks like a link, opens the "Request a location" modal on the current page
export default function RequestLocationButton({ className = "", children }: { className?: string; children: ReactNode }) {
    return (
        <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => window.dispatchEvent(new Event(OPEN_REQUEST_LOCATION))}
            className={`cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
}
