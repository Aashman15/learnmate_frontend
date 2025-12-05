import { PracticeDetail } from "@/features/practice-session/components/practice-detail";
import { getPracticeByIdQO } from "@/features/practice-session/practice-query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_main/collections/$collectionId/practices/$practiceId"
)({
  component: PracticeDetailsPage,
});

function PracticeDetailsPage() {
  const { practiceId } = Route.useParams();
  const { data: practice } = useSuspenseQuery(
    getPracticeByIdQO(Number(practiceId))
  );

  return <PracticeDetail practice={practice} />;
}
