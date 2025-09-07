import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { loadAndRestoreState } from "./store/storePersistance";
import type { Route } from "./+types/root";
import "./assets/app.css";
import { useEffect } from "react";
import { Loading } from "./components/Loading/Loading";

export const meta: Route.MetaFunction = () => [
  { title: "HRnet" },
  {
    name: "description",
    content:
      "Modern HR management application for employee data management and workflow optimization",
  },
  {
    name: "keywords",
    content:
      "HR, human resources, employee management, HRnet, workforce management",
  },
  {
    name: "author",
    content: "HRnet Team",
  },
  {
    property: "og:title",
    content: "HRnet - HR Management Application",
  },
  {
    property: "og:description",
    content:
      "Modern HR management application for employee data management and workflow optimization",
  },
  {
    property: "og:type",
    content: "website",
  },
  {
    name: "twitter:card",
    content: "summary",
  },
  {
    name: "twitter:title",
    content: "HRnet - HR Management Application",
  },
  {
    name: "twitter:description",
    content: "Modern HR management application for employee data management",
  },
  {
    name: "robots",
    content: "index, follow",
  },
];

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    fetchPriority: "high",
    as: "image",
    href: "/hrnet_logo.webP",
    type: "image/webp",
  },
  {
    rel: "preload",
    fetchPriority: "high",
    as: "image",
    href: "/wealth_health.webP",
    type: "image/webp",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <Loading />;
}

export default function App() {
  useEffect(() => {
    loadAndRestoreState();
  }, []);

  return (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
