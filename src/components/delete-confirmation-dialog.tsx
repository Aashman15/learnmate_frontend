import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  onDelete?: () => Promise<void>;
  isDeleting?: boolean;
};

export default function DeleteConfirmationDialog({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the data.",
  onDelete,
  isDeleting = false,
  children,
}: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
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
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.Context>
                {(store) => (
                  <Button
                    onClick={async () => {
                      await onDelete?.();
                      store.setOpen(false);
                    }}
                    loading={isDeleting}
                    loadingText="Deleting..."
                    bgColor={"red.500"}
                  >
                    Delete
                  </Button>
                )}
              </Dialog.Context>
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
