import React, { useEffect, useState } from "react";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import { FaTrash } from "react-icons/fa";
import up from "../../images/up-arrow-svgrepo-com.svg";
import down from "../../images/down-arrow-svgrepo-com.svg";

const CustomDataTable = ({ data, handlePrevPage, handleNextPage }) => {
  const ColumnFilter = ({ column }) => {
    return (
      <input
        type="text"
        placeholder={`Filter ${column.Header}`}
        onChange={(e) => {
          column.setFilter(e.target.value || undefined);
        }}
      />
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        Filter: ColumnFilter,
      },
      {
        Header: "Name",
        accessor: "name",
        Filter: ColumnFilter,
      },
      {
        Header: "Email",
        accessor: "email",
        Filter: ColumnFilter,
      },
      {
        Header: "Address",
        accessor: "address",
        Filter: ColumnFilter,
      },
      {
        Header: "Phone",
        accessor: "phone",
        Filter: ColumnFilter,
      },
      {
        Header: "Delete",
        accessor: "id",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.id)}>
            <FaTrash />
          </button>
        ),
      },
    ],
    []
  );

  // Set up your table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize, sortBy, filters },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5, // Set the initial page size
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );
  // Paginate the data
  const pageCount = Math.ceil(data.length / pageSize);

  // Delete a row
  const handleDelete = (id) => {
    // Implement your delete logic here, e.g., make an API request
    // After deleting, you can refresh the data and update the state
    // Example: const newData = data.filter((row) => row.id !== id);
    // setUsers(newData);
  };

  return (
    <div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted && (
                      <img
                       className="w-4"
                        src={column.isSortedDesc ? up : down}
                        alt={`Sorting Indicator ${column.Header}`}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePrevPage()} disabled={pageIndex === 0}>
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
        <button
          onClick={() => handleNextPage()}
          disabled={pageIndex >= pageCount - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomDataTable;
