import * as React from "react";
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import spservices from "../service/spservices";
import { PageContext } from "@microsoft/sp-page-context";

import {
  Logger,
  LogLevel
} from "@pnp/logging";

export interface ITargetAudienceProps {
  pageContext: PageContext;
  groupIds: IPropertyFieldGroupOrPerson[];
}
export interface ITargetAudienceState {
  canView?: boolean;
  groups: string[];
}
export default class TargetAudience extends React.Component<ITargetAudienceProps, ITargetAudienceState>{
  constructor(props: ITargetAudienceProps) {
    super(props);
    this.state = {
      canView: false,
      groups: []
    } as ITargetAudienceState;

  }
  public componentDidMount(): void {
    //setting the state whether user has permission to view webpart
    //this.checkUserCanViewWebpart();
    this.checkUserInAzureAD();
  }
  
  public render(): JSX.Element {
    return (
      <div>{this.props.groupIds ? (this.state.canView ?
        this.props.children : ``) : this.props.children}

        <hr></hr>
        <h1>AAD group info:</h1>
        <div>
          {this.state.groups.length > 0 ? this.state.groups.join(',') : "have not joined any group"}
        </div>
      </div>
    );
  }

  // Check if a particular user is a member of a Security Group in Azure AD
  private checkUserInAzureAD(): void {
    const _sv = new spservices();
    _sv.getMemberGroups().then(v => {
      this.setState({
        groups: v
      });

      console.log(v);

    }, e => { console.log(e); });
  }

  public checkUserCanViewWebpart(): void {
    const self = this;
    let proms = [];
    const _sv = new spservices();

    if (!self.props.groupIds) {
      this.setState({ canView: true });
      return;
    }

    self.props.groupIds.map((item) => {
      proms.push(_sv.isMember(item.fullName, self.props.pageContext.legacyPageContext[`userId`], self.props.pageContext.site.absoluteUrl));
    });
    Promise.race(proms).then(val => {
      this.setState({ canView: true }); //atleast one promise resolved
    });
  }
}
