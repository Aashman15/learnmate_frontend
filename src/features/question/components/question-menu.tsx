import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useDeleteQuestion } from "../question.hooks";
import { toaster } from "@/components/ui/toaster";
import { getErrorMessage } from "@/utils/error.utils";
import type { QuestionBaseDto } from "../dtos/QuestionBaseDto";
import { useNavigate } from "@tanstack/react-router";

interface QuestionMenuProps {
  collectionId: number;
  question: QuestionBaseDto;
}

export default function QuestionMenu({
  collectionId,
  question,
}: QuestionMenuProps) {
  const navigate = useNavigate();
  const { mutateAsync: deleteQuestion, isPending: isDeleting } =
    useDeleteQuestion();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const onDeleteQuestion = async () => {
    try {
      const response = await deleteQuestion({
        collectionId,
        questionId: question.id,
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
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const onUpdateQuestionClick = () => {
    navigate({
      to: "/collections/$collectionId/questions/$questionId/update",
      params: {
        collectionId: String(collectionId),
        questionId: String(question.id),
      },
    });
  };

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton variant={"ghost"}>
            <CiMenuKebab />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="edit-question" onClick={onUpdateQuestionClick}>
                Update Question
              </Menu.Item>
              <Menu.Item
                value="delete-question"
                color={"red.500"}
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete Question
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        isDeleting={isDeleting}
        onDelete={onDeleteQuestion}
      />
    </>
  );
}
