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

export default function PracticeSessionCard() {
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
                <CiCalendar /> <Text>Nov 8, 2025</Text>
              </HStack>
            </Card.Description>
            <Card.Description>
              <HStack>
                <CiClock2 /> <Text>10:30 AM</Text>
              </HStack>
            </Card.Description>
          </Stack>
          <Card.Description>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text>Questions Answered</Text>
              <Text fontWeight={"bold"}>48/50</Text>
            </Flex>
          </Card.Description>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
