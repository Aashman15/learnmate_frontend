import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { CiMenuKebab } from "react-icons/ci";
import type { CollectionBaseDto } from "../dtos/CollectionBaseDto";

interface CollectionMenuProps {
  collection: CollectionBaseDto;
}

export default function CollectionMenu({ collection }: CollectionMenuProps) {
  const navigate = useNavigate();

  const onCreateQuestionClick = () => {
    navigate({
      to: "/collections/$collectionId/create-question",
      params: {
        collectionId: collection.id.toString(),
      },
    });
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
              <Menu.Item value="edit-collection">Edit Collection</Menu.Item>
              <Menu.Item value="delete-collection" color={"red.500"}>
                Delete Collection
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
}
