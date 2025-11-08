import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import QuestionMenu from "./question-menu";
import type { QuestionBaseDto } from "../dtos/QuestionBaseDto";

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

      {/* Answer */}
      {question.answer && (
        <Box pl={5}>
          <Text>{question.answer}</Text>
        </Box>
      )}
    </Stack>
  );
}
