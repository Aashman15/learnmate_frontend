import { useMutation } from "@tanstack/react-query";
import { deleteAudio, uploadAudio } from "./audio.api";

export const useDeleteAudio = () => {
  return useMutation({
    mutationFn: deleteAudio,
  });
};

export const useUploadAudio = () => {
  return useMutation({
    mutationFn: uploadAudio,
  });
};
