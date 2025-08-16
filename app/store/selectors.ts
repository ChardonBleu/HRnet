import { employeeAdapter, store, type RootState } from "./store";

const employeesSelectors = employeeAdapter.getSelectors<RootState>(
  (state) => state.employees,
);
export const getAllEmployees = () =>
  employeesSelectors.selectAll(store.getState());
