import { MyLink } from "@/components/my-link";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Button, Flex, HStack } from "@chakra-ui/react";
import Timer from "./timer";
import ConfirmExitPracticeDialog from "./confirm-exit-practice-dialog";

export default function PracticeNav() {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} py={7}>
      <HStack gap={4}>
        <ConfirmExitPracticeDialog>
          <Button variant={"outline"} color={"red.500"}>
            Exit
          </Button>
        </ConfirmExitPracticeDialog>
        <Timer />
      </HStack>
      <HStack gap={4}>
        <ColorModeButton />
        <MyLink
          to="/practice/question"
          activeProps={{
            textDecoration: "underline",
          }}
        >
          Question
        </MyLink>
        <MyLink
          to="/practice/review"
          activeProps={{
            textDecoration: "underline",
          }}
        >
          Review
        </MyLink>

        <Button>Submit Practice</Button>
      </HStack>
    </Flex>
  );
}
