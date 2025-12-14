import { useMutation } from "@tanstack/react-query";
import { updatePracticeItem } from "./practice-item.api";
import type { PracticeItemUpdateRequest } from "./dtos/PracticeItemUpdateRequest";
import { queryClient } from "@/lib/react-query";
import { practiceKeys } from "./practice-keys";

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
