import {
  Badge,
  Card,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { RxText } from "react-icons/rx";
import type { PracticeBaseDto } from "../dtos/PracticeBaseDto";
import { formatIso } from "@/utils/date-time.utils";

interface PracticeSessionCardProps {
  practice: PracticeBaseDto;
}

export default function PracticeSessionCard({
  practice,
}: PracticeSessionCardProps) {
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
            <IconButton variant={"ghost"} color={"red"}>
              <AiOutlineDelete />
            </IconButton>
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
