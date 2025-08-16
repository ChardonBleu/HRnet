import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("employee-list", "./routes/employees/employees.tsx"),
] satisfies RouteConfig;
