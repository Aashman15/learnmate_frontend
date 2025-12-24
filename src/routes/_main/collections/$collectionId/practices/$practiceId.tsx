import { PracticeDetail } from "@/features/practice/components/practice-detail";
import { useGetPracticeById } from "@/features/practice/hooks/practice.hooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_main/collections/$collectionId/practices/$practiceId"
)({
  component: PracticeDetailsPage,
});

function PracticeDetailsPage() {
  const { practiceId } = Route.useParams();
  const { data: practice } = useGetPracticeById(Number(practiceId));

  return <PracticeDetail practice={practice} />;
}
