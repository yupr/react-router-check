import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache(),
});

enableApiMocking().then(() => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <ApolloProvider client={client}>
          <HydratedRouter />
        </ApolloProvider>
      </StrictMode>
    );
  });
});

// https://reactrouter.com/api/framework-conventions/entry.client.tsx#entryclienttsx
async function enableApiMocking() {
  if (import.meta.env.VITE_ENABLE_MOCK !== "true") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start();
}
