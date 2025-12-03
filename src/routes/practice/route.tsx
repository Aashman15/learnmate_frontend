import PracticeNav from "@/features/practice-session/components/practice-nav";
import { Container } from "@chakra-ui/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/practice")({
  component: PracticeLayout,
});

function PracticeLayout() {
  return (
    <Container>
      <PracticeNav />
      <Outlet />
    </Container>
  );
}
