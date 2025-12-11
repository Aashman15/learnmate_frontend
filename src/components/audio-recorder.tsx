import Timer from "@/features/practice-session/components/timer";
import { Button, HStack } from "@chakra-ui/react";
import CircularProgress from "./circular-progress";
import { useEffect, useRef, useState } from "react";

interface AudioRecorderProps {
  uploading: boolean;
  onUpload: (blob: Blob) => void;
  url?: string;
  onReset: (url: string) => void;
}

export default function AudioRecorder(props: AudioRecorderProps) {
  const { uploading, url, onUpload, onReset } = props;

  const [recording, setRecording] = useState(false);
  const chunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!url && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, [url]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => {
      if (e.data) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    setRecording(false);

    const supportedTypes = [
      "audio/ogg; codecs=opus",
      "audio/webm; codecs=opus",
      "audio/webm",
    ];

    let chosenType: string | undefined;

    for (const type of supportedTypes) {
      if (MediaRecorder.isTypeSupported(type)) {
        chosenType = type;
        break;
      }
    }

    if (!chosenType) {
      throw new Error("No supported audio MIME type found for MediaRecorder");
    }

    onUpload(new Blob(chunksRef.current, { type: chosenType }));
  };

  const handleReset = () => {
    chunksRef.current = [];
    onReset(url!);
  };

  if (recording) {
    return (
      <HStack gap={4}>
        <Timer />
        <Button variant={"outline"} onClick={stopRecording}>
          Stop
        </Button>
      </HStack>
    );
  }

  if (uploading) {
    return <CircularProgress />;
  }

  if (url) {
    return (
      <HStack>
        <audio ref={audioRef} controls src={url} />
        <Button variant={"outline"} onClick={handleReset}>
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
