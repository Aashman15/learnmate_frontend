import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createCollection,
  deleteCollection,
  getCollectionById,
  getCollections,
  getQuestionsByCollectionId,
  updateCollection,
} from "./collection.api";
import { collectionKeys } from "./collection-keys";
import type { CollectionSearchRequest } from "./dtos/CollectionSearchRequest";
import type { CollectionFormValues } from "./schema/collection-form-schema";

export function useCreateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.root,
      });
    },
  });
}

export function useUpdateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      collectionId,
      formValues,
    }: {
      collectionId: number;
      formValues: CollectionFormValues;
    }) => updateCollection(collectionId, formValues),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.root,
      });
    },
  });
}

export function useDeleteCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.root,
      });
    },
  });
}

export function useGetCollections(request: CollectionSearchRequest) {
  return useInfiniteQuery({
    queryKey: collectionKeys.infinite(request),
    queryFn: ({ pageParam }) =>
      getCollections({
        ...request,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.currentPage + 1 : null,
  });
}

export function useGetCollectionById(id: number) {
  return useQuery({
    queryKey: collectionKeys.byId(id),
    queryFn: () => getCollectionById(id),
  });
}

export function useGetQuestionsByCollectionId(collectionId: number) {
  return useQuery({
    queryKey: collectionKeys.questionsByCollectionId(collectionId),
    queryFn: () => getQuestionsByCollectionId(collectionId),
  });
}
