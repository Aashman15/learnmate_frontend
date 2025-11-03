import z from "zod";

export const collectionFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name should be at least 2 characters long")
    .max(100, "Name should not be more than 100 characters long"),
  description: z
    .string()
    .trim()
    .min(2, "Description should be at least 2 characters long")
    .max(500, "Description should not be more than 500 characters long")
    .optional(),
});

export type CollectionFormValues = z.infer<typeof collectionFormSchema>;
