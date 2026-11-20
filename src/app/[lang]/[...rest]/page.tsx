import { notFound } from "next/navigation";

// always throws notFound(), so there is no UI to validate for instant navigation
export const instant = false;

// Any path that matches no page renders [lang]/not-found.tsx inside the site layout,
// in the visitor's language, instead of Next's bare default 404.
export default function CatchAll() {
  notFound();
}
