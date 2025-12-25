import { queryClient } from "@/lib/react-query";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  createPractice,
  deletePracticeById,
  getPracticeById,
  getPractices,
} from "../api/practice.api";
import type { PracticeSearchRequest } from "../dtos/PracticeSearchRequest";

// keys
export const practiceKeys = {
  root: ["practices"] as const,
  list: (searchRequest: PracticeSearchRequest) => [
    ...practiceKeys.root,
    "list",
    searchRequest,
  ],
  byId: (practiceId: number) => [...practiceKeys.root, "byId", practiceId],
};

// hooks
export const useCreatePractice = () => {
  return useMutation({
    mutationFn: createPractice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: practiceKeys.root,
      });
    },
  });
};

export const useGetPractices = (searchRequest: PracticeSearchRequest) => {
  return useSuspenseQuery({
    queryKey: practiceKeys.list(searchRequest),
    queryFn: () => getPractices(searchRequest),
  });
};

export const useDeletePractice = () => {
  return useMutation({
    mutationFn: deletePracticeById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: practiceKeys.root,
      });
    },
  });
};

export const useGetPracticeById = (practiceId: number) => {
  return useSuspenseQuery({
    queryKey: practiceKeys.byId(practiceId),
    queryFn: () => getPracticeById(practiceId),
  });
};
