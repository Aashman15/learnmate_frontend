import { z } from "zod";
import { QUESTION_TYPES } from "../dtos/QuestionType";

export const choiceSchema = z.object({
  choice: z
    .string()
    .trim()
    .min(2, { message: "Choice should be 2-255 characters long" })
    .max(255, { message: "Choice should be 2-255 characters long" }),
  correctChoice: z.boolean(),
});

export const questionFormSchema = z.object({
  collectionId: z.number(),
  question: z
    .string()
    .trim()
    .min(2, { message: "Question should be 2-255 characters long" })
    .max(255, { message: "Question should be 2-255 characters long" }),
  choices: z.array(choiceSchema).optional(),
  answer: z
    .string()
    .trim()
    .min(2, { message: "Answer should be between 2 to 5000 characters" })
    .max(5000, { message: "Answer should be between 2 to 5000 characters" })
    .optional(),
  type: z.array(z.enum(QUESTION_TYPES)).min(1).max(1),
});

export type QuestionFormValues = z.infer<typeof questionFormSchema>;
