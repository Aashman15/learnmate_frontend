import DeleteDialog from "@/components/delete-dialog";
import { toaster } from "@/components/ui/toaster";
import {
  useDeleteQuestion,
  useGetQuestions,
} from "@/features/question/question.hooks";
import { getErrorMessage } from "@/utils/error.utils";
import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute(
  "/_main/collections/$collectionId/questions/"
)({
  component: CollectionQuestionsPage,
});

export default function CollectionQuestionsPage() {
  const navigate = useNavigate();

  const [showAnswers, setShowAnswers] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const { mutateAsync: deleteQuestion, isPending: isDeleting } =
    useDeleteQuestion();

  const { collectionId } = Route.useParams();

  const { data: questionsPage } = useGetQuestions({
    collectionId: Number(collectionId),
    page: 1,
    pageSize: 100000,
  });

  const onCreateQuestionClick = () => {
    navigate({
      to: "/collections/$collectionId/questions/new",
      params: {
        collectionId: collectionId,
      },
    });
  };

  const onUpdateQuestionClick = (questionId: string) => {
    navigate({
      to: "/collections/$collectionId/questions/$questionId/update",
      params: {
        collectionId: String(collectionId),
        questionId: questionId,
      },
    });
  };

  const onDeleteQuestion = async (questionId: number) => {
    try {
      const response = await deleteQuestion({
        collectionId: +collectionId,
        questionId,
      });
      toaster.create({
        description: response.message,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <>
      <Box px={10} mt={5}>
        <HStack>
          <Button onClick={onCreateQuestionClick}>Create Question</Button>
          <Button
            variant={"outline"}
            onClick={() => setShowAnswers(!showAnswers)}
          >
            {showAnswers ? "Hide Answers" : "Show Answers"}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setShowActions(!showActions)}
          >
            {showActions ? "Hide Actions" : "Show Actions"}
          </Button>
        </HStack>
        <Stack mt={6} gap={4}>
          {questionsPage.content.map((question) => (
            <Box key={question.id}>
              <Stack>
                <Text fontWeight={"bold"} fontSize={"2xl"}>
                  {question.question}
                </Text>
                {showAnswers && <Text>{question.answer}</Text>}
              </Stack>
              {showActions && (
                <HStack gap={2}>
                  <Button
                    variant={"outline"}
                    onClick={() => onUpdateQuestionClick(String(question.id))}
                  >
                    Update Question
                  </Button>

                  <DeleteDialog
                    isDeleting={isDeleting}
                    onDelete={() => onDeleteQuestion(question.id)}
                  >
                    <Button variant={"outline"} color={"red.500"}>
                      Delete Question
                    </Button>
                  </DeleteDialog>
                </HStack>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
