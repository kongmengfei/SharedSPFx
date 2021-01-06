import * as $ from 'jquery';
export default class spservices {

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

  public async isAADmember(groupId: string, userPrincipalName: string): Promise<any> {
    const clientId = "e0cefc2c-1104-4622-81ab-f7b421063112";

    const clientSecret = "-o68yz844the8l.-EoJI1L3.ZggoGv9_Ay";

    const hostName = window.location.hostname.replace('.sharepoint.com', '');

    var p = new Promise<any>((resolve, reject) => {

      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://login.microsoftonline.com/" + hostName + ".onmicrosoft.com/oauth2/v2.0/token",
        "method": "POST",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
          "grant_type": "client_credentials",
          "client_id ": clientId,
          "client_secret": clientSecret,
          "scope ": "https://graph.microsoft.com/.default"
        },
        success: function (response) {

          var token = response.access_token;

          $.ajax({
            url: 'https://graph.microsoft.com/v1.0/users/' + userPrincipalName + '/getMemberGroups',
            type: 'POST',
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            dataType: 'json',
            data: JSON.stringify({ securityEnabledOnly: false }),
            success: function (results) {

              //fake group id  900d5101-469f-4c47-8115-c2ac974e1e8d  instead of groupId.split('|')[2]

              if (results.value.indexOf(groupId) !== -1) {
                resolve(true);
              } else {
                reject(false);
              }
            },
            error: function (error) {
              console.log("Error in getting data for getMemberGroups: " + error);
              reject(false);
            }
          });

        },
        error: function (error) {
          console.log("Error in getting data: " + error);
          console.log(error);
          reject(false);
        }
      });

    });

    return p;
  }

}
