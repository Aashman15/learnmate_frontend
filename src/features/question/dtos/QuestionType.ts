export const QUESTION_TYPES = [
  "TEXT",
  "MULTIPLE_CHOICE",
  "SINGLE_CHOICE",
  "TRUE_FALSE",
] as const;

export type QuestionType = (typeof QUESTION_TYPES)[number];

export const getQuestionTypeLabel = (type: QuestionType) => {
  switch (type) {
    case "MULTIPLE_CHOICE":
      return "Multiple Choice";
    case "SINGLE_CHOICE":
      return "Single Choice";
    case "TRUE_FALSE":
      return "True or False";
    case "TEXT":
      return "Text";
    default:
      return type;
  }
};
