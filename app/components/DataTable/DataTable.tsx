import { useEffect, useState, type MouseEvent } from "react";

interface DataTableType {
  datas: Array<Array<string>>;
  tableHeaders: Array<string>;
  tableTitle?: string;
}

const OPTIONS_VALUES = [10, 25, 50, 100];

export default function DataTable({
  datas,
  tableHeaders,
  tableTitle,
}: DataTableType) {
  const [sortedDatas, setSortedDatas] = useState<Array<Array<string>>>([]);
  const [displayedDatas, setDisplayedDatas] = useState<Array<Array<string>>>(
    [],
  );
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [isSorted, setIsSorted] = useState<boolean[]>([]);
  const [PagesButtons, setPagesButtons] = useState<Array<number>>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [numberOfEmployees, setnumberOfEmployees] = useState<number>(0)

  useEffect(() => {
    setSortedDatas(datas);
    setnumberOfEmployees(datas.length)
    setIsSorted(new Array(tableHeaders.length).fill(false));
  }, [datas, tableHeaders.length]);

  useEffect(() => {
    setDisplayedDatas(
      sortedDatas.slice(
        (activePage - 1) * itemPerPage,
        itemPerPage * activePage,
      ),
    );
  }, [sortedDatas, itemPerPage, activePage]);

  useEffect(() => {
    const nbPages = Math.ceil(numberOfEmployees / itemPerPage);
    setPagesButtons(Array.from({ length: nbPages }, (_, index) => index + 1));
  }, [numberOfEmployees]);

  function handleSort(index: number) {
    if (tableHeaders[index].toLowerCase().includes("date")) {
      const sorted = [...sortedDatas].sort((a, b) => {
        return isSorted[index]
          ? new Date(a[index]).getTime() - new Date(b[index]).getTime()
          : new Date(b[index]).getTime() - new Date(a[index]).getTime();
      });
      setSortedDatas(sorted);
      setDisplayedDatas(
        sorted.slice((activePage - 1) * itemPerPage, itemPerPage * activePage),
      );
    } else {
      const sorted = [...sortedDatas].sort(function (a, b) {
        return isSorted[index]
          ? a[index].localeCompare(b[index])
          : b[index].localeCompare(a[index]);
      });
      setSortedDatas(sorted);
      setDisplayedDatas(
        sorted.slice((activePage - 1) * itemPerPage, itemPerPage * activePage),
      );
    }
    const newIsSorted = [...isSorted];
    newIsSorted[index] = !newIsSorted[index];
    setIsSorted(newIsSorted);
  }

  function handleFilter() {
    const input = document.querySelector("input");
    if (input && input?.value.length > 0) {
      const newEmployeeList = sortedDatas.filter((data) =>
        data
          .map((item) => item.toLowerCase().includes(input.value.toLowerCase()))
          .reduce((acc, bool) => acc || bool),
      );
      setnumberOfEmployees(newEmployeeList.length)
      setDisplayedDatas(
        newEmployeeList.slice(
          (activePage - 1) * itemPerPage,
          itemPerPage * activePage,
        ),
      );
    } else {
      setnumberOfEmployees(sortedDatas.length)
      setDisplayedDatas(
        sortedDatas.slice(
          (activePage - 1) * itemPerPage,
          itemPerPage * activePage,
        ),
      );
    }
  }

  function toggleOptions() {
    const options = document.querySelector(".options");
    options?.classList.toggle("show-options");
  }

  function handleSelect(event: MouseEvent<HTMLDivElement>) {
    const optionValue = event.currentTarget.innerText;
    const selectValue = document.getElementById("select-value");
    if (selectValue) {
      selectValue.innerText = optionValue;
      setItemPerPage(Number(optionValue));
    }
    toggleOptions();
  }

  function handleChangePage(event: MouseEvent<HTMLButtonElement>) {
    const currentPageButton = event.currentTarget;
    setActivePage(Number(currentPageButton.innerText));
  }

  function handlePreviousPage() {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    } else {
      setActivePage(1);
    }
    console.log(activePage);
  }

  function handleNextPage() {
    const maxPage = PagesButtons.reduce((accumulator, currentValue) =>
      Math.max(accumulator, currentValue),
    );
    if (activePage < maxPage) {
      setActivePage(activePage + 1);
    } else {
      setActivePage(maxPage);
    }
    console.log(activePage);
  }

  return (
    <>
      <section className="data-table">
        {
          tableTitle ? <h2 className="title">{tableTitle}</h2> : ""
        }
        <div className="tools">
          <div className="pagination">
            <div>Show</div>

            <div className="select">
              <div className="value" onClick={() => toggleOptions()}>
                <p id="select-value">10</p>
                <i className="fa fa-chevron-down"></i>
              </div>
              <div className="options">
                {OPTIONS_VALUES.map((value) => (
                  <div
                    key={value}
                    className="option"
                    onClick={(event) => handleSelect(event)}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>

            <div>employees</div>
          </div>
          <div className="filter">
            <label className="">Search: </label>
            <input
              type="text"
              placeholder="filter"
              name="filter"
              onChange={() => handleFilter()}
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>
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
          <tbody>
            {displayedDatas.map((row, index) => (
              <tr key={index} className="row">
                {row.map((item, index) => (
                  <td key={index}>{item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tools">
          <p>
            Showing {(activePage - 1) * itemPerPage + 1} to{" "}
            {Math.min(itemPerPage * activePage, numberOfEmployees)} of{" "}
            {numberOfEmployees} entries
          </p>
          <div className="pages-navigation">
            <i
              className="fa fa-backward-fast"
              onClick={() => setActivePage(1)}
              title="First"
            ></i>
            <i
              className="fa fa-backward-step"
              onClick={() => handlePreviousPage()}
              title="Previous"
            ></i>
            {PagesButtons.map((num) => (
              <button
                key={num}
                name={String(num)}
                className={
                  activePage === num
                    ? "page-button page-button_active"
                    : "page-button"
                }
                onClick={(event) => handleChangePage(event)}
              >
                {num}
              </button>
            ))}
            <i
              className="fa fa-forward-step"
              onClick={() => handleNextPage()}
              title="Next"
            ></i>
            <i
              className="fa fa-forward-fast"
              onClick={() =>
                setActivePage(
                  PagesButtons.reduce((accumulator, currentValue) =>
                    Math.max(accumulator, currentValue),
                  ),
                )
              }
              title="Last"
            ></i>
          </div>
        </div>
      </section>
    </>
  );
}
