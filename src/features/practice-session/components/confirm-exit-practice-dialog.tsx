import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { usePracticeStore } from "../store/practice-store";
import { useNavigate } from "@tanstack/react-router";

interface ConfirmExitPracticeDialogProps {
  children: ReactNode;
}

export default function ConfirmExitPracticeDialog({
  children,
}: ConfirmExitPracticeDialogProps) {
  const navigate = useNavigate();
  const collectionId = usePracticeStore((state) => state.collectionId);

  const onExitClick = () => {
    // todo delete practice and its items from server
    navigate({
      to: "/collections/$collectionId/practices",
      params: { collectionId: String(collectionId) },
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {/* button or link */}
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
                Once you exit the practice , you will loose the practice data
                and you won't be able to continue, you have to start again.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button color={"red.500"} onClick={onExitClick}>
                Exit
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
