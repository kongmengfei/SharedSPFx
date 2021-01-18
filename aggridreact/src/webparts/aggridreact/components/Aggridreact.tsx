import * as React from 'react';
import styles from './Aggridreact.module.scss';
import { IAggridreactProps } from './IAggridreactProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { AggridreactState } from './AggridreactState';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default class Aggridreact extends React.Component<IAggridreactProps, AggridreactState> {
  gridApi: any;
  gridColumnApi: any;

  constructor(props) {
    super(props);

    this.state = {

      defaultColDef: {
        editable: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
      rowData: [
        {
          make: 'Toyota',
          model: 'Celica',
          price: 35000,
        },
        {
          make: 'Ford',
          model: 'Mondeo',
          price: 32000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
      ],
    };
  }

  public render(): React.ReactElement<IAggridreactProps> {
    return (
      <div style={{ width: '100%', height: '100%' }}>

        <div style={{ margin: '10px 0' }}>
          <button onClick={() => this.onBtnUpdate()}>
            Show api.getDataAsCsv() text
            </button>
          <button onClick={() => this.onBtnExport()}>
            Download file (api.exportDataAsCsv())
            </button>
        </div>

        <div style={{ width: '100%', height: '200px' }}>
          <AgGridReact
            defaultColDef={this.state.defaultColDef}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
          />
        </div>

        <textarea cols={100} id="csvResult" value='Press the api.getDataAsCsv() button to view exported CSV here' rows={4}/>

      </div>
    );
  }
  private onBtnUpdate(): void {
    var data = this.gridApi.getDataAsCsv(
      {
        suppressQuotes: false,
        columnSeparator: ','
      }
    );

    console.log(data);

    document.querySelector<HTMLTextAreaElement>('#csvResult').value = data;

  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private onBtnExport = () => {
    this.gridApi.exportDataAsCsv({
      suppressQuotes: false,
      columnSeparator: ','
    });
  }
}
