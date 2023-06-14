/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import { usePagination, useSortBy, useTable } from "react-table";

const Table = ({ columns, data }) => {
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
    <>
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

export default Table;
