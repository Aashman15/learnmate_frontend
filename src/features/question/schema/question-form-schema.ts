import { z } from "zod";

export const questionFormSchema = z.object({
  collectionId: z.number(),
  question: z
    .string()
    .trim()
    .min(2, { message: "Question should be 2-255 characters long" })
    .max(255, { message: "Question should be 2-255 characters long" }),
  answer: z
    .string()
    .trim()
    .min(2, { message: "Answer should be between 2 to 5000 characters" })
    .max(5000, { message: "Answer should be between 2 to 5000 characters" })
    .optional(),
});

export type QuestionFormValues = z.infer<typeof questionFormSchema>;
