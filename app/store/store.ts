import {
    createEntityAdapter,
    createSlice,
    configureStore,
} from '@reduxjs/toolkit'

const employeeAdapter = createEntityAdapter({
})

const employeeSlice = createSlice({
    name: 'employees',
    initialState: employeeAdapter.getInitialState(),
    reducers: {
        employeeAdded: employeeAdapter.addOne,
        newEmployee(state, action) {
            employeeAdapter.addOne(state, action.payload)
        }
    }
})

export const store = configureStore({
    reducer: {
        employees: employeeSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

const employeesSelectors = employeeAdapter.getSelectors<RootState>(
    (state) => state.employees,
)

export const allEmployees = employeesSelectors.selectAll(store.getState())

export const { employeeAdded, newEmployee } = employeeSlice.actions;