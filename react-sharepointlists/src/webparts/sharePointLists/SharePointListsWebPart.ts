import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SharePointListsWebPart.module.scss';
import * as strings from 'SharePointListsWebPartStrings';

import { SPComponentLoader } from '@microsoft/sp-loader';

export interface ISharePointListsWebPartProps {
  description: string;
}

export default class SharePointListsWebPart extends BaseClientSideWebPart<ISharePointListsWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.sharePointLists}">
        <div id="siteContent"></div>
      </div>`;

    let htmlContext = this;

    if ((Environment.type != EnvironmentType.ClassicSharePoint) && (typeof SP == 'undefined')) {
      console.log(Environment.type);
      this.loadSPDependencies().then(e => {
        ExecuteOrDelayUntilScriptLoaded(function () { htmlContext.getListsTitles(htmlContext); }, "sp.js");
      });
    } else {
      console.log(Environment.type);
      ExecuteOrDelayUntilScriptLoaded(function () { htmlContext.getListsTitles(htmlContext); }, "sp.js");
    }

  }

  private getListsTitles(htmlContext): void {
    const context: SP.ClientContext = SP.ClientContext.get_current();
    const web: SP.Web = context.get_web();
    context.load(web);
    context.executeQueryAsync((sender: any, args: SP.ClientRequestSucceededEventArgs): void => {
      console.log(web.get_title());
      let siteContent: string = `<div><h2>Title: ${web.get_title()}</h2>
                                  <span>Description: ${web.get_description()}</span>
                                </div>`;
      htmlContext.domElement.querySelector("#siteContent").innerHTML = siteContent;

    }, (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
      console.log(args.get_message());
    });
  }

  public loadSPDependencies(): Promise<{}> {
    return SPComponentLoader.loadScript('/_layouts/15/init.js', {
      globalExportsName: '$_global_init'
    })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/MicrosoftAjax.js', {
          globalExportsName: 'Sys'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/SP.Runtime.js', {
          globalExportsName: 'SP'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/SP.js', {
          globalExportsName: 'SP'
        });
      });

  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
