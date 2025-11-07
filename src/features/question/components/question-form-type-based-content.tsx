import { useFormContext } from "react-hook-form";
import type { QuestionFormValues } from "../schema/question-form-schema";
import { Field, Textarea } from "@chakra-ui/react";

export default function QuestionFormmTypeBasedContent() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<QuestionFormValues>();

  const type = watch("type");

  return (
    <>
      {type.includes("TEXT") && (
        <Field.Root invalid={!!errors.answer}>
          <Field.Label>Answer</Field.Label>
          <Textarea placeholder="Enter answer" {...register("answer")} />
          <Field.ErrorText>{errors.answer?.message}</Field.ErrorText>
        </Field.Root>
      )}
      {type.includes("MULTIPLE_CHOICE") && <Field.Root>multiple</Field.Root>}
      {type.includes("SINGLE_CHOICE") && <Field.Root>single</Field.Root>}
      {type.includes("TRUE_FALSE") && <Field.Root>true false</Field.Root>}
    </>
  );
}
