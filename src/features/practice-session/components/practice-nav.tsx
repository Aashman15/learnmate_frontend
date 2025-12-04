import { MyLink } from "@/components/my-link";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Button, Flex, HStack } from "@chakra-ui/react";
import ConfirmExitPracticeDialog from "./confirm-exit-practice-dialog";
import ConfirmPracticeDialog from "./confirm-practice-dialog";
import Timer from "./timer";

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

        <ConfirmPracticeDialog>
          <Button>Submit Practice</Button>
        </ConfirmPracticeDialog>
      </HStack>
    </Flex>
  );
}
