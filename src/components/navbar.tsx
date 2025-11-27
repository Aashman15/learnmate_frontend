import { Container, Flex, Heading } from "@chakra-ui/react";
import { MyLink } from "./my-link";
import { useNavigate } from "@tanstack/react-router";
import { ColorModeButton } from "./ui/color-mode";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          py={4}
          gap={3}
        >
          <Heading
            fontSize={"2xl"}
            cursor={"pointer"}
            onClick={() =>
              navigate({
                to: "/",
              })
            }
          >
            Learnmate
          </Heading>
          <Flex gap={4}>
            <MyLink to="/">Collections</MyLink>
            <ColorModeButton />
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
