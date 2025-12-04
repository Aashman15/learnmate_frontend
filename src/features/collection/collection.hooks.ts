import {
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { collectionKeys } from "./collection-keys";
import {
  createCollection,
  deleteCollection,
  getCollectionById,
  getCollections,
  getQuestionsByCollectionId,
  updateCollection,
} from "./collection.api";
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

export const GET_COLLECTION_BY_ID_QO = (collectionId: number) =>
  queryOptions({
    queryKey: collectionKeys.byId(collectionId),
    queryFn: () => getCollectionById(collectionId),
  });

export function createQueryOptionsForCollectionById(collectionId: number) {
  return queryOptions({
    queryKey: collectionKeys.byId(collectionId),
    queryFn: () => getCollectionById(collectionId),
  });
}

export function createQOForQuestionsByCollectionId(collectionId: number) {
  return queryOptions({
    queryKey: collectionKeys.questionsByCollectionId(collectionId),
    queryFn: () => getQuestionsByCollectionId(collectionId),
  });
}
