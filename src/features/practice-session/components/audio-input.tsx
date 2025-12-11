import AudioRecorder from "@/components/audio-recorder";
import { toaster } from "@/components/ui/toaster";
import { getErrorMessage } from "@/utils/error.utils";
import { useDeleteAudio, useUploadAudio } from "../audio.hooks";
import { usePracticeStore } from "../store/practice-store";

export default function AudioInput() {
  const { setCurrentItemAudioUrl, currentIndex, items } = usePracticeStore();

  const { mutateAsync: deleteAudio } = useDeleteAudio();
  const { mutateAsync: uploadAudio, isPending: uploading } = useUploadAudio();

  const handleUpload = async (blob: Blob) => {
    try {
      const response = await uploadAudio(blob);
      setCurrentItemAudioUrl(response.url);
    } catch (error) {
      toaster.create({
        type: "error",
        description: getErrorMessage(error),
      });
    }
  };

  const handleReset = async () => {
    try {
      const url = items[currentIndex].audioUrl;
      const fileName = url!.replace("/files/audios/", "");
      await deleteAudio(fileName);
      setCurrentItemAudioUrl(undefined);
    } catch (error) {
      toaster.create({
        type: "error",
        description: getErrorMessage(error),
      });
    }
  };

  const getAudioUrl = (): string | undefined => {
    if (!items[currentIndex].audioUrl) {
      return undefined;
    }

    return import.meta.env.VITE_API_BASE_URL + items[currentIndex].audioUrl;
  };

  return (
    <AudioRecorder
      url={getAudioUrl()}
      uploading={uploading}
      onUpload={handleUpload}
      onReset={handleReset}
    />
  );
}
