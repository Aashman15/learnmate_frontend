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
import { FaArrowLeft } from "react-icons/fa";
import type { PracticeDto } from "../dtos/PracticeDto";
import { useRouter } from "@tanstack/react-router";
import { formatIso } from "@/utils/date-time.utils";

interface PracticeDetailProps {
  practice: PracticeDto;
}

export function PracticeDetail({ practice }: PracticeDetailProps) {
  const router = useRouter();

  return (
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
              <HStack justify="space-between">
                <Text fontWeight="500">Ended</Text>
                {practice.endTime ? (
                  <Text>{`${formatIso(practice.endTime).date} - ${
                    formatIso(practice.endTime).time
                  }`}</Text>
                ) : (
                  <Text></Text>
                )}
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="500">Total Questions</Text>
                <Text>{practice.totalQuestions}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="500">Answered</Text>
                <Text>{practice.totalAnsweredQuestions}</Text>
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
                    {answer.question}
                  </Text>
                  <Box>
                    <Text fontSize="xs" fontWeight="500">
                      Expected Answer:
                    </Text>
                    <Text fontSize="sm">{answer.expectedAnswer}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight="500">
                      Your Answer:
                    </Text>

                    {answer.givenAnswer ? (
                      <Text fontSize="sm">{answer.givenAnswer}</Text>
                    ) : (
                      <Text fontSize={"sm"} color={"red.500"}>
                        Not Answered
                      </Text>
                    )}
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          ))}
        </VStack>
      </Box>
    </Stack>
  );
}
