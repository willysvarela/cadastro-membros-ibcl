/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useColumnOrder
} from 'react-table';
import useSWR from 'swr';
import matchSorter from 'match-sorter';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
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

function MembersTable() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR('/api/member', fetcher);

  const tableData = useMemo(() => data, [data]);

  const columns = useMemo(
    () =>
      Object.keys(data ? data[0] : []).map((column) => ({
        Header: COLUMNS.find((item) => item.accessor === column).Header,
        accessor: column
      })),
    [data]
  );

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) =>
        rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        })
    }),
    []
  );

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

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder
    /* getTableBodyProps,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        */
  } = tableInstance;

  useEffect(() => {
    setColumnOrder(COLUMNS_ORDER);
  }, []);

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <MemberCell cell={cell} />
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MembersTable;
