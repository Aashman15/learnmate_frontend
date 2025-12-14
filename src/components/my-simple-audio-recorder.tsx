import Timer from "@/features/practice-session/components/timer";
import { Button, HStack } from "@chakra-ui/react";
import CircularProgress from "./circular-progress";
import { useReactMediaRecorder } from "react-media-recorder";
import { getSupportedAudioFormat } from "@/utils/audio.utils";
import {
  useDeleteAudio,
  useUploadAudio,
} from "@/features/practice-session/audio.hooks";
import { toaster } from "./ui/toaster";
import { getErrorMessage } from "@/utils/error.utils";

interface MySimpleAudioRecorderProps {
  audioUrl?: string;
  onSetUrl?: (url: string | undefined) => void;
}

export default function MySimpleAudioRecorder(
  props: MySimpleAudioRecorderProps
) {
  const { audioUrl, onSetUrl } = props;

  const { mutateAsync: uploadAudio, isPending: isUploading } = useUploadAudio();

  const { mutateAsync: deleteAudio, isPending: isDeleting } = useDeleteAudio();

  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: {
      type: getSupportedAudioFormat().mimeType,
    },
    onStop: async (url) => {
      try {
        const response = await uploadAudio(url);
        onSetUrl?.(response.url);
      } catch (error) {
        toaster.create({
          type: "error",
          description: getErrorMessage(error),
        });
      }
    },
  });

  const handleReset = async () => {
    try {
      await deleteAudio(getUploadedFileName());
      onSetUrl?.(undefined);
    } catch (error) {
      toaster.create({
        type: "error",
        description: getErrorMessage(error),
      });
    }
  };

  const getUploadedFileCompleteUrl = () => {
    return import.meta.env.VITE_API_BASE_URL + audioUrl;
  };

  const getUploadedFileName = () => {
    return audioUrl!.split("/").pop()!;
  };

  if (isUploading) {
    return <CircularProgress />;
  }

  if (status === "recording") {
    return (
      <HStack gap={4}>
        <Timer />
        <Button variant={"outline"} onClick={stopRecording}>
          Stop
        </Button>
      </HStack>
    );
  }

  if (status === "stopped" && !!audioUrl) {
    return (
      <HStack>
        <audio controls src={getUploadedFileCompleteUrl()} />
        <Button
          variant={"outline"}
          onClick={handleReset}
          disabled={isDeleting}
          loading={isDeleting}
          loadingText={"Resetting..."}
        >
          Reset
        </Button>
      </HStack>
    );
  }

  return (
    <Button variant={"outline"} onClick={startRecording}>
      Record Now
    </Button>
  );
}
