export const questionKeys = {
  root: ["questions"] as const,
  byId: (questionId: number) => [...questionKeys.root, "byId", questionId],
};
