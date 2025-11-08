import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { CiMenuKebab } from "react-icons/ci";
import type { CollectionDto } from "../dtos/CollectionDto";
import CollectionUpdateDialog from "./collection-update-dialog";
import { useState } from "react";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { useDeleteCollection } from "../collection.hooks";
import { toaster } from "@/components/ui/toaster";
import { getErrorMessage } from "@/utils/error.utils";

interface CollectionMenuProps {
  collection: CollectionDto;
}

export default function CollectionMenu({ collection }: CollectionMenuProps) {
  const navigate = useNavigate();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutateAsync: deleteCollection, isPending: isDeleting } =
    useDeleteCollection();

  const onCreateQuestionClick = () => {
    navigate({
      to: "/collections/$collectionId/questions/new",
      params: {
        collectionId: collection.id.toString(),
      },
    });
  };

  const onDeleteCollection = async () => {
    try {
      const response = await deleteCollection(collection.id);
      toaster.create({
        description: response.message,
        type: "success",
      });
      navigate({
        to: "/",
      });
    } catch (error) {
      toaster.create({
        description: getErrorMessage(error),
        type: "error",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton variant={"ghost"}>
            <CiMenuKebab />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                value="create-question"
                onClick={onCreateQuestionClick}
              >
                Create Question
              </Menu.Item>
              <Menu.Item value="show-answers">Show Answers</Menu.Item>
              <Menu.Item
                value="edit-collection"
                onClick={() => setIsUpdateDialogOpen(true)}
              >
                Update Collection
              </Menu.Item>
              <Menu.Item
                value="delete-collection"
                color={"red.500"}
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete Collection
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      {/* Dialogs */}
      <CollectionUpdateDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        collection={collection}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        description="This action cannot be undone. This will permanently delete the collection and its data like tests and questions."
        onDelete={onDeleteCollection}
        isDeleting={isDeleting}
      />
    </>
  );
}
