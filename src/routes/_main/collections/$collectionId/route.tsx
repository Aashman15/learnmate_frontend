import DeleteDialog from "@/components/delete-dialog";
import Divider from "@/components/divider";
import { toaster } from "@/components/ui/toaster";
import {
  GET_COLLECTION_BY_ID_QO,
  useDeleteCollection,
} from "@/features/collection/collection.hooks";
import CollectionUpdateDialog from "@/features/collection/components/collection-update-dialog";
import { getErrorMessage } from "@/utils/error.utils";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useState } from "react";
import { CiCircleQuestion, CiStickyNote } from "react-icons/ci";

export const Route = createFileRoute("/_main/collections/$collectionId")({
  component: CollectionDetailsPageLayout,
});

function CollectionDetailsPageLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState().location.pathname;

  const { collectionId } = Route.useParams();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const { mutateAsync: deleteCollection, isPending: isDeleting } =
    useDeleteCollection();

  const { data: collection } = useSuspenseQuery(
    GET_COLLECTION_BY_ID_QO(Number(collectionId)),
  );

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
    }
  };

  const onPracticesClick = () => {
    navigate({
      to: "/collections/$collectionId/practices",
      params: {
        collectionId,
      },
    });
  };

  const onQuestionsClick = () => {
    navigate({
      to: "/collections/$collectionId/questions",
      params: {
        collectionId,
      },
    });
  };

  return (
    <>
      <Container mt={"10"}>
        <Stack gap={4} mb={4}>
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
            <DeleteDialog
              description="This action cannot be undone. This will permanently delete the collection and its data like tests and questions."
              onDelete={onDeleteCollection}
              isDeleting={isDeleting}
            >
              <Button variant={"outline"} color={"red.500"}>
                Delete Collection
              </Button>
            </DeleteDialog>
          </HStack>
        </Stack>

        <Divider />

        <Stack direction={"row"} gap={2} mb={6} mt={4}>
          <Button
            onClick={onQuestionsClick}
            variant={pathname.includes("questions") ? "outline" : "ghost"}
          >
            <CiCircleQuestion /> Questions
          </Button>
          <Button
            onClick={onPracticesClick}
            variant={pathname.includes("practices") ? "outline" : "ghost"}
          >
            <CiStickyNote />
            Practices
          </Button>
        </Stack>
        <Outlet />
      </Container>

      <CollectionUpdateDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        collection={collection}
      />
    </>
  );
}
