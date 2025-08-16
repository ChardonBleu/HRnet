import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { loadAndRestoreState, saveState } from "./storePersistance";
import { store, employeeAdded, employeesSetAll } from "./store";
import { getAllEmployees } from "./selectors";
import { STORAGE_KEY } from "~/utils/constants";
import type { Employee } from "./store";

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

describe("Store Persistence Functions with Real Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    consoleSpy.mockClear();

    store.dispatch(employeesSetAll([]));
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe("loadAndRestoreState", () => {
    it("should not dispatch if no saved state in localStorage", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      loadAndRestoreState();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);

      const employees = getAllEmployees();
      expect(employees).toHaveLength(0);
    });

    it("should not dispatch if saved state has no employees entities", () => {
      const mockState = {
        employees: {
          ids: [],
          entities: null,
        },
      };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));

      loadAndRestoreState();
      const employees = getAllEmployees();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
      expect(employees).toHaveLength(0);
    });

    it("should load and restore employees when valid state exists", () => {
      const mockEmployees = {
        "1": { id: "1", firstName: "John", lastName: "Doe" },
        "2": null,
        "3": { id: "3", firstName: "Jane", lastName: "Smith" },
        "4": undefined,
      };

      const mockState = {
        employees: {
          ids: ["1", "2", "3", "4"],
          entities: mockEmployees,
        },
      };

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));

      loadAndRestoreState();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);

      const employees = getAllEmployees();
      expect(employees).toHaveLength(2);
      expect(employees).toEqual(
        expect.arrayContaining([
          { id: "1", firstName: "John", lastName: "Doe" },
          { id: "3", firstName: "Jane", lastName: "Smith" },
        ]),
      );
    });

    it("should handle localStorage access errors", () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage not available");
      });

      loadAndRestoreState();

      expect(consoleSpy).toHaveBeenCalledWith(
        "Impossible de charger l'état:",
        expect.any(Error),
      );

      const employees = getAllEmployees();
      expect(employees).toHaveLength(0);
    });
  });

  describe("save state", () => {
    it("should save current store state to localStorage", () => {
      const employee1: Employee = {
        birthDate: "01-01-2000",
        city: "Ampuis",
        department: "Marketing",
        firstName: "Mariane",
        id: "GqPNWmMbpTlYsLNHrq-rS",
        lastName: "Durand",
        startDate: "04-08-2025",
        state: "Arkansas",
        street: "11 Trieves street",
        zipCode: "48751",
      };
      const employee2: Employee = {
        birthDate: "01-01-2000",
        city: "Tarbigor",
        department: "Sales",
        firstName: "Jean",
        id: "p-O0TT3GYaOdWncFLstPI",
        lastName: "Dupont",
        startDate: "04-08-2025",
        state: "Massachusetts",
        street: "21 Henry Niceview street",
        zipCode: "58712",
      };

      store.dispatch(store.dispatch(employeesSetAll([employee1, employee2])));

      const currentState = store.getState();
      saveState(currentState);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify(currentState),
      );
    });

    it("should handle localStorage save errors", () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("localStorage full");
      });

      const currentState = store.getState();
      saveState(currentState);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Impossible de sauvegarder:",
        expect.any(Error),
      );
    });
  });

  describe("Integration Tests", () => {
    it("should complete save and restore cycle", () => {
      const employee: Employee = {
        birthDate: "01-01-2000",
        city: "Ampuis",
        department: "Marketing",
        firstName: "Mariane",
        id: "GqPNWmMbpTlYsLNHrq-rS",
        lastName: "Durand",
        startDate: "04-08-2025",
        state: "Arkansas",
        street: "11 Trieves street",
        zipCode: "48751",
      };

      store.dispatch(store.dispatch(employeeAdded(employee)));

      const stateToSave = store.getState();
      saveState(stateToSave);

      store.dispatch(store.dispatch(employeesSetAll([])));
      expect(getAllEmployees()).toHaveLength(0);

      const savedData = JSON.stringify(stateToSave);
      mockLocalStorage.getItem.mockReturnValue(savedData);

      loadAndRestoreState();
      const restoredEmployees = getAllEmployees();
      expect(restoredEmployees).toHaveLength(1);
      expect(restoredEmployees).toEqual(
        expect.arrayContaining([
          {
            birthDate: "01-01-2000",
            city: "Ampuis",
            department: "Marketing",
            firstName: "Mariane",
            id: "GqPNWmMbpTlYsLNHrq-rS",
            lastName: "Durand",
            startDate: "04-08-2025",
            state: "Arkansas",
            street: "11 Trieves street",
            zipCode: "48751",
          },
        ]),
      );
    });

    it("should handle empty store save and restore", () => {
      expect(getAllEmployees()).toHaveLength(0);
      const emptyState = store.getState();
      saveState(emptyState);
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(emptyState));
      loadAndRestoreState();
      expect(getAllEmployees()).toHaveLength(0);
    });
  });

  describe("Real Store Behavior Tests", () => {
    it("should verify store selectors work correctly", () => {
      const employees: Employee[] = [
        {
          birthDate: "01-01-2000",
          city: "Ampuis",
          department: "Marketing",
          firstName: "Mariane",
          id: "GqPNWmMbpTlYsLNHrq-rS",
          lastName: "Durand",
          startDate: "04-08-2025",
          state: "Arkansas",
          street: "11 Trieves street",
          zipCode: "48751",
        },
        {
          birthDate: "01-01-2000",
          city: "Tarbigor",
          department: "Sales",
          firstName: "Jean",
          id: "p-O0TT3GYaOdWncFLstPI",
          lastName: "Dupont",
          startDate: "04-08-2025",
          state: "Massachusetts",
          street: "21 Henry Niceview street",
          zipCode: "58712",
        },
      ];

      store.dispatch(store.dispatch(employeesSetAll(employees)));

      const allEmployees = getAllEmployees();
      expect(allEmployees).toHaveLength(2);
      expect(allEmployees[0].firstName).toBe("Mariane");
      expect(allEmployees[1].firstName).toBe("Jean");
    });

    it("should verify store state structure", () => {
      const employee: Employee = {
        birthDate: "01-01-2000",
        city: "Ampuis",
        department: "Marketing",
        firstName: "Mariane",
        id: "GqPNWmMbpTlYsLNHrq-rS",
        lastName: "Durand",
        startDate: "04-08-2025",
        state: "Arkansas",
        street: "11 Trieves street",
        zipCode: "48751",
      };

      store.dispatch(store.dispatch(employeesSetAll([employee])));

      const state = store.getState();
      expect(state.employees).toBeDefined();
      expect(state.employees.entities).toBeDefined();
      expect(state.employees.ids).toBeDefined();
      expect(state.employees.entities["GqPNWmMbpTlYsLNHrq-rS"]).toEqual(
        employee,
      );
    });
  });
});
