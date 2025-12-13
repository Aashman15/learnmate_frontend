import type { UseFormReturn } from "react-hook-form";
import type { CollectionFormValues } from "../schema/collection-form-schema";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import type { DialogBaseProps } from "@/dtos/DialogBaseProps";
import { useEffect } from "react";

interface CollectionFormDialogProps extends DialogBaseProps {
  form: UseFormReturn<CollectionFormValues>;
  onSubmit: (data: CollectionFormValues) => void;
  isUpdateMode?: boolean;
}

export default function CollectionFormDialog({
  open,
  onOpenChange,
  form,
  onSubmit,
  isUpdateMode = false,
}: CollectionFormDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <>
      <Dialog.Root
        size={"md"}
        open={open}
        onOpenChange={(d) => onOpenChange?.(d.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Stack>
                  <Dialog.Title>
                    {isUpdateMode ? "Update" : "Create"} Collection
                  </Dialog.Title>
                  <Dialog.Description>
                    Please provide collection details below
                  </Dialog.Description>
                </Stack>
              </Dialog.Header>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Body>
                  <Fieldset.Root size="lg" maxW="md">
                    <Fieldset.Content>
                      <Field.Root invalid={!!errors.name} required>
                        <Field.Label>
                          Name{" "}
                          <Field.RequiredIndicator>*</Field.RequiredIndicator>
                        </Field.Label>
                        <Input
                          placeholder="Enter collection name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <Field.ErrorText>
                            {errors.name.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>

                      <Field.Root invalid={!!errors.description}>
                        <Field.Label>Description</Field.Label>
                        <Input
                          placeholder="Enter collection description"
                          {...register("description", {
                            setValueAs: (v) => (v === "" ? undefined : v),
                          })}
                        />
                        {errors.description && (
                          <Field.ErrorText>
                            {errors.description.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant={"outline"}>Cancel</Button>
                  </Dialog.ActionTrigger>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    loadingText={isUpdateMode ? "Updating..." : "Creating..."}
                  >
                    {isUpdateMode ? "Update" : "Create"}
                  </Button>
                </Dialog.Footer>
              </form>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
