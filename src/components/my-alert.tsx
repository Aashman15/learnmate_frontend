import { Alert, type AlertRootProps } from "@chakra-ui/react";

interface MyAlertProps extends AlertRootProps {
  title?: string;
  description?: string;
}

export default function MyAlert({
  title,
  description,
  ...rootProps
}: MyAlertProps) {
  return (
    <Alert.Root {...rootProps}>
      <Alert.Indicator />
      <Alert.Content>
        {title && <Alert.Title>{title}</Alert.Title>}
        {description && <Alert.Description>{description}</Alert.Description>}
      </Alert.Content>
    </Alert.Root>
  );
}
