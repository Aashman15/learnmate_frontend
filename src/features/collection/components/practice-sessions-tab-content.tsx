import ConfirmPracticeNowDialog from "@/features/practice-session/components/confirm-practice-now-dialog";
import PracticeSessionCard from "@/features/practice-session/components/practice-session-card";
import { Button, SimpleGrid, Stack } from "@chakra-ui/react";
import type { CollectionDto } from "../dtos/CollectionDto";

type PracticeSessionsTabContentProps = {
  collection: CollectionDto;
};

export default function PracticeSessionsTabContent({
  collection,
}: PracticeSessionsTabContentProps) {
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
