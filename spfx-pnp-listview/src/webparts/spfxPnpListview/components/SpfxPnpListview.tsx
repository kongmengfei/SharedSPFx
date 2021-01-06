import * as React from 'react';
import * as moment from 'moment';
import styles from './SpfxPnpListview.module.scss';
import { ISpfxPnpListviewProps } from './ISpfxPnpListviewProps';
import { ISpfxPnpListviewState } from './ISpfxPnpListviewState';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { sp } from "@pnp/sp";
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { DetailsList, IColumn } from 'office-ui-fabric-react';

export default class SpfxPnpListview extends React.Component<ISpfxPnpListviewProps, ISpfxPnpListviewState> {

  constructor(props: ISpfxPnpListviewProps, state: ISpfxPnpListviewState) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });

    const columns: IColumn[] = [
      { key: 'column1', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Value', fieldName: 'num', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    this.state = { items: [], columns: columns };
    this._getfiles();
  }

  @autobind
  private async _getfiles() {
    const allItems: any[] = await sp.web.lists.getByTitle('kkkk').items.get();
    this.setState({ items: allItems });
  }

  public render(): React.ReactElement<ISpfxPnpListviewProps> {
    return (
      <div className={styles.spfxPnpListview}>

        <DetailsList setKey="hoverSet" items={this.state.items} columns={this.state.columns} onRenderRow={(item?: any, index?: number) => this._onRenderRow}/>

      </div>
    );
  }

  private _onRenderRow(items,index) {
    
  }

}
