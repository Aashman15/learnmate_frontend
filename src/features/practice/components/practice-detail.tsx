import { formatIso } from "@/utils/date-time.utils";
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import type { PracticeAnswerDto } from "../dtos/PracticeAnswerDto";
import type { PracticeDetailDto } from "../dtos/PracticeDetailDto";
import ChangeAnswerDialog from "./change-answer-dialog";

interface PracticeDetailProps {
  practice: PracticeDetailDto;
}

export function PracticeDetail({ practice }: PracticeDetailProps) {
  const router = useRouter();

  const [isChangeAnswerDialogOpen, setIsChangeAnswerDialogOpen] =
    useState(false);

  const [selectedPracticeItem, setSelectedPracticeItem] =
    useState<PracticeAnswerDto | null>(null);

  const getAudioUrl = (path: string): string => {
    return import.meta.env.VITE_API_BASE_URL + path;
  };

  return (
    <>
      <Stack alignItems={"start"} gap={6} maxWidth={"4xl"} mx={"auto"}>
        <Button variant="ghost" size="sm" onClick={() => router.history.back()}>
          <FaArrowLeft size={18} /> Back
        </Button>

        <Box w="full">
          <Heading size="sm">Practice Summary</Heading>
          <Card.Root mt={2} w="full">
            <Card.Body>
              <VStack gap={3} align="stretch">
                <HStack justify="space-between">
                  <Text fontWeight="500">Started</Text>
                  <Text>{`${formatIso(practice.startTime).date} - ${
                    formatIso(practice.startTime).time
                  }`}</Text>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </Box>

        <Box w="full">
          <Heading size="sm">Answers Review</Heading>
          <VStack mt={2} gap={3}>
            {practice.answers.map((answer) => (
              <Card.Root key={answer.id} w="full">
                <Card.Body gap={3}>
                  <VStack align="start" gap={2}>
                    <Text fontWeight="500" fontSize="sm">
                      {answer.question.question}
                    </Text>
                    <Box>
                      <Text fontSize="xs" fontWeight="500">
                        Expected Answer:
                      </Text>
                      <Text fontSize="sm">{answer.question.answer}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" fontWeight="500">
                        Your Answer:
                      </Text>

                      {practice.inputType === "AUDIO" &&
                        answer.givenAudioAnswerUrl && (
                          <audio
                            controls
                            src={getAudioUrl(answer.givenAudioAnswerUrl)}
                          />
                        )}

                      {practice.inputType === "TEXT" &&
                        answer.givenTextAnswer && (
                          <Text fontSize="sm">{answer.givenTextAnswer}</Text>
                        )}

                      {!answer.givenTextAnswer &&
                        !answer.givenAudioAnswerUrl && (
                          <Text fontSize={"sm"} color={"red.500"}>
                            Not Answered
                          </Text>
                        )}

                      <Button
                        variant={"outline"}
                        mt={2}
                        onClick={() => {
                          setIsChangeAnswerDialogOpen(true);
                          setSelectedPracticeItem(answer);
                        }}
                      >
                        Change Answer
                      </Button>
                    </Box>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </VStack>
        </Box>
      </Stack>

      {selectedPracticeItem && (
        <ChangeAnswerDialog
          open={isChangeAnswerDialogOpen}
          onOpenChange={setIsChangeAnswerDialogOpen}
          practiceItem={selectedPracticeItem}
          inputType={practice.inputType}
        />
      )}
    </>
  );
}
