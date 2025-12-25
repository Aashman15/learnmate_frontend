import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_blank/collections/$collectionId/practices/$practiceId/practice/review"
)({
  component: PracticeReviewPage,
});

function PracticeReviewPage() {
  return (
    <div>
      Hello
      "/_blank/collections/$collectionId/practices/$practiceId/practice/review"!
    </div>
  );
}
