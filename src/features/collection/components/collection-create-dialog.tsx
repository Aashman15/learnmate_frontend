import { useCreateCollection } from "@/features/collection/collection.hooks";
import {
  collectionFormSchema,
  type CollectionFormValues,
} from "@/features/collection/schema/collection-form-schema";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Stack,
  type DialogRootProps,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toaster } from "../../../components/ui/toaster";
import { getErrorMessage } from "@/utils/error.utils";
import { useEffect } from "react";

export default function CollectionCreateDialog(
  dialogRootProps: Omit<DialogRootProps, "children">
) {
  const { open, onOpenChange } = dialogRootProps;
  const { mutateAsync: createCollection } = useCreateCollection();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onCreateCollection = async (data: CollectionFormValues) => {
    try {
      await createCollection(data);
      toaster.create({
        description: "Collection created successfully.",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        description: getErrorMessage(error),
        type: "error",
      });
    } finally {
      reset();
      onOpenChange?.({ open: false });
    }
  };

  return (
    <Dialog.Root
      size={"md"}
      closeOnInteractOutside={false}
      {...dialogRootProps}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Stack>
                <Dialog.Title>Create Collection</Dialog.Title>
                <Dialog.Description>
                  Please provide collection details below
                </Dialog.Description>
              </Stack>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root size="lg" maxW="md">
                <Fieldset.Content>
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input
                      placeholder="Enter collection name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <Field.HelperText color={"red.500"}>
                        {errors.name.message}
                      </Field.HelperText>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Input
                      placeholder="Enter collection description"
                      {...register("description")}
                    />
                    {errors.description && (
                      <Field.HelperText color={"red.500"}>
                        {errors.description.message}
                      </Field.HelperText>
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
                onClick={handleSubmit(onCreateCollection)}
                loading={isSubmitting}
                loadingText="Creating..."
              >
                Create
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
