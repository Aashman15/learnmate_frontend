import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { toaster } from "@/components/ui/toaster";
import { formatIso } from "@/utils/date-time.utils";
import { getErrorMessage } from "@/utils/error.utils";
import {
  Badge,
  Card,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { RxText } from "react-icons/rx";
import type { PracticeBaseDto } from "../dtos/PracticeBaseDto";
import { getDeletePracticeByIdMO } from "../practice-query-options";

interface PracticeSessionCardProps {
  practice: PracticeBaseDto;
}

export default function PracticeSessionCard({
  practice,
}: PracticeSessionCardProps) {
  const { mutateAsync: deletePractice, isPending: isDeleting } = useMutation(
    getDeletePracticeByIdMO()
  );

  const onDelete = async () => {
    try {
      const response = await deletePractice(practice.id);
      toaster.create({
        type: "success",
        description: response.message,
      });
    } catch (error) {
      toaster.create({
        type: "error",
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Card.Root width={"full"} variant={"outline"}>
      <Card.Header>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Card.Title>Practice Session</Card.Title>
          <HStack gap={2}>
            <Badge>
              <RxText />
              Text
            </Badge>
            <DeleteConfirmationDialog
              onDelete={onDelete}
              isDeleting={isDeleting}
            >
              <IconButton variant={"ghost"} color={"red"}>
                <AiOutlineDelete />
              </IconButton>
            </DeleteConfirmationDialog>
          </HStack>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Stack gap={10} mb={5}>
          <Stack gap={2}>
            <Card.Description>
              <HStack>
                <CiCalendar />{" "}
                <Text>
                  {practice.endTime
                    ? formatIso(practice.endTime).date
                    : "No Date"}
                </Text>
              </HStack>
            </Card.Description>
            <Card.Description>
              <HStack>
                <CiClock2 />
                <Text>
                  {practice.endTime
                    ? formatIso(practice.endTime).time
                    : "No Time"}
                </Text>
              </HStack>
            </Card.Description>
          </Stack>
          <Card.Description>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text>Questions Answered</Text>
              <Text fontWeight={"bold"}>
                {practice.totalAnsweredQuestions}/{practice.totalQuestions}
              </Text>
            </Flex>
          </Card.Description>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
