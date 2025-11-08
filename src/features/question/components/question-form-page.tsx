import { createQueryOptionsForCollectionById } from "@/features/collection/collection.hooks";
import { type QuestionFormValues } from "@/features/question/schema/question-form-schema";
import {
  Button,
  Container,
  Field,
  Fieldset,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { type UseFormReturn } from "react-hook-form";
import { RiArrowLeftLine } from "react-icons/ri";

interface QuestionFormPageProps {
  useFormReturn: UseFormReturn<QuestionFormValues>;
  onSubmit: (data: QuestionFormValues) => void;
  isUpdateMode?: boolean;
  collectionId: number;
}

export default function QuestionFormPage({
  useFormReturn,
  onSubmit,
  isUpdateMode = false,
  collectionId,
}: QuestionFormPageProps) {
  const router = useRouter();
  const { data: collection } = useSuspenseQuery(
    createQueryOptionsForCollectionById(Number(collectionId))
  );

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormReturn;

  return (
    <Container mt={10} width={"fit-content"} marginInline={"auto"}>
      <Button variant={"outline"} onClick={() => router.history.back()}>
        <RiArrowLeftLine /> Back
      </Button>

      <Stack mt={4}>
        <Heading>{isUpdateMode ? "Update" : "Create"} Question </Heading>
        <Text>Please fill the question details below</Text>
      </Stack>

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

          <Field.Root invalid={!!errors.answer}>
            <Field.Label>Answer</Field.Label>
            <Textarea
              placeholder="Enter answer"
              {...register("answer", {
                setValueAs: (v) => (v.trim() === "" ? undefined : v),
              })}
            />
            <Field.ErrorText>{errors.answer?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <HStack>
          <Button variant={"outline"} onClick={() => router.history.back()}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting}
            loadingText={isUpdateMode ? "Updating..." : "Creating..."}
          >
            {isUpdateMode ? "Update" : "Create"} Question
          </Button>
        </HStack>
      </Fieldset.Root>
    </Container>
  );
}
