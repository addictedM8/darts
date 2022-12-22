/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useCallback, useState } from "react";
import {
  CustomTableProps,
  Order,
  Sort,
  TableHeaderProps,
  TableRowProps,
} from "./CustomTableTypes";
import "./CustomTableStyle.css";

function TableHeader(props: TableHeaderProps) {
  const { headers, onCheckAll, isAllChecked, onSort, sort } = props;

  const handleCheckAll = () => onCheckAll(!isAllChecked);
  const handleSort = (header: string) => {
    onSort({
      by: header,
      order: sort.by === header ? Number(!sort.order) : Order.Ascending,
    });
  };

  return (
    <thead>
      <tr>
        <td>
          <input
            type="checkbox"
            onChange={handleCheckAll}
            checked={isAllChecked}
          />
        </td>
        {headers.map((header) => (
          <th key={header} onClick={() => handleSort(header)}>
            {header.toUpperCase()}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow(props: TableRowProps) {
  const { isChecked, row, onRowCheck, columns } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr>
        <td>
          <input type="checkbox" onChange={onRowCheck} checked={isChecked} />
        </td>
        {columns.map((column) => (
          <td key={`${column}`}>{row[column]}</td>
        ))}
        <td className="expandButton" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "-" : "+"}
        </td>
      </tr>
      {isExpanded && (
        <tr className="expandableRow">
          <td colSpan={columns.length + 1}>content of expanded row </td>
        </tr>
      )}
    </>
  );
}

function CustomTable(props: CustomTableProps) {
  const { rows, headers } = props;

  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const [sort, setSort] = useState<Sort>({
    by: headers[0],
    order: Order.Descensing,
  });

  const getData = () => {
    const options = { method: "POST", body: '{"tdid":"t_4SdA_8344"}' };

    fetch(
      "https://tk2-228-23746.vs.sakura.ne.jp/n01/tournament/n01_tournament.php?cmd=get_data",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  getData();

  const handleRowCheck = useCallback(
    (id: number) =>
      setCheckedRows((state) =>
        state.includes(id) ? state.filter((row) => row !== id) : [...state, id]
      ),
    []
  );

  const handleCheckAll = useCallback(
    (isChecked: boolean) =>
      setCheckedRows(isChecked ? [...Array(rows.length).keys()] : []),
    [rows]
  );

  if (!rows.length) {
    return <div>No data to display</div>;
  }

  console.log(sort);

  return (
    <table className="table">
      <TableHeader
        sort={sort}
        onSort={setSort}
        headers={headers}
        onCheckAll={handleCheckAll}
        isAllChecked={checkedRows.length === rows.length}
      />
      <tbody className="tableBody">
        {rows.map((row, index) => (
          <TableRow
            key={`${row.id}`}
            columns={headers}
            row={row}
            isChecked={checkedRows.includes(index)}
            onRowCheck={() => handleRowCheck(index)}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CustomTable;
