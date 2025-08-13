import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("employee-list", "./routes/employees.tsx"),
] satisfies RouteConfig;
