import { Badge, Card, Flex, HStack, IconButton } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import type { CollectionBaseDto } from "../dtos/CollectionBaseDto";
import React, { useState } from "react";
import { useDeleteCollection } from "../collection.hooks";
import { toaster } from "@/components/ui/toaster";
import { getErrorMessage } from "@/utils/error.utils";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import CollectionUpdateDialog from "./collection-update-dialog";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  collection: CollectionBaseDto;
};

export default function CollectionCard({ collection }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const { mutateAsync: deleteCollection, isPending: isDeleting } =
    useDeleteCollection();

  const navigate = useNavigate();

  const onDeleteCollection = async () => {
    try {
      const response = await deleteCollection(collection.id);
      toaster.create({
        description: response.message,
        type: "success",
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

  const handleDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsUpdateDialogOpen(true);
  };

  return (
    <>
      <Card.Root
        _hover={{
          shadow: "lg",
          cursor: "pointer",
        }}
        onClick={() =>
          navigate({
            to: "/collections/$collectionId",
            params: { collectionId: collection.id.toString() },
          })
        }
      >
        <Card.Header>
          <Card.Title>{collection.name}</Card.Title>
          <Card.Description>{collection.description}</Card.Description>
        </Card.Header>

        <Card.Footer pt={"2"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"full"}
          >
            <Badge>{`${collection.questionCount} Questions`}</Badge>
            <HStack gap={"2"}>
              <IconButton
                variant={"outline"}
                size={"sm"}
                onClick={handleUpdateBtnClick}
              >
                <FaEdit />
              </IconButton>
              <IconButton
                variant={"outline"}
                size={"sm"}
                onClick={handleDeleteBtnClick}
              >
                <AiFillDelete />
              </IconButton>
            </HStack>
          </Flex>
        </Card.Footer>
      </Card.Root>

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
