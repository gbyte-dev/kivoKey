// Booking flow wrapper: uses the Geist font (loaded in the root layout) for a cleaner, app-like look
export default function BookingLayout({ children }: LayoutProps<"/">) {
    return <div className="flex flex-1 flex-col font-(family-name:--font-geist-sans) text-[#00061A]">{children}</div>;
}
