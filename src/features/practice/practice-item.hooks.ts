import { useMutation } from "@tanstack/react-query";
import { updatePracticeItem } from "./practice-item.api";
import type { PracticeItemUpdateRequest } from "./dtos/PracticeItemUpdateRequest";
import { queryClient } from "@/lib/react-query";

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

export const useUpdatePracticeItem = () => {
  return useMutation({
    mutationFn: ({
      practiceItemId,
      request,
    }: {
      practiceItemId: number;
      request: PracticeItemUpdateRequest;
    }) => updatePracticeItem(practiceItemId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: practiceKeys.root,
      });
    },
  });
};
