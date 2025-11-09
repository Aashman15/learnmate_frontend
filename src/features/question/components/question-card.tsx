import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import QuestionMenu from "./question-menu";
import type { QuestionBaseDto } from "../dtos/QuestionBaseDto";
import { useQuestionStore } from "../store/question.store";

interface QuestionCardProps {
  questionNumber: number;
  question: QuestionBaseDto;
  collectionId: number;
}

export default function QuestionCard({
  question,
  questionNumber,
  collectionId,
}: QuestionCardProps) {
  const showAnswers = useQuestionStore((state) => state.showAnswers);

  return (
    <Stack>
      <Flex
        justifyContent={{
          base: "space-between",
          md: "flex-start",
        }}
        alignItems={"center"}
        gap={2}
      >
        <Text fontWeight={"medium"}>
          {questionNumber} . {question.question}
        </Text>

        <QuestionMenu collectionId={collectionId} question={question} />
      </Flex>

      {showAnswers && (
        <Box pl={5}>
          <Text>
            {question.answer ? question.answer : "Answer not available."}
          </Text>
        </Box>
      )}
    </Stack>
  );
}
