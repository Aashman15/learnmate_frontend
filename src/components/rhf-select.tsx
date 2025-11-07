import { Field, Portal, Select, type SelectRootProps } from "@chakra-ui/react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface Props<T extends FieldValues> extends SelectRootProps {
  name: Path<T>;
  label: string;
  placeHolder?: string;
}

export default function RHFSelect<T extends FieldValues>({
  name,
  label,
  placeHolder,
  collection,
  ...selectRootProps
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Field.Root invalid={!!error}>
          <Field.Label>{label}</Field.Label>
          <Select.Root
            {...selectRootProps}
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            collection={collection}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={placeHolder} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {collection.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
      )}
    />
  );
}
