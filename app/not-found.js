import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <span className="text-5xl">🌾</span>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-[rgb(var(--text-soft))]">
        The field you're looking for doesn't exist. Let's get you back to solid ground.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-primary-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
