import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Stats } from "./api/nakka.t";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 90 },
  {
    field: "rank",
    headerName: "Pozicia",
    flex: 1,
    align: "center",
  },
  { field: "name", headerName: "Meno", flex: 2 },
  {
    field: "avg",
    headerName: "Priemer",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "highOut",
    headerName: "Najvyssie zavretie",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ton80",
    headerName: "180",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ton40",
    headerName: "140",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ton00",
    headerName: "100",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "best",
    headerName: "Najlepsi leg",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
];

const StatsTable = (props: { rows: Stats[] }) => {
  return (
    <div style={{ height: "500px", width: "100%", background: "#121212" }}>
      <DataGrid rows={props.rows} columns={columns} />
    </div>
  );
};

export default StatsTable;
