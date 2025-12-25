import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_blank/collections/$collectionId/practices/$practiceId/practice/"
)({
  component: PracticePage,
});

function PracticePage() {
  return (
    <div>
      Hello "/_blank/collections/$collectionId/practices/$practiceId/practice/"!
    </div>
  );
}
