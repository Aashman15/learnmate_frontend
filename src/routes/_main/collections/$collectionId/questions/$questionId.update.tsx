import { toaster } from "@/components/ui/toaster";
import { createFileRoute } from "@tanstack/react-router";

import QuestionFormPage from "@/features/question/components/question-form-page";
import {
  createQOForQuestionById,
  useUpdateQuestion,
} from "@/features/question/question.hooks";
import {
  questionFormSchema,
  type QuestionFormValues,
} from "@/features/question/schema/question-form-schema";
import { getErrorMessage } from "@/utils/error.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute(
  "/_main/collections/$collectionId/questions/$questionId/update"
)({
  component: UpdateQuestionPage,
});

function UpdateQuestionPage() {
  const { collectionId, questionId } = Route.useParams();

  const router = useRouter();

  const { data: question } = useSuspenseQuery(
    createQOForQuestionById(Number(questionId))
  );

  const methods = useForm<QuestionFormValues>({
    defaultValues: {
      question: question.question,
      answer: question.answer,
      collectionId: Number(collectionId),
    },
    resolver: zodResolver(questionFormSchema),
  });

  const { reset } = methods;

  const { mutateAsync: updateQuestion } = useUpdateQuestion();

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      await updateQuestion({
        questionId: Number(questionId),
        data,
      });
      toaster.create({
        description: "Question updated successfully.",
        type: "success",
      });
      reset();
      router.history.back();
    } catch (error) {
      toaster.create({
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <QuestionFormPage
      collectionId={Number(collectionId)}
      onSubmit={onSubmit}
      useFormReturn={methods}
      isUpdateMode
    />
  );
}
