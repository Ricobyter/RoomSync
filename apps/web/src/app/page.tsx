import Link from "next/link";
import { ArrowRight, BadgeCheck, Home, ScrollText, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FadeIn, HoverLift } from "@/components/common/motion";

const journeys = [
  {
    icon: Users,
    title: "Find your people",
    body: "Start with compatibility. Discover roommates whose habits and routines fit yours, connect, and look for a home together.",
  },
  {
    icon: Home,
    title: "Find your space",
    body: "Start with the place. Explore rooms in existing households and meet the flatmates you would be living with.",
  },
];

const trust = [
  {
    icon: ScrollText,
    title: "Clear household expectations",
    body: "Cleanliness, guests and shared costs are stated up front, so there are fewer surprises after move-in.",
  },
  {
    icon: BadgeCheck,
    title: "Transparency",
    body: "Know who you would share with and what living there is really like before you commit.",
  },
  {
    icon: ShieldCheck,
    title: "Safer discovery",
    body: "Shared-housing discovery designed with trust and safety in mind from the start.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="py-20 sm:py-28">
          <Container>
            <FadeIn className="max-w-3xl">
              <p className="text-label text-secondary mb-4">Delhi · Gurugram · Noida</p>
              <h1 className="text-display">Find your space. Find your people.</h1>
              <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
                Discover compatible roommates, explore available spaces, and build a home with
                people who fit your lifestyle.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/get-started?journey=people">
                    <Users /> Find compatible roommates
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/get-started?journey=rooms">
                    <Home /> Explore available rooms
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>

        <section id="journeys" className="scroll-mt-20 py-16">
          <Container>
            <FadeIn>
              <h2 className="text-heading max-w-xl">Two ways to start. One good home.</h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {journeys.map(({ icon: Icon, title, body }, i) => (
                <FadeIn key={title} delay={i * 0.1}>
                  <HoverLift className="h-full">
                    <Card className="h-full">
                      <span className="bg-muted text-secondary rounded-button mb-5 inline-flex size-11 items-center justify-center">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>{body}</CardDescription>
                    </Card>
                  </HoverLift>
                </FadeIn>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/get-started">
                  Get started <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </Container>
        </section>

        <section id="trust" className="scroll-mt-20 py-16 sm:py-24">
          <Container>
            <div className="bg-muted rounded-card p-8 sm:p-12">
              <FadeIn>
                <h2 className="text-heading max-w-xl">Built on trust, not just listings.</h2>
                <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl">
                  Shared living works when expectations are honest. RoomSync puts them first.
                </p>
              </FadeIn>
              <ul className="mt-10 grid gap-8 md:grid-cols-3">
                {trust.map(({ icon: Icon, title, body }, i) => (
                  <li key={title}>
                    <FadeIn delay={i * 0.1}>
                      <Icon className="text-secondary size-6" aria-hidden />
                      <h3 className="text-subheading mt-3">{title}</h3>
                      <p className="text-muted-foreground mt-2 leading-relaxed">{body}</p>
                    </FadeIn>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
