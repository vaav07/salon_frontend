/* eslint-disable react/jsx-key */
import { useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";

import useAuthContext from "../context/AuthContext";
import { useState, useEffect } from "react";
import UserLayout from "../layouts/UserLayout";

const LastVisted = () => {
  const { http, config, userId } = useAuthContext();

  const [apiData, setApiData] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  const handlePeriodButtonClick = (period) => {
    setSelectedPeriod(period);
    setSelectedButton(period);
  };

  useEffect(() => {
    async function reportsData(period) {
      const response = await http.get(
        `/api/inactiveCustomers/${userId}/${period}`,
        config
      );
      // console.log("Reports Data", response.data);
      setApiData(response.data);
    }
    reportsData(selectedPeriod);
  }, [selectedPeriod]);

  const columns = useMemo(
    () => [
      {
        Header: "Customer Name",
        accessor: "fullname",
      },

      {
        Header: "Phone Number",
        accessor: "phone_no",
      },
      {
        Header: "Last Visited Date",
        accessor: "last_visited",
      },
    ],
    []
  );

  const data = useMemo(() => apiData, [apiData]);

  const tableInstance = useTable(
    {
      columns,
      data,
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

  return (
    <UserLayout>
      <div className="bg-zinc-200">
        {/* <Sidebar /> */}
        <div className=" max-w-5xl m-auto">
          <h1 className="pt-6 text-2xl font-bold">Last Visits</h1>
          <div className="space-x-2 text-center">
            <button
              className={`w-20  ${
                selectedButton === 1 ? "bg-purple-500/10" : "bg-white"
              } px-2 py-2 text-sm  rounded-md font-sans font-semibold shadow-sm hover:shadow-lg hover:bg-gray-300 hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              data-ripple-dark="true"
              onClick={() => handlePeriodButtonClick(1)}
            >
              1 Month
            </button>
            <button
              className={`w-20 ${
                selectedButton === 2 ? "bg-purple-500/10" : "bg-white"
              } px-2 py-2 text-sm  rounded-md font-sans font-semibold shadow-sm hover:shadow-lg hover:bg-gray-300 hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              data-ripple-dark="true"
              onClick={() => handlePeriodButtonClick(2)}
            >
              2 Months
            </button>
            <button
              className={`w-20 ${
                selectedButton === 3 ? "bg-purple-500/10" : "bg-white"
              } px-2 py-2 text-sm  rounded-md font-sans font-semibold shadow-sm hover:shadow-lg hover:bg-gray-300 hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              data-ripple-dark="true"
              onClick={() => handlePeriodButtonClick(3)}
            >
              3 Months
            </button>
            <button
              className={`w-20 ${
                selectedButton === 4 ? "bg-purple-500/10" : "bg-white"
              } px-2 py-2 text-sm  rounded-md font-sans font-semibold shadow-sm hover:shadow-lg hover:bg-gray-300 hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              data-ripple-dark="true"
              onClick={() => handlePeriodButtonClick(4)}
            >
              4 Months
            </button>
            <button
              className={`w-20 ${
                selectedButton === 5 ? "bg-purple-500/10" : "bg-white"
              } px-2 py-2 text-sm  rounded-md font-sans font-semibold shadow-sm hover:shadow-lg hover:bg-gray-300 hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              data-ripple-dark="true"
              onClick={() => handlePeriodButtonClick(5)}
            >
              5 Months
            </button>
            <button
              className={`w-20 ${
                selectedButton === 6 ? "bg-purple-500/10" : "bg-white"
              } px-2 py-2 text-sm  rounded-md font-sans font-semibold shadow-sm hover:shadow-lg hover:bg-gray-300 hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              data-ripple-dark="true"
              onClick={() => handlePeriodButtonClick(6)}
            >
              6 Months
            </button>
          </div>

          <section className="py-1 bg-blueGray-50">
            <div className="w-full px-4 mx-auto mt-6">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-blueGray-700">
                        Last Visited
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
    </UserLayout>
  );
};

export default LastVisted;
