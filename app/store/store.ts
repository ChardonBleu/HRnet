import {
  createEntityAdapter,
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  department: string;
  startDate: string;
  state: string;
  street: string;
  zipCode: string;
}

export type RootState = ReturnType<typeof store.getState>;

export const employeeAdapter = createEntityAdapter<Employee>({});

const employeeSlice = createSlice({
  name: "employees",
  initialState: employeeAdapter.getInitialState(),
  reducers: {
    employeeAdded: employeeAdapter.addOne,
    employeesSetAll: employeeAdapter.setAll,
    employeeDelete: employeeAdapter.removeOne,
  },
});

export const store = configureStore({
  reducer: {
    employees: employeeSlice.reducer,
  },
});

export const { employeeAdded, employeesSetAll, employeeDelete } =
  employeeSlice.actions;
