import PracticeNav from "@/features/practice-session/components/practice-nav";
import { usePracticeStore } from "@/features/practice-session/store/practice-store";
import { usePreventExit } from "@/hooks/usePreventExit";
import { Container } from "@chakra-ui/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/practice")({
  beforeLoad: () => {
    const practiceId = usePracticeStore.getState().practiceId;
    if (practiceId === null) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: PracticeLayout,
});

function PracticeLayout() {
  usePreventExit(true);

  const setCurrentIndex = usePracticeStore((state) => state.setCurrentIndex);

  useEffect(() => {
    return () => {
      setCurrentIndex(0);
    };
  }, [setCurrentIndex]);

  return (
    <Container>
      <PracticeNav />
      <Outlet />
    </Container>
  );
}
