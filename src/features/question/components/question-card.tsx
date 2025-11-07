import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import QuestionMenu from "./question-menu";
import type { Question } from "@/models/question";

interface QuestionCardProps {
  questionNumber: number;
  question: Question;
}

export default function QuestionCard({
  question,
  questionNumber,
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

        <QuestionMenu />
      </Flex>

      {/* Answer */}
      <Box pl={5}>
        {question.type === "TEXT" && <Text>{question.answer}</Text>}
      </Box>
    </Stack>
  );
}
