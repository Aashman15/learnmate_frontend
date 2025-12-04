import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { toaster } from "@/components/ui/toaster";
import { createQOForQuestionsByCollectionId } from "@/features/collection/collection.hooks";
import { useDeleteQuestion } from "@/features/question/question.hooks";
import { getErrorMessage } from "@/utils/error.utils";
import { Accordion, Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
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

  const { data: questions } = useSuspenseQuery(
    createQOForQuestionsByCollectionId(Number(collectionId))
  );

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
        <Accordion.Root
          mt={4}
          multiple
          collapsible
          value={showAnswers ? [...questions.map((q) => String(q.id))] : []}
          maxWidth={"4xl"}
        >
          {questions.map((question, index) => (
            <Accordion.Item key={index} value={String(question.id)}>
              <Accordion.ItemTrigger>
                <Text fontWeight={"bold"} fontSize={"xl"}>
                  {`${index + 1}. ${question.question}`}
                </Text>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <Stack gap={4}>
                    <Text>{question.answer}</Text>
                    {showActions && (
                      <HStack gap={2}>
                        <Button
                          variant={"outline"}
                          onClick={() =>
                            onUpdateQuestionClick(String(question.id))
                          }
                        >
                          Update Question
                        </Button>

                        <DeleteConfirmationDialog
                          isDeleting={isDeleting}
                          onDelete={() => onDeleteQuestion(question.id)}
                        >
                          <Button variant={"outline"} color={"red.500"}>
                            Delete Question
                          </Button>
                        </DeleteConfirmationDialog>
                      </HStack>
                    )}
                  </Stack>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    </>
  );
}
