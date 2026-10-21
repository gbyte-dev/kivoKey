"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { OPEN_REQUEST_LOCATION } from "./RequestLocationButton";
import RequestLocationForm from "./RequestLocationForm";

// "Request a Location" popup (like dropoff.com). Mounted once in the root layout and opened by
// RequestLocationButton, or by visiting a page with #request-location in the URL.
// Uses the native <dialog>: it handles focus, Esc to close, and sits above the sticky header.
export default function RequestLocationModal() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [formKey, setFormKey] = useState(0); // a fresh, empty form every time it opens

    useEffect(() => {
        const open = () => {
            const dialog = dialogRef.current;
            if (!dialog || dialog.open) return;
            dialog.showModal();
            document.documentElement.style.overflow = "hidden"; // no page scrolling behind the popup
        };
        window.addEventListener(OPEN_REQUEST_LOCATION, open);
        if (window.location.hash === "#request-location") open();
        return () => window.removeEventListener(OPEN_REQUEST_LOCATION, open);
    }, []);

    const close = () => dialogRef.current?.close();

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="request-location-title"
            onClose={() => {
                document.documentElement.style.overflow = "";
                setFormKey((k) => k + 1);
            }}
            // click on the dark backdrop closes it
            onClick={(e) => e.target === e.currentTarget && close()}
            className="m-auto w-[calc(100%-2rem)] max-w-120 max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl bg-white p-0 text-[#00061A] shadow-2xl backdrop:bg-[#00061A]/60"
        >
            <div className="relative px-6 pt-9 pb-8 sm:px-8">
                <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="absolute right-2 top-2 p-1.5 text-[#00061A] hover:text-[#0084FE] transition-colors"
                >
                    <X className="w-6 h-6" strokeWidth={2} />
                </button>

                <h2 id="request-location-title" className="pr-8 text-2xl font-semibold">
                    Request A Location
                </h2>
                <p className="mt-2 text-base leading-relaxed text-[#33435C]">
                    Fill in your request and we will reach out to you about servicing your area shortly.
                </p>

                <div className="mt-8">
                    <RequestLocationForm key={formKey} onDone={close} />
                </div>
            </div>
        </dialog>
    );
}
