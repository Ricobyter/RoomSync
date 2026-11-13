import { Container } from "./container";
import { Wordmark } from "@/components/common/wordmark";

export function SiteFooter() {
  return (
    <footer className="border-line border-t py-10">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Wordmark />
          <p className="text-muted-foreground mt-2 text-sm">Find your space. Find your people.</p>
        </div>
        <p className="text-muted-foreground text-caption">© RoomSync. Delhi NCR.</p>
      </Container>
    </footer>
  );
}
