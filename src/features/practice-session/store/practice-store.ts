import { create } from "zustand";
import type { PracticeItemWithAnswer } from "../dtos/PracticeItemWithAnswer";
import type { PracticeInputMode } from "../practice-types";

interface PracticeState {
  practiceId: number | null;
  inputMode: PracticeInputMode;
  items: PracticeItemWithAnswer[];
  currentIndex: number;
}

interface PracticeStateActions {
  hasNext: () => boolean;
  hasPrevious: () => boolean;
  moveToNext: () => void;
  moveToPrevious: () => void;
  setPracticeId: (practiceId: number) => void;
  setInputMode: (inputMode: PracticeInputMode) => void;
  setItems: (items: PracticeItemWithAnswer[]) => void;
  setCurrentIndex: (index: number) => void;
  setCurrentItemAnswer: (answer: string) => void;
}

export const usePracticeStore = create<PracticeState & PracticeStateActions>(
  (set, get) => ({
    practiceId: null,
    inputMode: "text",
    currentIndex: 0,
    itemFilter: "all",
    items: [],

    hasNext: () => {
      const lastIndex = get().items.length - 1;
      const currentIndex = get().currentIndex;
      return currentIndex < lastIndex;
    },

    hasPrevious: () => {
      const currentIndex = get().currentIndex;
      return currentIndex > 0;
    },

    moveToNext: () => {
      set((state) => ({
        currentIndex: state.currentIndex + 1,
      }));
    },

    moveToPrevious: () => {
      set((state) => ({
        currentIndex: state.currentIndex - 1,
      }));
    },

    setPracticeId: (practiceId: number) => {
      set({
        practiceId,
      });
    },

    setInputMode: (inputMode: PracticeInputMode) => {
      set({
        inputMode,
      });
    },

    setItems: (items: PracticeItemWithAnswer[]) => {
      set({
        items,
      });
    },

    setCurrentIndex: (currentIndex: number) => {
      set({
        currentIndex,
      });
    },

    setCurrentItemAnswer: (answer: string) => {
      set((state) => {
        const newItems = [...state.items];
        newItems[state.currentIndex] = {
          ...newItems[state.currentIndex],
          answer: answer,
        };
        return {
          items: newItems,
        };
      });
    },
  })
);
