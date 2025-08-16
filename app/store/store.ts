import {
    createEntityAdapter,
    createSlice,
    configureStore,
} from '@reduxjs/toolkit'

const STORAGE_KEY = "redux-state";
const isClient = typeof window !== 'undefined';

const employeeAdapter = createEntityAdapter({})

const employeeSlice = createSlice({
    name: 'employees',
    initialState: employeeAdapter.getInitialState(),
    reducers: {
        employeeAdded: employeeAdapter.addOne,
        employeesSetAll: employeeAdapter.setAll
    }
})

export const store = configureStore({
    reducer: {
        employees: employeeSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export const loadAndRestoreState = () => {
    if (!isClient) return;
    
    try {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            const parsedState = JSON.parse(savedState) as RootState;
            if (parsedState.employees?.entities) {
                const employees = Object.values(parsedState.employees.entities).filter(Boolean);
                store.dispatch(employeesSetAll(employees));
            }
        }
    } catch (err) {
        console.warn("Impossible de charger l'état:", err);
    }
};

const saveState = (state: RootState) => {
    if (!isClient) return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
        console.warn("Impossible de sauvegarder:", err);
    }
};

if (isClient) {
    store.subscribe(() => {
        saveState(store.getState());
    });
}

const employeesSelectors = employeeAdapter.getSelectors<RootState>(
    (state) => state.employees,
)

export const getAllEmployees = () => employeesSelectors.selectAll(store.getState())


export const { employeeAdded, employeesSetAll } = employeeSlice.actions;