import type { CollectionSearchRequest } from "./dtos/CollectionSearchRequest";

export const collectionKeys = {
  root: ["collections"] as const,
  byId: (id: number) => [...collectionKeys.root, "byId", id],
  infinite: (request: CollectionSearchRequest) => [
    ...collectionKeys.root,
    "infinite",
    request,
  ],
  questionsByCollectionId: (collectionId: number) => [
    ...collectionKeys.root,
    "questionsByCollectionId",
    collectionId,
  ],
};
