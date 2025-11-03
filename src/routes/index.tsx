import { useGetCollections } from "@/features/collection/collection.hooks";
import CollectionCard from "@/features/collection/components/collection-card";
import CollectionCreateDialog from "@/features/collection/components/collection-create-dialog";
import {
  Alert,
  Button,
  Center,
  Container,
  Flex,
  Input,
  InputGroup,
  ProgressCircle,
  SimpleGrid,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export const Route = createFileRoute("/")({
  component: CollectionsPage,
});

function CollectionsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, status } =
    useGetCollections({
      page: 1,
      pageSize: 20,
    });

  if (status === "pending") {
    return (
      <Container mt={"10"}>
        <ProgressCircle.Root value={null} size="sm">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </Container>
    );
  }

  if (status === "error") {
    return (
      <Container mt={"10"}>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Data fetching failed</Alert.Title>
            <Alert.Description>
              We couldn't fetch collections right now, please try again sometime
              later.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Container>
    );
  }

  const collections = data.pages.flatMap((p) => p.content);

  return (
    <>
      <Container py={10}>
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={"4"}>
          <InputGroup startElement={<CiSearch />} width={"md"}>
            <Input placeholder="Search collections..." />
          </InputGroup>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Create Collection
          </Button>
        </Flex>

        <SimpleGrid
          mt={"8"}
          columns={{
            base: 1,
            md: 2,
          }}
          rowGap={"6"}
          columnGap={"6"}
        >
          {collections.map((collection, index) => (
            <CollectionCard key={index} collection={collection} />
          ))}
        </SimpleGrid>
        {hasNextPage && (
          <Center mt={"8"}>
            <Button
              variant={"outline"}
              onClick={() => fetchNextPage()}
              loading={isFetchingNextPage}
              loadingText="Loading..."
            >
              Load More
            </Button>
          </Center>
        )}
      </Container>

      {/* Dialogs */}
      <CollectionCreateDialog
        open={isCreateDialogOpen}
        onOpenChange={(d) => setIsCreateDialogOpen(d.open)}
      />
    </>
  );
}
