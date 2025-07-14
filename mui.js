import * as React from "react";
import {
  DataGrid,
  GridFilterOperator,
  GridFilterInputValueProps,
  GridColDef,
} from "@mui/x-data-grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";

// Custom filter input component
function DateRangeInput(props: GridFilterInputValueProps) {
  const { item, applyValue } = props;
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);

  const handleChange = (newStart: Date | null, newEnd: Date | null) => {
    applyValue({ ...item, value: { start: newStart, end: newEnd } });
  };

  React.useEffect(() => {
    handleChange(start, end);
  }, [start, end]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}>
      <DatePicker
        label="Start"
        value={start}
        onChange={(newValue) => setStart(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="End"
        value={end}
        onChange={(newValue) => setEnd(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
}

// Custom filter operator
const dateRangeOperator: GridFilterOperator = {
  label: "Date range",
  value: "dateRange",
  getApplyFilterFn: (filterItem) => {
    if (
      !filterItem.value ||
      (!filterItem.value.start && !filterItem.value.end)
    ) {
      return null;
    }

    return (params) => {
      const cellDate = new Date(params.value);
      const { start, end } = filterItem.value;
      return (
        (!start || cellDate >= new Date(start)) &&
        (!end || cellDate <= new Date(end))
      );
    };
  },
  InputComponent: DateRangeInput,
};

// Columns
const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 180 },
  { field: "age", headerName: "Age", type: "number", width: 100 },
  {
    field: "dateCreated",
    headerName: "Date Created",
    width: 200,
    type: "date",
    filterOperators: [dateRangeOperator],
  },
];

// Rows
const rows = Array.from({ length: 10 }, (_, id) => ({
  id,
  name: randomTraderName(),
  age: 20 + Math.floor(Math.random() * 20),
  dateCreated: randomCreatedDate(),
  lastLogin: randomUpdatedDate(),
}));

export default function GridWithDateRangeFilter() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          filterMode="client"
          disableColumnFilter={false}
        />
      </div>
    </LocalizationProvider>
  );
}
