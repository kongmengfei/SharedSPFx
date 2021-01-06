import * as React from 'react';
import styles from './GetitemBasedonView.module.scss';
import { IGetitemBasedonViewProps } from './IGetitemBasedonViewProps';
import { sp, IViewInfo, IViewFields, ICamlQuery } from "@pnp/sp/presets/all";
import { ListView, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { IGetitemBasedonViewState } from './IGetitemBasedonViewState';

export default class GetitemBasedonView extends React.Component<IGetitemBasedonViewProps, IGetitemBasedonViewState> {

  public constructor(props: IGetitemBasedonViewProps) {
    super(props);
    this.state = {
      items: [],
      viewFields: null
    };
  }

  public componentDidMount() {
    Promise.all([this._getViewFields(), this._getViewinfo()]).then(values => {
      console.log(values);
      const viewFields = values[0]['Items'];
      const viewinfo = values[1];
      var _viewFields = viewFields.map(v => (
        {
          name: v == 'LinkTitle' ? 'Title' : v,
          displayName: v,
          sorting: false,
          isResizable: true,
          minWidth: 100,
          maxWidth: 160
        }
      ));

      this.setState({
        viewFields: _viewFields
      });

      return this._getItemsOnView(viewinfo.ViewQuery, viewFields, viewinfo.RowLimit ? viewinfo.RowLimit : 5);

    }).then(result => {
      console.log(result);
      this.setState({
        items: result
      });
    });
  }

  private async _getViewFields(): Promise<IViewFields> {
    return await sp.web.lists.getByTitle('kkkk').views.getById('50e7a547-4f95-4d4b-91ca-33bea2f22b64').fields();
  }

  private async _getViewinfo(): Promise<IViewInfo> {
    return await sp.web.lists.getByTitle('kkkk').views.getById('50e7a547-4f95-4d4b-91ca-33bea2f22b64').get();
  }

  private async _getItemsOnView(query: string, fields: [], rowlimit: number) {
    let viewfieldstring = fields.map(v => (`<FieldRef Name='${v}' />`)).join('');
    const caml: ICamlQuery = {
      ViewXml: `<View><Query>${query}</Query><ViewFields>${viewfieldstring}</ViewFields><RowLimit>${rowlimit}</RowLimit></View>`
    };

    console.log(caml.ViewXml);

    // get list items
    return await sp.web.lists.getByTitle('kkkk').getItemsByCAMLQuery(caml);
  }

  public render(): React.ReactElement<IGetitemBasedonViewProps> {
    return (
      <div className={styles.getitemBasedonView}>
        <div className={styles.container}>

          <ListView
            items={this.state.items}
            viewFields={this.state.viewFields}
            compact={false}
            selectionMode={SelectionMode.none}
            showFilter={false}
          />

        </div>
      </div>
    );
  }


}
