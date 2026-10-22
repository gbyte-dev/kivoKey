"use client";

import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { checkZipAction } from "@/app/(booking)/quote/actions";
import { formatPhone, type BookingDetails, type ServiceArea } from "@/lib/booking";
import { US_STATES } from "@/lib/us-states";
import StepNav from "./StepNav";
import TextField, { fieldClass } from "./TextField";

type DetailsStepProps = {
    value: BookingDetails | null;
    serviceArea: ServiceArea | null;
    summary: ReactNode; // "Your booking" card (desktop)
    onSubmit: (details: BookingDetails) => void;
    onBack: () => void;
};

type Form = {
    street: string; unit: string; city: string; state: string; zip: string; notes: string;
    firstName: string; lastName: string; phone: string; email: string;
    agreeTerms: boolean; agreeSms: boolean;
};
type Errors = Partial<Record<keyof Form, string>>;

// Field id for each value, in screen order (used to focus the first problem)
const FIELD_IDS: Record<keyof Form, string> = {
    street: "addr-street", unit: "addr-unit", city: "addr-city", state: "addr-state", zip: "addr-zip", notes: "addr-notes",
    firstName: "cust-first", lastName: "cust-last", phone: "cust-phone", email: "cust-email",
    agreeTerms: "consent-terms", agreeSms: "consent-sms",
};

function validate(f: Form): Errors {
    const errors: Errors = {};
    if (f.street.trim().length < 3) errors.street = "Enter the street address where your vehicle is.";
    if (!f.city.trim()) errors.city = "Enter the city.";
    if (!f.state) errors.state = "Choose the state.";
    if (!/^\d{5}$/.test(f.zip)) errors.zip = "Enter a 5-digit ZIP code.";
    if (!f.firstName.trim()) errors.firstName = "Enter your first name.";
    if (!f.lastName.trim()) errors.lastName = "Enter your last name.";
    if (f.phone.replace(/\D/g, "").length !== 10) errors.phone = "Enter a 10-digit phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = "Enter a valid email address.";
    if (!f.agreeTerms) errors.agreeTerms = "Please accept the terms to continue.";
    return errors;
}

