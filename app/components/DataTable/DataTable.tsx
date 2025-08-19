import { useEffect, useState } from "react";

interface DataTableType {
  datas: Array<Array<string>>;
  tableHeaders?: Array<string>;
  tableTitle?: string;
}

export default function DataTable({
  datas,
  tableHeaders,
  tableTitle,
}: DataTableType) {
  const [dataList, setDataList] = useState(datas);

  useEffect(() => {
    setDataList(datas);
  }, []);

  console.log(dataList);

  return (
    <>
      <section className="section">
        <h2 className="title">{tableTitle}</h2>
        <table className="table">
          <thead className="thead">
            <tr className="row">
              {tableHeaders?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="tbody">
            {dataList.map((row, index) => (
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
