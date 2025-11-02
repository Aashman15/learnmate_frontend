import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

type Props = {
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  title?: string;
  description?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmBtnText?: string;
  cancelBtnText?: string;
};

export default function ConfirmationDialog({
  open = false,
  onOpenChange,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Please be absolutely sure before commtting this action.",
  onCancel = () => {
    onOpenChange?.(false);
  },
  onConfirm,
  confirmBtnText = "Confirm",
  cancelBtnText = "Cancel",
}: Props) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => onOpenChange?.(d.open)}
      closeOnInteractOutside={false}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{description}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onCancel}>
                {cancelBtnText}
              </Button>
              <Button onClick={onConfirm}>{confirmBtnText}</Button>
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
