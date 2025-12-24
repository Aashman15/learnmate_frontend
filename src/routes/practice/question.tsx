import QuestionAudioInput from "@/features/practice/components/question-audio-input";
import { usePracticeStore } from "@/features/practice/store/practice-store";
import { Box, Button, Flex, Stack, Text, Textarea } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export const Route = createFileRoute("/practice/question")({
  component: PracticeQuestionModePage,
});

function PracticeQuestionModePage() {
  const {
    hasNext,
    hasPrevious,
    moveToNext,
    moveToPrevious,
    currentIndex,
    items,
    setCurrentItemAnswer,
    inputMode,
  } = usePracticeStore();

  return (
    <Box
      h={"80vh"}
      width={{
        md: "2xl",
      }}
      mx={"auto"}
      mt={10}
    >
      <Stack gap={2}>
        <Text color={"gray.500"}>
          Question {currentIndex + 1} out of {items.length}
        </Text>
        <Text fontWeight={"bold"}>{items[currentIndex].question}</Text>
      </Stack>
      {inputMode === "TEXT" ? (
        <Textarea
          minHeight={"xs"}
          maxWidth={"2xl"}
          mt={4}
          placeholder="Enter your answer here"
          value={items[currentIndex].answer}
          onChange={(e) => setCurrentItemAnswer(e.target.value)}
        />
      ) : (
        <Box mt={4}>
          <QuestionAudioInput />
        </Box>
      )}

      <Flex justifyContent={"end"} mt={4} gap={4}>
        <Button
          variant={"outline"}
          disabled={!hasPrevious()}
          onClick={moveToPrevious}
        >
          <GrLinkPrevious />
          Previous
        </Button>
        <Button variant={"outline"} disabled={!hasNext()} onClick={moveToNext}>
          Next
          <GrLinkNext />
        </Button>
      </Flex>
    </Box>
  );
}
