import QuestionCard from "@/features/question/components/question-card";
import { Stack } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createQOForQuestionsByCollectionId } from "../collection.hooks";
import { useParams } from "@tanstack/react-router";

export default function QuestionsTabConent() {
  const { collectionId } = useParams({
    from: "/collections/$collectionId/",
  });

  const { data: questions } = useSuspenseQuery(
    createQOForQuestionsByCollectionId(Number(collectionId))
  );

  return (
    <Stack gap={4}>
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          questionNumber={index++}
          question={question}
        />
      ))}
    </Stack>
  );
}
