import CircularProgress from "@/components/circular-progress";
import MyAlert from "@/components/my-alert";
import { useGetCollectionById } from "@/features/collection/collection.hooks";
import CollectionMenu from "@/features/collection/components/collection-menu";
import QuestionsTabConent from "@/features/collection/components/questions-tab-content";
import TestsTabContent from "@/features/collection/components/tests-tab-content";
import { getErrorMessage } from "@/utils/error.utils";
import { Box, Container, Flex, Heading, Tabs, Text } from "@chakra-ui/react";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { CiCircleQuestion, CiStickyNote } from "react-icons/ci";

export const Route = createFileRoute("/collections/$collectionId/")({
  component: CollectionDetailsPage,
});

function CollectionDetailsPage() {
  const { collectionId } = useParams({
    from: "/collections/$collectionId/",
  });

  const {
    data: collection,
    status,
    error,
  } = useGetCollectionById(Number(collectionId));

  if (status === "pending") {
    return (
      <Container mt={10}>
        <CircularProgress />
      </Container>
    );
  }

  if (status === "error") {
    return (
      <Container mt={10}>
        <MyAlert description={getErrorMessage(error)} status={"error"} />
      </Container>
    );
  }

  return (
    <Container mt={"10"}>
      <Box>
        <Flex
          justifyContent={{
            base: "space-between",
            md: "flex-start",
          }}
          alignItems={"center"}
          gap={2}
        >
          <Heading>{collection.name}</Heading>
          <CollectionMenu collection={collection} />
        </Flex>

        <Text>{collection.description}</Text>
      </Box>
      <Tabs.Root defaultValue={"questions"} mt={5} pb={"16"}>
        <Tabs.List>
          <Tabs.Trigger value="questions">
            <CiCircleQuestion /> Questions
          </Tabs.Trigger>
          <Tabs.Trigger value="tests">
            <CiStickyNote />
            Practices
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="questions">
          <QuestionsTabConent />
        </Tabs.Content>
        <Tabs.Content value="tests">
          <TestsTabContent />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
