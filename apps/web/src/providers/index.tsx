import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

/** Central provider composition. Server component; client providers are nested inside. */
export function Providers({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
