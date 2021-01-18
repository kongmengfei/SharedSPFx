import { ColDef, ColGroupDef } from "ag-grid-community";

export interface AggridreactState {
  defaultColDef:ColDef;
  columnDefs:(ColDef | ColGroupDef)[];
  rowData?: any[];

}
