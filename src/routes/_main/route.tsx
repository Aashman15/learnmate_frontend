import { Navbar } from "@/components/navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: MainLayout,
});

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
