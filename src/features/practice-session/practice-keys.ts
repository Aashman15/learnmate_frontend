export const practiceKeys = {
  root: ["practices"] as const,
  byId: (practiceId: number) => [...practiceKeys.root, "byId", practiceId],
  byCollectionId: (collectionId: number) => [
    ...practiceKeys.root,
    "byCollectionId",
    collectionId,
  ],
  itemsByPracticeId: (practiceId: number) => [
    ...practiceKeys.root,
    "itemsByPracticeId",
    practiceId,
  ],
};
