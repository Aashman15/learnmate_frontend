import { toaster } from "@/components/ui/toaster";
import { getErrorMessage } from "@/utils/error.utils";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { PracticeItemDto } from "../dtos/PracticeItemDto";
import { useUpdatePracticeItem } from "../practice-item.hooks";
import type { PracticeInputType } from "../practice-types";
import MySimpleAudioRecorder from "@/components/my-simple-audio-recorder";

interface ChangeAnswerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inputType: PracticeInputType;
  practiceItem: PracticeItemDto;
}

export default function ChangeAnswerDialog(props: ChangeAnswerDialogProps) {
  const { open, onOpenChange, inputType, practiceItem } = props;

  const [answer, setAnswer] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  const { mutateAsync: updatePracticeItem, isPending } =
    useUpdatePracticeItem();

  useEffect(() => {
    if (inputType === "TEXT") {
      setAnswer(practiceItem.givenAnswer ?? "");
    }

    if (inputType === "AUDIO") {
      setAudioUrl(practiceItem.audioUrl);
    }
  }, [practiceItem, inputType]);

  const handleChangeAnswer = () => {
    try {
      updatePracticeItem({
        practiceItemId: practiceItem.id,
        request: {
          givenAnswer: answer.trim() === "" ? undefined : answer.trim(),
          audioUrl: audioUrl,
        },
      });
      toaster.create({
        type: "success",
        description: "Answer changed successfully",
      });
      onOpenChange(false);
    } catch (error) {
      toaster.create({
        type: "error",
        description: getErrorMessage(error),
      });
    }
  };

  const shouldDisableSubmit = () => {
    if (inputType === "TEXT") {
      return answer.trim() === "" || isPending;
    }

    return !audioUrl || isPending;
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => onOpenChange(d.open)}
      closeOnInteractOutside={false}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Change Answer</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {inputType === "TEXT" && (
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter answer..."
                />
              )}

              {inputType === "AUDIO" && (
                <MySimpleAudioRecorder
                  audioUrl={audioUrl}
                  onSetAudioUrl={setAudioUrl}
                />
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleChangeAnswer}
                disabled={shouldDisableSubmit()}
                loading={isPending}
                loadingText="Changing..."
              >
                Change Answer
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
