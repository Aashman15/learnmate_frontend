import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { QuestionFormValues } from "./schema/question-form-schema";
import {
  createQuestion,
  deleteQuestionById,
  getQuestionById,
  updateQuestion,
} from "./question.api";
import { collectionKeys } from "../collection/collection-keys";
import { questionKeys } from "./question-keys";

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: QuestionFormValues) => createQuestion(data),
    onSuccess: (_) => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.root,
      });
    },
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      questionId,
      data,
    }: {
      questionId: number;
      data: QuestionFormValues;
    }) => updateQuestion(questionId, data),
    onSuccess: (_, request) => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.questionsByCollectionId(
          request.data.collectionId
        ),
      });
      queryClient.invalidateQueries({
        queryKey: questionKeys.byId(request.questionId),
      });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      questionId,
    }: {
      collectionId: number;
      questionId: number;
    }) => deleteQuestionById(questionId),

    onSuccess: (_, request) => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.questionsByCollectionId(request.collectionId),
      });
      queryClient.invalidateQueries({
        queryKey: questionKeys.byId(request.questionId),
      });
    },
  });
}

export function createQOForQuestionById(questionId: number) {
  return queryOptions({
    queryKey: questionKeys.byId(questionId),
    queryFn: () => getQuestionById(questionId),
  });
}
