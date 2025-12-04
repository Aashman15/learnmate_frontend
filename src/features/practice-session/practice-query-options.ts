import { queryClient } from "@/lib/react-query";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { PracticeSubmitRequest } from "./dtos/PracticeSubmitRequest";
import { practiceKeys } from "./practice-keys";
import {
  deletePracticeById,
  getPracticeItems,
  getPractices,
  startPractice,
  submitPractice,
} from "./practice.api";

export const getStartPracticeMO = mutationOptions({
  mutationFn: startPractice,
});

export const getSubmitPracticeMO = () => {
  return mutationOptions({
    mutationFn: ({
      practiceId,
      request,
    }: {
      practiceId: number;
      request: PracticeSubmitRequest;
    }) => submitPractice(practiceId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: practiceKeys.root,
      });
    },
  });
};

export const getPracticeItemsByPracticeIdQO = (practiceId: number) =>
  queryOptions({
    queryKey: practiceKeys.itemsByPracticeId(practiceId),
    queryFn: () => getPracticeItems(practiceId),
  });

export const getPracticesQO = () =>
  queryOptions({
    queryKey: practiceKeys.root,
    queryFn: getPractices,
  });

export const getDeletePracticeByIdMO = () =>
  mutationOptions({
    mutationFn: deletePracticeById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: practiceKeys.root,
      });
    },
  });
