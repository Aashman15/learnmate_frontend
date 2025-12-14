import { toaster } from "@/components/ui/toaster";
import type { CollectionDto } from "@/features/collection/dtos/CollectionDto";
import { getErrorMessage } from "@/utils/error.utils";
import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  RadioCard,
  Span,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode } from "react";
import type { PracticeInputType } from "../practice-types";
import { getStartPracticeMO } from "../practice-query-options";
import { usePracticeStore } from "../store/practice-store";

type ConfirmPracticeNowDialogProps = {
  collection: CollectionDto;
  children: ReactNode;
};

export default function ConfirmPracticeNowDialog({
  collection,
  children,
}: ConfirmPracticeNowDialogProps) {
  const navigate = useNavigate();

  const { setItems, setPracticeId, setCollectionId, setInputMode, inputMode } =
    usePracticeStore();

  const { mutateAsync: startPracticeAsync, isPending } =
    useMutation(getStartPracticeMO);

  const onStartPractice = async () => {
    try {
      const { practiceId, items } = await startPracticeAsync({
        collectionId: collection.id,
        inputType: inputMode,
      });

      if (items.length === 0) {
        toaster.create({
          type: "error",
          description: "Couldn't fetch questions",
        });
        return;
      }
      setPracticeId(practiceId);
      setCollectionId(collection.id);
      setItems(
        items.map((item) => ({
          answer: "",
          audioUrl: "",
          practiceItemId: item.practiceItemId,
          question: item.question,
        }))
      );
      navigate({
        to: "/practice/question",
      });
    } catch (error) {
      toaster.create({
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <Dialog.Root placement={"top"} motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Please choose a practice mode</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <RadioCard.Root
                value={inputMode}
                onValueChange={(e) => {
                  setInputMode(e.value as PracticeInputType);
                }}
              >
                <RadioCard.Label>Select mode</RadioCard.Label>
                <HStack gap={4}>
                  <RadioCard.Item value={"AUDIO"}>
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                      <RadioCard.ItemText>Audio</RadioCard.ItemText>
                      <RadioCard.ItemIndicator />
                    </RadioCard.ItemControl>
                  </RadioCard.Item>
                  <RadioCard.Item value={"TEXT"}>
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                      <RadioCard.ItemText>Text</RadioCard.ItemText>
                      <RadioCard.ItemIndicator />
                    </RadioCard.ItemControl>
                  </RadioCard.Item>
                </HStack>
              </RadioCard.Root>
              <Text mt={4}>
                <Span color={"red.500"}>Note*</Span> Once you start practice,
                please make sure to submit before you exit out of the browser or
                refreshes the page otherwise you won't be able to continue from
                where you left and you will loose the practice data too.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={onStartPractice}
                disabled={isPending}
                loading={isPending}
                loadingText="Setting up..."
              >
                Practice Now
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
