import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/Home/index.tsx"),
  route("suspense", "./routes/Suspense/index.tsx"),
] satisfies RouteConfig;
