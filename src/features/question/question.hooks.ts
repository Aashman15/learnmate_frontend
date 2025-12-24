import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { QuestionSearchRequest } from "./dtos/QuestionSearchRequest";
import {
  createQuestion,
  deleteQuestionById,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "./question.api";
import type { QuestionFormValues } from "./schema/question-form-schema";

// keys
const questionKeys = {
  root: ["questions"] as const,
  list: (request: QuestionSearchRequest) => [
    ...questionKeys.root,
    "list",
    request,
  ],
  byId: (questionId: number) => [...questionKeys.root, "byId", questionId],
};

// hooks
export const useGetQuestions = (request: QuestionSearchRequest) => {
  return useSuspenseQuery({
    queryKey: questionKeys.list(request),
    queryFn: () => getQuestions(request),
  });
};

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: QuestionFormValues) => createQuestion(data),
    onSuccess: (_) => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.root,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.root,
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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.root,
      });
    },
  });
}

export const useGetQuestionById = (questionId: number) => {
  return useSuspenseQuery({
    queryKey: questionKeys.byId(questionId),
    queryFn: () => getQuestionById(questionId),
  });
};
