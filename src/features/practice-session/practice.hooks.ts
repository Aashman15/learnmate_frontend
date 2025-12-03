import { queryOptions, mutationOptions } from "@tanstack/react-query";
import { practiceKeys } from "./practice-keys";
import { getPracticeItems, startPractice } from "./practice.api";

export const START_PRACTICE_MO = mutationOptions({
  mutationFn: startPractice,
});

export const PRACTICE_ITEMS_BY_PRACTICE_ID_QO = (practiceId: number) =>
  queryOptions({
    queryKey: practiceKeys.itemsByPracticeId(practiceId),
    queryFn: () => getPracticeItems(practiceId),
  });
