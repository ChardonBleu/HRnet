import { employeesSetAll, store, type RootState } from "./store";
import { STORAGE_KEY } from "~/utils/constants";

const isClient = typeof window !== "undefined";

/**
 * For store persistance
 * State is restored from local storage on app chargement
 * @returns
 */
export const loadAndRestoreState = () => {
  if (!isClient) return;

  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState) as RootState;
      if (parsedState.employees?.entities) {
        const employees = Object.values(parsedState.employees.entities).filter(
          Boolean,
        );
        store.dispatch(employeesSetAll(employees));
      }
    }
  } catch (err) {
    console.warn("Impossible de charger l'état:", err);
  }
};

/**
 * For store persistance
 * state is saved in localStorage on each change
 * @returns
 */
export const saveState = (state: RootState) => {
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
