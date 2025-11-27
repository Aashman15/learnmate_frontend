import CircularProgress from "@/components/circular-progress";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import MyAlert from "@/components/my-alert";
import { toaster } from "@/components/ui/toaster";
import {
  useDeleteCollection,
  useGetCollectionById,
} from "@/features/collection/collection.hooks";
import CollectionUpdateDialog from "@/features/collection/components/collection-update-dialog";
import PracticeSessionsTabContent from "@/features/collection/components/practice-sessions-tab-content";
import QuestionsTabConent from "@/features/collection/components/questions-tab-content";
import { getErrorMessage } from "@/utils/error.utils";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CiCircleQuestion, CiStickyNote } from "react-icons/ci";

export const Route = createFileRoute("/collections/$collectionId/")({
  component: CollectionDetailsPage,
});

function CollectionDetailsPage() {
  const navigate = useNavigate();

  const { collectionId } = Route.useParams();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const { mutateAsync: deleteCollection, isPending: isDeleting } =
    useDeleteCollection();

  const {
    data: collection,
    status,
    error,
  } = useGetCollectionById(Number(collectionId));

  const onDeleteCollection = async () => {
    try {
      const response = await deleteCollection(Number(collectionId));
      toaster.create({
        description: response.message,
        type: "success",
      });
      navigate({
        to: "/",
      });
    } catch (error) {
      toaster.create({
        description: getErrorMessage(error),
        type: "error",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

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
    <>
      <Container mt={"10"}>
        <Stack gap={4}>
          <Box>
            <Heading fontSize={"4xl"}>Colelction Details</Heading>
            <Heading mt={8}>{collection.name}</Heading>
            <Text>{collection.description}</Text>
          </Box>
          <HStack gap={2}>
            <Button
              variant={"outline"}
              onClick={() => setIsUpdateDialogOpen(true)}
            >
              Update Collection
            </Button>
            <Button
              variant={"outline"}
              color={"red.500"}
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Collection
            </Button>
          </HStack>
        </Stack>
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
            <PracticeSessionsTabContent />
          </Tabs.Content>
        </Tabs.Root>
      </Container>

      <CollectionUpdateDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        collection={collection}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        description="This action cannot be undone. This will permanently delete the collection and its data like tests and questions."
        onDelete={onDeleteCollection}
        isDeleting={isDeleting}
      />
    </>
  );
}
