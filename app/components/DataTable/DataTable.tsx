import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { employeeDelete } from "~/store/store";

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
//   const dispatch = useDispatch()

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

  return (
    <>
      <section className="data-table">
        <h2 className="title">{tableTitle}</h2>
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
                {/* <td onClick={() => {
                    dispatch(employeeDelete(row[row.length - 1]))
                }}>delete</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
