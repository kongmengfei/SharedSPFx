import * as React from "react";
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import spservices from "../service/spservices";
import { PageContext } from "@microsoft/sp-page-context";
export interface ITargetAudienceProps {
  pageContext: PageContext;
  groupIds: IPropertyFieldGroupOrPerson[];
}
export interface ITargetAudienceState {
  canView?: boolean;
}
export default class TargetAudience extends React.Component<ITargetAudienceProps, ITargetAudienceState>{
  constructor(props: ITargetAudienceProps) {
    super(props);
    this.state = {
      canView: false
    } as ITargetAudienceState;

  }
  public componentDidMount(): void {
    //setting the state whether user has permission to view webpart
    //this.checkUserCanViewWebpart();
    this.checkAADUserCanViewWebpart();
  }
  public render(): JSX.Element {
    // return (<div>{this.props.groupIds ? (this.state.canView ?
    //   this.props.children : ``) : this.props.children}</div>);
    return (<div>{this.state.canView ? this.props.children : `you cannot view due to lack permission`}</div>);
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

  // check add group member
  public checkAADUserCanViewWebpart(): void {
    const self = this;
    let proms = [];
    const _sv = new spservices();
    //let isAdmin = self.props.pageContext.legacyPageContext[`isSiteAdmin`];

    // if (isAdmin) {
    //   this.setState({ canView: true });
    //   return;
    // }

    // if (!self.props.groupIds) {
    //   this.setState({ canView: true });
    //   return;
    // }

    // fake data : self.props.groupIds

    let groupids = ["ea866578-ee7f-48ba-bdbd-9acca12b6da8", "900d5101-469f-4c47-8115-c2ac974e1e8d"];

    groupids.map(item => {
      proms.push(_sv.isAADmember(item, self.props.pageContext.legacyPageContext[`userPrincipalName`]));
    });

    Promise.race(proms).then(val => {
      this.setState({ canView: true }); //atleast one promise resolved
    }).catch(error => {
      console.log(error);
    });

  }

}
