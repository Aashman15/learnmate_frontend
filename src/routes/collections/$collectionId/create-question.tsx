import RHFSelect from "@/components/rhf-select";
import { toaster } from "@/components/ui/toaster";
import { createQueryOptionsForCollectionById } from "@/features/collection/collection.hooks";
import QuestionFormmTypeBasedContent from "@/features/question/components/question-form-type-based-content";
import {
  getQuestionTypeLabel,
  QUESTION_TYPES,
} from "@/features/question/dtos/QuestionType";
import { useCreateQuestion } from "@/features/question/question.hooks";
import {
  questionFormSchema,
  type QuestionFormValues,
} from "@/features/question/schema/question-form-schema";
import { queryClient } from "@/lib/react-query";
import { getErrorMessage } from "@/utils/error.utils";
import {
  Button,
  Container,
  createListCollection,
  Field,
  Fieldset,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { RiArrowLeftLine } from "react-icons/ri";

const questionTypeCollections = createListCollection({
  items: QUESTION_TYPES.map((type) => ({
    label: getQuestionTypeLabel(type),
    value: type,
  })),
});

export const Route = createFileRoute(
  "/collections/$collectionId/create-question"
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

  const { data: collection } = useSuspenseQuery(
    createQueryOptionsForCollectionById(Number(collectionId))
  );

  const router = useRouter();

  const methods = useForm<QuestionFormValues>({
    defaultValues: {
      question: "",
      answer: "",
      choices: [],
      collectionId: Number(collectionId),
      type: ["TEXT"],
    },
    resolver: zodResolver(questionFormSchema),
  });

  const { mutateAsync: createQuestion } = useCreateQuestion();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = methods;

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
    <Container mt={10} width={"fit-content"} marginInline={"auto"}>
      <Button variant={"outline"} onClick={() => router.history.back()}>
        <RiArrowLeftLine /> Back
      </Button>

      <Stack mt={4}>
        <Heading>Create Question </Heading>
        <Text>Please fill the question details below</Text>
      </Stack>

      <FormProvider {...methods}>
        <Fieldset.Root size="lg" width={"md"} mt={8}>
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Collection Name</Field.Label>
              <Input value={collection.name} disabled />
            </Field.Root>
            <Field.Root invalid={!!errors.question}>
              <Field.Label>Question</Field.Label>
              <Input {...register("question")} placeholder="Enter question" />
              <Field.ErrorText>{errors.question?.message}</Field.ErrorText>
            </Field.Root>

            <RHFSelect<QuestionFormValues>
              name="type"
              label="Question Type"
              placeHolder="Select question type"
              collection={questionTypeCollections}
            />

            <QuestionFormmTypeBasedContent />
          </Fieldset.Content>

          <HStack>
            <Button variant={"outline"} onClick={() => router.history.back()}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              loading={isSubmitting}
              loadingText="Creating..."
            >
              Create Question
            </Button>
          </HStack>
        </Fieldset.Root>
      </FormProvider>
    </Container>
  );
}
