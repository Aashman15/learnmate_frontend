export const practiceKeys = {
  root: ["practices"] as const,
  itemsByPracticeId: (practiceId: number) => [
    ...practiceKeys.root,
    "itemsByPracticeId",
    practiceId,
  ],
};
