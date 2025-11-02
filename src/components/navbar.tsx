import { Container, Flex, Heading, HStack } from "@chakra-ui/react";
import { MyLink } from "./my-link";

export function Navbar() {
  return (
    <Container>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        py={4}
        gap={3}
      >
        <Heading fontSize={"2xl"}>Learnmate</Heading>
        <HStack gap={"6"}>
          <MyLink to="/">Collections</MyLink>
          <MyLink to="/collections/create">Create Collection</MyLink>
        </HStack>
      </Flex>
    </Container>
  );
}
