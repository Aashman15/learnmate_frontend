import { GET_COLLECTION_BY_ID_QO } from "@/features/collection/collection.hooks";
import ConfirmPracticeNowDialog from "@/features/practice-session/components/confirm-practice-now-dialog";
import PracticeSessionCard from "@/features/practice-session/components/practice-card";
import { Button, SimpleGrid, Stack } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_main/collections/$collectionId/practices"
)({
  component: PracticeSessionsTabContent,
});

export default function PracticeSessionsTabContent() {
  const { collectionId } = Route.useParams();

  const { data: collection } = useSuspenseQuery(
    GET_COLLECTION_BY_ID_QO(Number(collectionId))
  );

  return (
    <Stack gap={8} alignItems={"flex-start"}>
      <ConfirmPracticeNowDialog collection={collection}>
        <Button disabled={collection.questionCount < 1}>Practice Now</Button>
      </ConfirmPracticeNowDialog>
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        columnGap={4}
        rowGap={4}
        width={"full"}
      >
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
        <PracticeSessionCard />
      </SimpleGrid>
    </Stack>
  );
}