// Step 7: service address + contact details + consents (spec §2 step 8, §2.1, §11).
// The address ZIP must be in the service area chosen in step 1 (its time zone and windows were used for step 6).
export default function DetailsStep({ value, serviceArea, summary, onSubmit, onBack }: DetailsStepProps) {
    const [form, setForm] = useState<Form>(() => ({
        street: value?.address.street ?? "",
        unit: value?.address.unit ?? "",
        city: value?.address.city ?? serviceArea?.city ?? "",
        state: value?.address.state ?? serviceArea?.state ?? "",
        zip: value?.address.zip ?? serviceArea?.zip ?? "",
        notes: value?.address.notes ?? "",
        firstName: value?.customer.firstName ?? "",
        lastName: value?.customer.lastName ?? "",
        phone: value ? formatPhone(value.customer.phone) : "",
        email: value?.customer.email ?? "",
        agreeTerms: Boolean(value?.consents.termsAcceptedAt),
        agreeSms: Boolean(value?.consents.smsConsentAt),
    }));
    const [errors, setErrors] = useState<Errors>({});
    const [isChecking, startChecking] = useTransition();

    function set<K extends keyof Form>(key: K, next: Form[K]) {
        setForm((f) => ({ ...f, [key]: next }));
        if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    }

    function showErrors(next: Errors) {
        setErrors(next);
        const first = (Object.keys(FIELD_IDS) as (keyof Form)[]).find((k) => next[k]);
        if (first) document.getElementById(FIELD_IDS[first])?.focus();
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const found = validate(form);
        if (Object.keys(found).length) return showErrors(found);

        // TODO(backend): normalize + geocode the address (Google Places / Geocoding, spec §9) instead of ZIP only
        startChecking(async () => {
            const coverage = await checkZipAction(form.zip);
            if (coverage.status !== "available") {
                return showErrors({ zip: "KivoKey doesn't serve this ZIP code yet." });
            }
            if (serviceArea && coverage.slug !== serviceArea.slug) {
                return showErrors({ zip: `This ZIP is outside the ${serviceArea.city}, ${serviceArea.state} area you chose. Go back to step 1 to change your location.` });
            }
            const now = new Date().toISOString();
            onSubmit({
                address: { street: form.street.trim(), unit: form.unit.trim(), city: form.city.trim(), state: form.state, zip: form.zip, notes: form.notes.trim() },
                customer: { firstName: form.firstName.trim(), lastName: form.lastName.trim(), phone: form.phone.replace(/\D/g, ""), email: form.email.trim() },
                consents: {
                    termsAcceptedAt: value?.consents.termsAcceptedAt ?? now,
                    smsConsentAt: form.agreeSms ? (value?.consents.smsConsentAt ?? now) : null,
                },
            });
        });
    }

    return (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,600px)_1fr] lg:gap-14">
            <section className="min-w-0">
                <h1 className="text-[28px] sm:text-[34px] font-semibold leading-tight tracking-tight">Where should we meet you?</h1>
                <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[#475467]">
                    Tell us where your vehicle will be and how to reach you.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-8">
                    {/* Service address */}
                    <fieldset className="min-w-0">
                        <legend className="text-lg font-semibold">Service address</legend>
                        <div className="mt-4 grid gap-4 sm:grid-cols-6">
                            <TextField
                                id={FIELD_IDS.street}
                                label="Street address"
                                className="sm:col-span-6"
                                icon={<MapPin className="w-5 h-5" />}
                                autoComplete="address-line1"
                                placeholder="123 Main St"
                                value={form.street}
                                onChange={(e) => set("street", e.target.value)}
                                error={errors.street}
                            />
                            <TextField
                                id={FIELD_IDS.unit}
                                label="Apt / Suite"
                                optional
                                className="sm:col-span-2"
                                autoComplete="address-line2"
                                value={form.unit}
                                maxLength={30}
                                onChange={(e) => set("unit", e.target.value)}
                            />
                            <TextField
                                id={FIELD_IDS.city}
                                label="City"
                                className="sm:col-span-4"
                                autoComplete="address-level2"
                                value={form.city}
                                onChange={(e) => set("city", e.target.value)}
                                error={errors.city}
                            />
                            <div className="sm:col-span-3">
                                <label htmlFor={FIELD_IDS.state} className="block text-sm font-semibold">State</label>
                                <div className="relative mt-1.5">
                                    <select
                                        id={FIELD_IDS.state}
                                        value={form.state}
                                        onChange={(e) => set("state", e.target.value)}
                                        autoComplete="address-level1"
                                        aria-invalid={errors.state ? true : undefined}
                                        className={`${fieldClass(Boolean(errors.state))} appearance-none pr-11 cursor-pointer`}
                                    >
                                        <option value="" disabled>Select state</option>
                                        {US_STATES.map((s) => (
                                            <option key={s.abbr} value={s.abbr}>{s.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 w-5 h-5 -translate-y-1/2 text-[#0084FE]" />
                                </div>
                                {errors.state && <p className="mt-1.5 text-[13px] text-[#D92D20]">{errors.state}</p>}
                            </div>
                            <TextField
                                id={FIELD_IDS.zip}
                                label="ZIP code"
                                className="sm:col-span-3"
                                inputMode="numeric"
                                autoComplete="postal-code"
                                maxLength={5}
                                value={form.zip}
                                onChange={(e) => set("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                                error={errors.zip}
                            />
                            <div className="sm:col-span-6">
                                <label htmlFor={FIELD_IDS.notes} className="block text-sm font-semibold">
                                    Notes for the technician <span className="font-normal text-[#98A2B3]">(optional)</span>
                                </label>
                                <textarea
                                    id={FIELD_IDS.notes}
                                    rows={3}
                                    maxLength={300}
                                    value={form.notes}
                                    onChange={(e) => set("notes", e.target.value)}
                                    placeholder="Parking instructions, gate code, where the vehicle is parked…"
                                    className="mt-1.5 w-full rounded-lg border border-[#C9D1DC] bg-white px-4 py-3 text-base outline-none transition-[border-color,box-shadow] placeholder:text-[#98A2B3] focus:border-[#0084FE] focus:ring-4 focus:ring-[#0084FE]/10"
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* Contact */}
                    <fieldset className="mt-10 min-w-0">
                        <legend className="text-lg font-semibold">Your contact information</legend>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <TextField
                                id={FIELD_IDS.firstName}
                                label="First name"
                                autoComplete="given-name"
                                value={form.firstName}
                                onChange={(e) => set("firstName", e.target.value)}
                                error={errors.firstName}
                            />
                            <TextField
                                id={FIELD_IDS.lastName}
                                label="Last name"
                                autoComplete="family-name"
                                value={form.lastName}
                                onChange={(e) => set("lastName", e.target.value)}
                                error={errors.lastName}
                            />
                            <TextField
                                id={FIELD_IDS.phone}
                                label="Mobile phone"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel-national"
                                icon={<Phone className="w-4.5 h-4.5" />}
                                placeholder="(555) 123-4567"
                                value={form.phone}
                                onChange={(e) => set("phone", formatPhone(e.target.value))}
                                error={errors.phone}
                            />
                            <TextField
                                id={FIELD_IDS.email}
                                label="Email"
                                type="email"
                                autoComplete="email"
                                icon={<Mail className="w-4.5 h-4.5" />}
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => set("email", e.target.value)}
                                error={errors.email}
                            />
                        </div>
                    </fieldset>

                    {/* Consents (spec §2.1, §11) — wording to be approved by the owner (spec §14) */}
                    <div className="mt-8 space-y-4">
                        <div>
                            <label className="flex items-start gap-3 text-sm leading-relaxed text-[#344054] cursor-pointer">
                                <input
                                    id={FIELD_IDS.agreeTerms}
                                    type="checkbox"
                                    checked={form.agreeTerms}
                                    onChange={(e) => set("agreeTerms", e.target.checked)}
                                    aria-invalid={errors.agreeTerms ? true : undefined}
                                    className="mt-0.5 w-5 h-5 shrink-0 accent-[#0084FE] cursor-pointer"
                                />
                                <span>
                                    I agree to KivoKey&apos;s{" "}
                                    <a href="#terms" className="font-semibold text-[#0084FE] hover:underline">Terms of Service</a> and{" "}
                                    <a href="#privacy" className="font-semibold text-[#0084FE] hover:underline">Privacy Policy</a>.
                                </span>
                            </label>
                            {errors.agreeTerms && <p className="mt-1.5 pl-8 text-[13px] text-[#D92D20]">{errors.agreeTerms}</p>}
                        </div>
                        <label className="flex items-start gap-3 text-sm leading-relaxed text-[#344054] cursor-pointer">
                            <input
                                id={FIELD_IDS.agreeSms}
                                type="checkbox"
                                checked={form.agreeSms}
                                onChange={(e) => set("agreeSms", e.target.checked)}
                                className="mt-0.5 w-5 h-5 shrink-0 accent-[#0084FE] cursor-pointer"
                            />
                            <span>
                                Text me updates about this booking (confirmation, technician assigned, on the way). Message and data rates may
                                apply. Reply STOP to opt out. <span className="text-[#667085]">Optional.</span>
                            </span>
                        </label>
                    </div>

                    <StepNav onBack={onBack} canContinue loading={isChecking} continueLabel="Continue to review & payment" className="mt-10" />
                </form>
            </section>

            {/* stays in view while scrolling the long form */}
            <div className="hidden lg:block lg:sticky lg:top-28 self-start">{summary}</div>
        </div>
    );
}
