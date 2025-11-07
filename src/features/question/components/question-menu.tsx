import { Menu, Portal } from "@ark-ui/react";
import { IconButton } from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";

export default function QuestionMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton variant={"ghost"}>
          <CiMenuKebab />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="show-answer">Show Answer</Menu.Item>
            <Menu.Item value="edit-question">Edit Question</Menu.Item>
            <Menu.Item value="delete-question" color={"red.500"}>
              Delete Question
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
