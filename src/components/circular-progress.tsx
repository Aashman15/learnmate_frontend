import { ProgressCircle } from "@chakra-ui/react";

export default function CircularProgress() {
  return (
    <ProgressCircle.Root value={null} size="sm">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  );
}
