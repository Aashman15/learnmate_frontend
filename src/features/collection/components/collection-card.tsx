import { Badge, Card, Flex, HStack, IconButton } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import type { CollectionBaseDto } from "../dtos/CollectionBaseDto";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { useState } from "react";

type Props = {
  collection: CollectionBaseDto;
};

export default function CollectionCard({ collection }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card.Root>
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
              <IconButton variant={"outline"} size={"sm"}>
                <FaEdit />
              </IconButton>
              <IconButton
                variant={"outline"}
                size={"sm"}
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <AiFillDelete />
              </IconButton>
            </HStack>
          </Flex>
        </Card.Footer>
      </Card.Root>

      {/* Dialogs */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Are you absolutely sure ?"
        description="This action cannot be undone. This will permanently delete the collection and its data like tests and questions."
        confirmBtnText="Delete Collection"
      />
    </>
  );
}
