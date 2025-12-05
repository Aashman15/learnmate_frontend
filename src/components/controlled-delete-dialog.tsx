import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title?: string;
  description?: string;
  onDelete?: () => Promise<void>;
  isDeleting?: boolean;
};

export default function ControlledDeleteDialog({
  open,
  onOpenChange,
  onDelete,
  isDeleting = false,
  title,
  description,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={(d) => onOpenChange(d.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {title ?? "Are you absolutely sure ?"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                {description ??
                  "This action cannot be undone. This will permanently delete the data."}
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
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
