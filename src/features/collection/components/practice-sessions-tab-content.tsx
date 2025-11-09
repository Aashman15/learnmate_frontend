import PracticeSessionCard from "@/features/practice-session/components/practice-session-card";
import { Button, SimpleGrid, Stack } from "@chakra-ui/react";

export default function PracticeSessionsTabContent() {
  return (
    <Stack gap={8} alignItems={"flex-start"}>
      <Button>Practice Now</Button>
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
