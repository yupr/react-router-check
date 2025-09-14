import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

// https://reactrouter.com/api/framework-conventions/entry.client.tsx#entryclienttsx
async function enableApiMocking() {
  if (import.meta.env.VITE_APP_ENV !== "local") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start();
}

enableApiMocking().then(() => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>
    );
  });
});
