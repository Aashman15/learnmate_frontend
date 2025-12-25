import { create } from "zustand";
import type { PracticeInputType } from "../practice-types";
interface PracticeState {
  collectionId?: number | null;
  practiceId?: number | null;
  inputMode?: PracticeInputType;
  items: PracticeItemWithAnswer[];
  currentIndex: number;
}

interface PracticeStateActions {
  hasNext: () => boolean;
  hasPrevious: () => boolean;
  moveToNext: () => void;
  moveToPrevious: () => void;
  setPracticeId: (practiceId: number) => void;
  setCollectionId: (collectionId: number) => void;
  setInputMode: (inputMode: PracticeInputType) => void;
  setItems: (items: PracticeItemWithAnswer[]) => void;
  setCurrentIndex: (index: number) => void;
  setCurrentItemAnswer: (answer: string) => void;
  setCurrentItemAudioUrl: (url?: string) => void;
}

export const usePracticeStore = create<PracticeState & PracticeStateActions>(
  (set, get) => ({
    collectionId: null,
    practiceId: null,
    inputMode: "TEXT",
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
    setCollectionId: (collectionId: number) => {
      set({
        collectionId,
      });
    },

    setInputMode: (inputMode: PracticeInputType) => {
      set({
        inputMode: inputMode,
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
    setCurrentItemAudioUrl: (url?: string) => {
      set((state) => {
        const newItems = [...state.items];
        newItems[state.currentIndex] = {
          ...newItems[state.currentIndex],
          audioUrl: url,
        };
        return {
          items: newItems,
        };
      });
    },
  })
);
