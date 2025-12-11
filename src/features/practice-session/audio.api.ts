import { api } from "@/lib/axios";
import type { AudioUploadResponse } from "./dtos/AudioUploadResponse";
import type { MessageDto } from "@/dtos/MessageDto";

export const uploadAudio = async (blob: Blob) => {
  const formData = new FormData();

  const mimeToExt: Record<string, string> = {
    "audio/ogg": "ogg",
    "audio/opus": "ogg",
    "audio/webm": "webm",
    "audio/wav": "wav",
    "audio/mpeg": "mp3",
  };

  console.log("type");

  console.log(blob.type);

  const ext = mimeToExt[blob.type.split(";")[0].trim()];
  formData.append("file", blob, `recording.${ext}`);
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
