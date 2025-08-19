import { useEffect, useState, type FormEvent } from "react";

interface DataTableType {
  datas: Array<Array<string>>;
  tableHeaders: Array<string>;
  tableTitle?: string;
}

export default function DataTable({
  datas,
  tableHeaders,
  tableTitle,
}: DataTableType) {
  const [sortedDatas, setSortedDatas] = useState<Array<Array<string>>>([]);
  const [isSorted, setIsSorted] = useState<boolean[]>([]);

  useEffect(() => {
    setSortedDatas(datas);
    setIsSorted(new Array(datas.length).fill(false));
  }, [datas]);

  function handleSort(index: number) {
    if (tableHeaders[index].toLowerCase().includes("date")) {
      const sorted = [...sortedDatas].sort(
        (a, b) => {
            return isSorted[index]
                ? new Date(a[index]).getTime() - new Date(b[index]).getTime()
                : new Date(b[index]).getTime() - new Date(a[index]).getTime()
        },
      );
      console.log("dans date");
      sortedDatas.map((data) => console.log(new Date(data[index])))
      setSortedDatas(sorted);
    } else {
      const sorted = [...sortedDatas].sort(function (a, b) {
        return isSorted[index]
          ? a[index].localeCompare(b[index])
          : b[index].localeCompare(a[index]);
      });
      setSortedDatas(sorted);
    }

    isSorted[index] = !isSorted[index];
    setIsSorted(isSorted);
  }

  function handleFilter(event: FormEvent) {
    event.preventDefault()

  }

  return (
    <>
      <section className="data-table">
        <h2 className="title">{tableTitle}</h2>
        <div className="tools">
            <div className="pagination">pagination</div>
            <div className="filter">
                <form onSubmit={(event) => handleFilter(event)}>
                    <input
                        type="text"
                        placeholder="filter"
                        name="filter"
                    />
                    <button type="submit"><i className="fa fa-filter"></i></button>
                </form>
                </div>
        </div>
        <table className="table">
          <thead className="thead">
            <tr className="row">
              {tableHeaders?.map((header, index) => (
                <th key={index}>
                  {header}{" "}
                  <i
                    className="fa fa-sort"
                    onClick={() => handleSort(index)}
                  ></i>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tbody">
            {sortedDatas.map((row, index) => (
              <tr key={index} className="row">
                {row.map((item, index) => (
                  <td key={index}>{item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
