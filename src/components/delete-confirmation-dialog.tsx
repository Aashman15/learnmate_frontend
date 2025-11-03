import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

type Props = {
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  title?: string;
  description?: string;
  onCancel?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
};

export default function DeleteConfirmationDialog({
  open = false,
  onOpenChange,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the data.",
  onCancel = () => {
    onOpenChange?.(false);
  },
  onDelete,
  isDeleting = false,
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
                Cancel
              </Button>
              <Button
                onClick={onDelete}
                loading={isDeleting}
                loadingText="Deleting..."
                bgColor={"red.500"}
              >
                Delete
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
