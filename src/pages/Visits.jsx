/* eslint-disable react/jsx-key */

import useAuthContext from "../context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import UserLayout from "../layouts/UserLayout";

const Visits = () => {
  const { http, config, userId } = useAuthContext();

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    customerVisits();
  }, []);

  async function customerVisits() {
    let url = `/api/customersvisits/${userId}`;

    if (year && month) {
      const formattedMonth = `${year}-${month}`;
      url += `?month=${formattedMonth}`;
    }

    const response = await http.get(url, config);
    // console.log("Reports Data", response.data);
    setApiData(response.data);
  }

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    customerVisits();
  };

  const columns = useMemo(
    () => [
      {
        Header: "Customer Name",
        accessor: "fullname",
      },

      {
        Header: "Visits",
        accessor: "sales_count",
      },
    ],
    []
  );
  const data = useMemo(() => apiData, [apiData]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { sortBy: [{ id: "sales_count", desc: true }] },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    prepareRow,
  } = tableInstance;

  const { pageIndex } = state;

  const months = [
    { value: "all", name: "All" },
    { value: "01", name: "Jan" },
    { value: "02", name: "Feb" },
    { value: "03", name: "Mar" },
    { value: "04", name: "Apr" },
    { value: "05", name: "May" },
    { value: "06", name: "Jun" },
    { value: "07", name: "Jul" },
    { value: "08", name: "Aug" },
    { value: "09", name: "Sep" },
    { value: "10", name: "Oct" },
    { value: "11", name: "Nov" },
    { value: "12", name: "Dec" },
  ];

  const years = [
    { value: 0o0, name: "All" },
    { value: 2022, name: 2022 },
    { value: 2023, name: 2023 },
    { value: 2024, name: 2024 },
    { value: 2025, name: 2025 },
    { value: 2026, name: 2026 },
  ];
  return (
    <UserLayout>
      <div className="bg-zinc-200">
        {/* <Sidebar /> */}

        <div className=" max-w-5xl m-auto">
          <h1 className="pt-4 text-2xl font-bold mb-2">Visits</h1>

          <div>
            <form
              onSubmit={handleSubmit}
              className="flex justify-end items-center space-x-2 mr-10"
            >
              <div>
                <select
                  value={month}
                  onChange={handleMonthChange}
                  id="month"
                  name="month"
                  className="w-20 p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  {months.map((month) => (
                    <option key={month.name} className="" value={month.value}>
                      {month.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={year}
                  onChange={handleYearChange}
                  id="year"
                  name="year"
                  className="w-20 p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  {years.map((year) => (
                    <option key={year.name} value={year.value}>
                      {year.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="middle none center rounded-lg bg-purple-500 py-2 px-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-purple-500/20 transition-all hover:shadow-lg hover:purple-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Submit
                </button>
              </div>
            </form>
            <div>
              <section className="py-1 bg-blueGray-50">
                <div className="w-full px-4 mx-auto mt-2">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 className="font-semibold text-base text-blueGray-700">
                            Overall Visits
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                      <table
                        {...getTableProps}
                        className=" w-full border-collapse text-blueGray-700  "
                      >
                        <thead className="thead-light  ">
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  className="px-6  bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold "
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                >
                                  {column.render("Header")}
                                  {/* <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span> */}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps}>
                          {page.map((row) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  return (
                                    <td
                                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-2 text-center border-b-2"
                                      {...cell.getCellProps()}
                                    >
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-5/6 mx-auto mt-4">
                  <button
                    className="bg-purple-600 px-3 py-1 rounded-lg text-white hover:bg-purple-500 disabled:opacity-25"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Prev
                  </button>
                  <button
                    className="disabled:opacity-25"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    {"<<"}
                  </button>
                  <span>
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>
                  </span>
                  <button
                    className="disabled:opacity-25"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    {">>"}
                  </button>
                  <button
                    className="bg-purple-600 px-3 py-1 rounded-lg text-white hover:bg-purple-500 disabled:opacity-25"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    Next
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Visits;
