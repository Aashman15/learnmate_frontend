export type QuestionType = "text" | "mcq" | "scq" | "true/false";

export const getTypeLabel = (type: QuestionType) => {
  switch (type) {
    case "mcq":
      return "Multiple Choice";
    case "scq":
      return "Single Choice";
    case "true/false":
      return "True/False";
    case "text":
      return "Text Answer";
    default:
      return type;
  }
};
