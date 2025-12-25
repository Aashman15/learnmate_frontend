import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { usePracticeStore } from "../store/practice-store";

interface ConfirmPracticeDialogProps {
  children: ReactNode;
}

export default function ConfirmPracticeDialog({
  children,
}: ConfirmPracticeDialogProps) {
  const navigate = useNavigate();
  const { collectionId, practiceId, items } = usePracticeStore();

  const onSubmit = async () => {
    navigate({
      to: "/collections/$collectionId/practices",
      params: {
        collectionId: String(collectionId),
      },
    });
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
              <Button onClick={onSubmit}>Submit</Button>
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
