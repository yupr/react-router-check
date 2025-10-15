import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/Home/index.tsx"),
  route("users", "./routes/Users/index.tsx"),
  route("todo", "./routes/Todo/index.tsx"),
] satisfies RouteConfig;
