import { toaster } from "@/components/ui/toaster";
import { getErrorMessage } from "@/utils/error.utils";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { PracticeItemWithAnswer } from "../dtos/PracticeItemWithAnswer";
import { useSubmitPractice } from "../hooks/practice.hooks";
import { usePracticeStore } from "../store/practice-store";

interface ConfirmPracticeDialogProps {
  children: ReactNode;
}

export default function ConfirmPracticeDialog({
  children,
}: ConfirmPracticeDialogProps) {
  const navigate = useNavigate();
  const { collectionId, practiceId, items } = usePracticeStore();

  const { mutateAsync: submitPractice, isPending } = useSubmitPractice();

  const isAnsweredItem = (item: PracticeItemWithAnswer) => {
    return (
      (item.answer !== undefined && item.answer.trim() !== "") ||
      (item.audioUrl !== undefined && item.audioUrl.trim() !== "")
    );
  };

  const onSubmit = async () => {
    try {
      const answeredItems = items.filter((item) => isAnsweredItem(item));

      await submitPractice({
        practiceId: practiceId!,
        request: {
          answers: answeredItems.map((item) => ({
            ...item,
            audioUrl: item.audioUrl || undefined,
            answer: item.answer || undefined,
          })),
        },
      });
      toaster.create({
        type: "success",
        description: "Practice submitted successfully",
      });
      navigate({
        to: "/collections/$collectionId/practices",
        params: {
          collectionId: String(collectionId),
        },
      });
    } catch (error) {
      toaster.create({
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {/* Button */}
        {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you absolutely sure ?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Please make sure to review your practice once, you won't be able
                to edit the practice answers later.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={onSubmit}
                disabled={isPending}
                loading={isPending}
                loadingText="Submitting..."
              >
                Submit
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
