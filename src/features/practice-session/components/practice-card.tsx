import ControlledDeleteDialog from "@/components/controlled-delete-dialog";
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
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { RxText } from "react-icons/rx";
import type { PracticeBaseDto } from "../dtos/PracticeBaseDto";
import { getDeletePracticeByIdMO } from "../practice-query-options";
import { LiaFileAudio } from "react-icons/lia";

interface PracticeSessionCardProps {
  practice: PracticeBaseDto;
  onCardClick: () => void;
}

export default function PracticeSessionCard({
  practice,
  onCardClick,
}: PracticeSessionCardProps) {
  const { mutateAsync: deletePractice, isPending: isDeleting } = useMutation(
    getDeletePracticeByIdMO()
  );

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card.Root
        _hover={{
          shadow: "lg",
          cursor: "pointer",
        }}
        width={"full"}
        variant={"outline"}
        onClick={onCardClick}
      >
        <Card.Header>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Card.Title>Practice Session</Card.Title>
            <HStack gap={2}>
              {practice.inputType === "TEXT" ? (
                <Badge>
                  <RxText />
                  Text
                </Badge>
              ) : (
                <Badge>
                  <LiaFileAudio />
                  Audio
                </Badge>
              )}

              <IconButton
                variant={"ghost"}
                color={"red"}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteDialogOpen(true);
                }}
              >
                <AiOutlineDelete />
              </IconButton>
            </HStack>
          </Flex>
        </Card.Header>
        <Card.Body>
          <Stack gap={10} mb={5}>
            <Stack gap={2}>
              <HStack>
                <CiCalendar />
                {practice.endTime
                  ? formatIso(practice.endTime).date
                  : "No Date"}
              </HStack>
              <HStack>
                <CiClock2 />
                <Text>
                  {practice.endTime
                    ? formatIso(practice.endTime).time
                    : "No Time"}
                </Text>
              </HStack>
            </Stack>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text>Questions Answered</Text>
              <Text fontWeight={"bold"}>
                {practice.totalAnsweredQuestions}/{practice.totalQuestions}
              </Text>
            </Flex>
          </Stack>
        </Card.Body>
      </Card.Root>

      <ControlledDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={onDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
