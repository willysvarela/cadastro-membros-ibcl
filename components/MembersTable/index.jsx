import React, { useEffect, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useColumnOrder
} from 'react-table';
import matchSorter from 'match-sorter';
import { COLUMNS, COLUMNS_ORDER } from './columns';
import MemberCell from './MemberCell';

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

function MembersTable({ onSelectMember, data }) {
  const tableData = useMemo(() => data, [data]);

  const columns = useMemo(
    () =>
      Object.keys(data ? data[0] : []).map((column) => ({
        Header: COLUMNS.find((item) => item.accessor === column).Header,
        accessor: column
      })),
    [data]
  );

  useEffect(() => {}, []);

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const tableInstance = useTable(
    { columns, data: tableData, defaultColumn },
    useFilters,
    useGlobalFilter,
    useColumnOrder,
    useSortBy
  );

  const { getTableProps, headerGroups, rows, prepareRow, setColumnOrder } =
    tableInstance;

  useEffect(() => {
    setColumnOrder(COLUMNS_ORDER);
  }, []);

  const handleSelectRow = (row) => {
    onSelectMember(row.values);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className="[&>td]:hover:bg-base-200"
                  key={row.id}
                  {...row.getRowProps()}
                  onClick={() => {
                    handleSelectRow(row);
                  }}
                >
                  {row.cells.map((cell) => (
                    <MemberCell cell={cell} key={cell.column.id} />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembersTable;
