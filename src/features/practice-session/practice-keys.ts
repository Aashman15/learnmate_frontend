export const practiceKeys = {
  root: ["practices"] as const,
  byId: (practiceId: number) => [...practiceKeys.root, "byId", practiceId],
  itemsByPracticeId: (practiceId: number) => [
    ...practiceKeys.root,
    "itemsByPracticeId",
    practiceId,
  ],
};
