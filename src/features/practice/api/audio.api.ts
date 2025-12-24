import { api } from "@/lib/axios";
import type { AudioUploadResponse } from "../dtos/AudioUploadResponse";
import type { MessageDto } from "@/dtos/MessageDto";
import { blobFromUrl } from "@/utils/file.utils";
import { getSupportedAudioFormat } from "@/utils/audio.utils";

export const uploadRecoredAudio = async (url: string) => {
  const blob = await blobFromUrl(url);

  const file = new File(
    [blob],
    `recording.${getSupportedAudioFormat().extension}`,
    { type: blob.type }
  );

  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<AudioUploadResponse>(
    "/audios/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteAudio = async (fileName: string) => {
  const response = await api.delete<MessageDto>(`/audios/delete/${fileName}`);
  return response.data;
};
