import { Suspense } from "react";
import AccessClient from "./AccessClient";

export const dynamic = "force-dynamic";

export default function AccessPage() {
  return (
    <Suspense fallback={null}>
      <AccessClient />
    </Suspense>
  );
}