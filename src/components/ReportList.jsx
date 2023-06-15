/* eslint-disable react/jsx-key */
import { useMemo } from "react";
import {
  usePagination,
  useSortBy,
  useTable,
  // useGlobalFilter,
  useFilters,
} from "react-table";

import useAuthContext from "../context/AuthContext";
import { useState, useEffect } from "react";

const ReportList = () => {
  const { http, config, userId } = useAuthContext();

  const [apiData, setApiData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [date, setDate] = useState({ current: "", end: "" });

  const handlePeriodButtonClick = (period) => {
    setSelectedPeriod(period);
    setSelectedButton(period);
  };

  const handleChange = (e) => {
    setDate({
      ...date,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit", date);
    const response = await http.get(`/api/getreports/${userId}`, {
      ...config,
      params: {
        startDate: date.current,
        endDate: date.end,
      },
    });
    setSelectedButton(null);
    setApiData(response.data);
    setDate({ current: "", end: "" });
  };

  useEffect(() => {
    async function reportsData(timePeriod) {
      const currentDate = new Date();
      const startDate = new Date();
      startDate.setMonth(currentDate.getMonth() - timePeriod);

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = currentDate.toISOString().split("T")[0];

      // console.log(formattedStartDate);
      // console.log(formattedEndDate);

      const response = await http.get(`/api/getreports/${userId}`, {
        ...config,
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      // console.log("Reports Data", response.data);
      setApiData(response.data);
    }

    reportsData(selectedPeriod);
  }, [selectedPeriod]);

  const columns = useMemo(
    () => [
      // {
      //   Header: "No.",
      //   accessor: "id",
      // },
      {
        Header: "Customer Name",
        accessor: "customer_name",
      },
      {
        Header: "Employee Name",
        accessor: "employee_name",
      },
      {
        Header: "Services",
        accessor: "services",
      },
      {
        Header: "Amount",
        accessor: "total_amount",
      },
      {
        Header: "Date",
        accessor: "invoice_date",
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
    useFilters,
    // useGlobalFilter,
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
    // setGlobalFilter,
    setFilter,
    gotoPage,
    pageCount,
    prepareRow,
  } = tableInstance;

  const { filters, pageIndex } = state;

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("customer_name", value);
  };

  return (
    <>
      <div className="relative mb-2">
        <input
          type="text"
          placeholder="Search By Customer Name"
          className="py-1 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          // value={globalFilter || ""}
          // onChange={(e) => setGlobalFilter(e.target.value)}
          value={filters[0]?.value || ""}
          onChange={handleFilterChange}
        />
      </div>

      <div className="flex justify-between">
        <div className="space-x-2 text-center">
          <button
            //have to change color and set active class
            className={`w-20 ${
              selectedButton === 0 ? "bg-purple-500/10" : "bg-white"
            } px-2 py-2 text-sm  rounded-md font-sans font-semibold shadow-sm hover:shadow-lg hover:bg-gray-300 hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            data-ripple-dark="true"
            onClick={() => handlePeriodButtonClick(0)}
          >
            Today
          </button>
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
              selectedButton === 6 ? "bg-purple-500/10" : "bg-white"
            } px-2 py-2 text-sm  rounded-md font-sans font-semibold shadow-sm hover:shadow-lg hover:bg-gray-300 hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            data-ripple-dark="true"
            onClick={() => handlePeriodButtonClick(6)}
          >
            6 Months
          </button>
          <button
            className={`w-20 ${
              selectedButton === 12 ? "bg-purple-500/10" : "bg-white"
            } px-2 py-2 text-sm  rounded-md font-sans font-semibold shadow-sm hover:shadow-lg hover:bg-gray-300 hover:bg-purple-500/10 active:bg-purple-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            data-ripple-dark="true"
            onClick={() => handlePeriodButtonClick(12)}
          >
            1 Year
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-4 mr-4">
          <div>
            From{" "}
            <input
              className="rounded-lg text-center p-1"
              type="date"
              name="current"
              id=""
              onChange={handleChange}
              // value={date.current}
            />
          </div>

          <div>
            to{" "}
            <input
              className="rounded-lg text-center p-1"
              type="date"
              name="end"
              id=""
              onChange={handleChange}
              // value={date.end}
            />
          </div>
          <div>
            <button
              className="middle none center rounded-lg bg-purple-500 py-2 px-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-purple-500/20 transition-all hover:shadow-lg hover:purple-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              type="submit"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 mx-auto mt-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
          <div className="block w-full overflow-x-auto">
            <table
              {...getTableProps}
              className="w-full text-center table-auto bg-white border border-gray-300  cursor-pointer border-collapse"
              // className="min-w-full bg-white border border-gray-300"
            >
              <thead className="">
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    // className=" bg-blue-300 rounded-lg h-10 text-gray-600"
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        className="py-3 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "🔽"
                              : "🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      // className="border-b border-red-100 h-10 hover:bg-red-300"
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className="py-2 px-4 border-b border-gray-300"
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
    </>
  );
};

export default ReportList;
