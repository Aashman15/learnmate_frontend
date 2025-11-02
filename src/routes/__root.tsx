import { Navbar } from "@/components/navbar";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Provider enableSystem={false} defaultTheme="light">
      <Navbar />
      <Outlet />
      <Toaster />
    </Provider>
  );
}
