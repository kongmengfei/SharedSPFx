import * as React from 'react';
import styles from './NoDivWp.module.scss';
import { INoDivWpProps } from './INoDivWpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ClientsideWebpart, IListInfo, sp } from "@pnp/sp/presets/all";
import { DisplayMode } from '@microsoft/sp-core-library';
import { INoDivWpState } from './INoDivWpState';
import { Spinner } from 'office-ui-fabric-react/lib/components/Spinner/Spinner';

export default class NoDivWp extends React.Component<INoDivWpProps, INoDivWpState> {

  public constructor(props) {
    super(props);

    this.state = {
      ready: false
    };

    this.UpdateSitePage();

  }

  public async UpdateSitePage(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);

    if (!urlParams.has('listid') || this.props.disMode == DisplayMode.Edit) {
      this.setState({
        ready: true
      });
      return;
    }

    const listid = urlParams.get('listid');
    let list: IListInfo;

    try {
      list = await sp.web.lists.getById(listid).get();
    } catch (e) {
      console.log(e);
      this.setState({
        ready: true
      });
      return;
    }

    // use from the sp.web fluent chain
    const page = await sp.web.loadClientsidePage(window.location.pathname);
    const control = page.findControlById('81b84607-7f7a-49d8-b504-957a986d6e07') as ClientsideWebpart;

    let p = control.getProperties();

    if (p.selectedListId == listid) {
      this.setState({
        ready: true
      });
      return;    // the same list, no need to update
    }

    control.setProperties(
      {
        selectedListId: listid,
        selectedListUrl: list.ParentWebUrl + "/Lists/" + list.Title,
        selectedViewId: null,
        webRelativeListUrl: "/Lists/" + list.Title
      }
    );

    control.data.webPartData.serverProcessedContent.searchablePlainTexts = { listTitle: list.Title };

    page.save().then(e => {
      location.reload();
    });

    console.log(control);

  }

  public render(): React.ReactElement<INoDivWpProps> {
    return
    {
      this.state.ready ? <span>All is ready</span> : <Spinner label="I am definitely loading..." />
    };
  }
}
