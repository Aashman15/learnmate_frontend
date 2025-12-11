import { usePracticeStore } from "@/features/practice-session/store/practice-store";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GrLinkNext } from "react-icons/gr";

export const Route = createFileRoute("/practice/review")({
  component: PracticeReviewModePage,
});

function PracticeReviewModePage() {
  const navigate = useNavigate();
  const { items, setCurrentIndex } = usePracticeStore();

  const onEditAnswerClick = (practiceItemId: number) => {
    const index = items.findIndex(
      (item) => item.practiceItemId === practiceItemId
    );
    setCurrentIndex(index);
    navigate({
      to: "/practice/question",
    });
  };

  return (
    <Stack
      mt={10}
      width={{
        md: "2xl",
      }}
      mx={"auto"}
      gap={6}
    >
      {items.map((item, index) => (
        <Box key={index}>
          <Stack gap={2}>
            <Text fontWeight={"bold"}>
              {index + 1}. {item.question}
            </Text>

            {item.answer?.trim() === "" ? (
              <Text color={"red.500"}>Not Answered</Text>
            ) : (
              <Flex gap={3} alignItems={"center"}>
                <GrLinkNext />
                <Text>{item.answer?.trim()}</Text>
              </Flex>
            )}
          </Stack>

          <Button
            mt={2}
            variant={"outline"}
            onClick={() => onEditAnswerClick(item.practiceItemId)}
          >
            Edit Answer
          </Button>
        </Box>
      ))}
    </Stack>
  );
}
