import Divider from "@/components/divider";
import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
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
            <Card.Description>10:30 AM - 11:15 AM</Card.Description>
          </Stack>
          <Card.Description>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <HStack>
                <CiClock2 /> <Text>Duration</Text>
              </HStack>
              <Text fontWeight={"bold"} color={"black"}>
                45 mins
              </Text>
            </Flex>
          </Card.Description>
        </Stack>
        <Divider />
      </Card.Body>

      <Card.Footer>
        <Box width={"full"}>
          <Card.Description display={"flex"} justifyContent={"space-between"}>
            <Text>Questions Answered</Text>
            <Text fontWeight={"bold"} color={"black"}>
              48/50
            </Text>
          </Card.Description>
          <SimpleGrid columns={2} mt={8}>
            <Stack>
              <Text fontSize={"xs"} fontWeight={"light"}>
                AI Score
              </Text>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                92%
              </Text>
            </Stack>
            <Stack>
              <Text fontSize={"xs"} fontWeight={"light"}>
                Your Score
              </Text>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                88%
              </Text>
            </Stack>
          </SimpleGrid>
        </Box>
      </Card.Footer>
    </Card.Root>
  );
}
