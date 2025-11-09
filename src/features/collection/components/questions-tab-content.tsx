import QuestionCard from "@/features/question/components/question-card";
import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createQOForQuestionsByCollectionId } from "../collection.hooks";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useQuestionStore } from "@/features/question/store/question.store";

export default function QuestionsTabConent() {
  const navigate = useNavigate();

  const { collectionId } = useParams({
    from: "/collections/$collectionId/",
  });

  const { data: questions } = useSuspenseQuery(
    createQOForQuestionsByCollectionId(Number(collectionId))
  );

  const { showAnswers, setShowAnswers } = useQuestionStore();

  const onCreateQuestionClick = () => {
    navigate({
      to: "/collections/$collectionId/questions/new",
      params: {
        collectionId: collectionId,
      },
    });
  };

  return (
    <Box>
      <HStack>
        <Button onClick={onCreateQuestionClick}>Create Question</Button>
        <Button
          variant={"outline"}
          onClick={() => setShowAnswers(!showAnswers)}
        >
          {showAnswers ? "Hide Answers" : "Show Answers"}
        </Button>
      </HStack>
      <Stack mt={4} gap={4}>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            questionNumber={index + 1}
            question={question}
            collectionId={Number(collectionId)}
          />
        ))}
      </Stack>
    </Box>
  );
}
