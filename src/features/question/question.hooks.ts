import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QuestionFormValues } from "./schema/question-form-schema";
import { createQuestion } from "./question.api";
import { collectionKeys } from "../collection/collection-keys";

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: QuestionFormValues) => createQuestion(data),
    onSuccess: (_, request) => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.questionsByCollectionId(request.collectionId),
      });
    },
  });
}
