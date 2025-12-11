import ControlledDeleteDialog from "@/components/controlled-delete-dialog";
import { toaster } from "@/components/ui/toaster";
import { getErrorMessage } from "@/utils/error.utils";
import { Badge, Card, Flex, HStack, IconButton } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useDeleteCollection } from "../collection.hooks";
import type { CollectionDto } from "../dtos/CollectionDto";
import CollectionUpdateDialog from "./collection-update-dialog";

type Props = {
  collection: CollectionDto;
};

export default function CollectionCard({ collection }: Props) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
            to: "/collections/$collectionId/questions",
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteDialogOpen(true);
                }}
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

      <ControlledDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={onDeleteCollection}
        isDeleting={isDeleting}
      />
    </>
  );
}
