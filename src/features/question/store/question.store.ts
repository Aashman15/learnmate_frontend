import { create } from "zustand";

type QuestionStoreState = {
  showAnswers: boolean;

  setShowAnswers: (v: boolean) => void;
};

export const useQuestionStore = create<QuestionStoreState>((set) => ({
  showAnswers: false,

  setShowAnswers: (v) => {
    set({
      showAnswers: v,
    });
  },
}));
