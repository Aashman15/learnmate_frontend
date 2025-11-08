import { toaster } from "@/components/ui/toaster";
import { createQueryOptionsForCollectionById } from "@/features/collection/collection.hooks";
import { createFileRoute } from "@tanstack/react-router";

import QuestionFormPage from "@/features/question/components/question-form-page";
import { useCreateQuestion } from "@/features/question/question.hooks";
import {
  questionFormSchema,
  type QuestionFormValues,
} from "@/features/question/schema/question-form-schema";
import { queryClient } from "@/lib/react-query";
import { getErrorMessage } from "@/utils/error.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute(
  "/collections/$collectionId/questions/new"
)({
  loader: async ({ params: { collectionId } }) => {
    await queryClient.ensureQueryData(
      createQueryOptionsForCollectionById(Number(collectionId))
    );
  },
  component: CreateQuestionPage,
});

function CreateQuestionPage() {
  const { collectionId } = Route.useParams();

  const router = useRouter();

  const methods = useForm<QuestionFormValues>({
    defaultValues: {
      question: "",
      answer: "",
      collectionId: Number(collectionId),
    },
    resolver: zodResolver(questionFormSchema),
  });

  const { reset } = methods;

  const { mutateAsync: createQuestion } = useCreateQuestion();

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      await createQuestion(data);
      toaster.create({
        description: "Question created successfully.",
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
    />
  );
}
