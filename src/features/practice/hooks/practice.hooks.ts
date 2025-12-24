import { queryClient } from "@/lib/react-query";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  deletePracticeById,
  getPracticeById,
  getPracticeItems,
  getPracticesByCollectionId,
  startPractice,
  submitPractice,
} from "../api/practice.api";
import type { PracticeSubmitRequest } from "../dtos/PracticeSubmitRequest";

// keys

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

// hooks

export const useStartPractice = () => {
  return useMutation({
    mutationFn: startPractice,
  });
};

export const useSubmitPractice = () => {
  return useMutation({
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

export const useGetPracticeItemsByPracticeId = (practiceId: number) => {
  return useSuspenseQuery({
    queryKey: practiceKeys.itemsByPracticeId(practiceId),
    queryFn: () => getPracticeItems(practiceId),
  });
};

export const useGetPracticesByCollectionId = (collectionId: number) => {
  return useSuspenseQuery({
    queryKey: practiceKeys.byCollectionId(collectionId),
    queryFn: () => getPracticesByCollectionId(collectionId),
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
