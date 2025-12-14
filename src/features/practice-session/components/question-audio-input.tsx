import MySimpleAudioRecorder from "@/components/my-simple-audio-recorder";
import { usePracticeStore } from "../store/practice-store";

export default function QuestionAudioInput() {
  const { setCurrentItemAudioUrl, currentIndex, items } = usePracticeStore();

  return (
    <MySimpleAudioRecorder
      audioUrl={items[currentIndex].audioUrl}
      onSetAudioUrl={setCurrentItemAudioUrl}
    />
  );
}
