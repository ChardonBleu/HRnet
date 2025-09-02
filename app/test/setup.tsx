import "@testing-library/jest-dom";

// Si vous utilisez des globals spécifiques à React Testing Library
import { afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Nettoyer le DOM après chaque test
afterEach(() => {
  cleanup();
});

beforeAll(() => {
    vi.mock("@chardonbleu/react-data-table", () => ({
    DataTable: ({ datas, tableHeaders }: { datas: Array<Array<string>>; tableHeaders: Array<string> }) => (
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header: string) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((row: Array<string>, index: number) => (
            <tr key={index}>
              {row.map((item: string, index: number) => (
                <td key={index}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
  }));
})
