import ControlledDeleteDialog from "@/components/controlled-delete-dialog";
import { toaster } from "@/components/ui/toaster";
import { formatIso } from "@/utils/date-time.utils";
import { getErrorMessage } from "@/utils/error.utils";
import { Badge, Card, Flex, HStack, IconButton, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCalendar } from "react-icons/ci";
import { LiaFileAudio } from "react-icons/lia";
import { RxText } from "react-icons/rx";
import type { PracticeDto } from "../dtos/PracticeDto";
import { useDeletePractice } from "../hooks/practice.hooks";

interface PracticeSessionCardProps {
  practice: PracticeDto;
  onCardClick: () => void;
}

export default function PracticeSessionCard({
  practice,
  onCardClick,
}: PracticeSessionCardProps) {
  const { mutateAsync: deletePractice, isPending: isDeleting } =
    useDeletePractice();

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
            <HStack>
              <CiCalendar />
              {practice.startTime
                ? formatIso(practice.startTime).date
                : "No Date"}
            </HStack>
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
