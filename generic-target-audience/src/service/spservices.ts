import * as $ from 'jquery';
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/groups";
export default class spservices {

  constructor() {
  }
  /*check if user is a member of the group, using SP rest
  */
  public async isMember(groupName: string, userId: string, webAbsoluteUrl): Promise<any> {
    var p = new Promise<any>((resolve, reject) => {
      $.ajax({
        url: webAbsoluteUrl + "/_api/web/sitegroups/getByName('" + groupName + "')/Users?$filter=Id eq " + userId,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: (data) => {
          if (data.d.results[0] != undefined) {
            resolve(true);
          }
          else {
            reject(false);
          }
        },
        error: (error) => {
          reject(false);
        },
      });
    });
    return p;
  }

  /*check if user is a member of Azure AD group, using Graph API： https://docs.microsoft.com/en-us/graph/api/user-getmembergroups?view=graph-rest-1.0&tabs=http
  */
  public async getMemberGroups(): Promise<string[]> {
    const memberGroups = await graph.me.getMemberGroups();
    return memberGroups;
  }

}
