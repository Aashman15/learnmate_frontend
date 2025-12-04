import { queryOptions, mutationOptions } from "@tanstack/react-query";
import { practiceKeys } from "./practice-keys";
import {
  getPracticeItems,
  startPractice,
  submitPractice,
} from "./practice.api";
import type { PracticeSubmitRequest } from "./dtos/PracticeSubmitRequest";

export const START_PRACTICE_MO = mutationOptions({
  mutationFn: startPractice,
});

export const SUBMIT_PRACTICE_MO = mutationOptions({
  mutationFn: ({
    practiceId,
    request,
  }: {
    practiceId: number;
    request: PracticeSubmitRequest;
  }) => submitPractice(practiceId, request),
});

export const PRACTICE_ITEMS_BY_PRACTICE_ID_QO = (practiceId: number) =>
  queryOptions({
    queryKey: practiceKeys.itemsByPracticeId(practiceId),
    queryFn: () => getPracticeItems(practiceId),
  });
