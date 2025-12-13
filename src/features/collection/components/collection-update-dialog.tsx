import { useUpdateCollection } from "@/features/collection/collection.hooks";

import type { DialogBaseProps } from "@/dtos/DialogBaseProps";
import { getErrorMessage } from "@/utils/error.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toaster } from "../../../components/ui/toaster";
import type { CollectionDto } from "../dtos/CollectionDto";
import {
  collectionFormSchema,
  type CollectionFormValues,
} from "../schema/collection-form-schema";
import CollectionFormDialog from "./collection-form-dialog";
import { useEffect } from "react";

interface CollectionUpdateDialogProps extends DialogBaseProps {
  collection: CollectionDto;
}

export default function CollectionUpdateDialog({
  open,
  onOpenChange,
  collection,
}: CollectionUpdateDialogProps) {
  const { mutateAsync: updateCollection } = useUpdateCollection();

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name: collection.name ?? "",
      description: collection.description ?? "",
    },
  });
  const { reset } = form;

  useEffect(() => {
    reset({
      name: collection.name ?? "",
      description: collection.description ?? "",
    });
  }, [collection, reset]);

  const onUpdateCollection = async (formValues: CollectionFormValues) => {
    try {
      await updateCollection({
        collectionId: collection.id,
        formValues: formValues,
      });
      toaster.create({
        description: "Collection updated successfully.",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        description: getErrorMessage(error),
        type: "error",
      });
    } finally {
      reset();
      onOpenChange?.(false);
    }
  };

  return (
    <CollectionFormDialog
      open={open}
      onOpenChange={onOpenChange}
      form={form}
      onSubmit={onUpdateCollection}
      isUpdateMode={true}
    />
  );
}
