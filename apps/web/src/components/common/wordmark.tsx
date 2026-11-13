import Link from "next/link";

export function Wordmark() {
  return (
    <Link
      href="/"
      className="rounded-md text-xl font-extrabold tracking-tight"
      aria-label="RoomSync home"
    >
      Room<span className="text-primary">Sync</span>
    </Link>
  );
}
