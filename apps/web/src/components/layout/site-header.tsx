import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { Wordmark } from "@/components/common/wordmark";

const links = [
  { href: "#journeys", label: "How it works" },
  { href: "#trust", label: "Trust & safety" },
];

export function SiteHeader() {
  return (
    <header className="border-line bg-page/90 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Wordmark />
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground rounded-md text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/get-started">Get started</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
