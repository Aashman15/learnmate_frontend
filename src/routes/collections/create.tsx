import { Container } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collections/create")({
  component: CollectionCreatePage,
});

function CollectionCreatePage() {
  return <Container>Create collection page</Container>;
}
