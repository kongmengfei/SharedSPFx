import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import * as strings from 'PnpjsuploadfilesWebPartStrings';
import Pnpjsuploadfiles from './components/Pnpjsuploadfiles';
import { IPnpjsuploadfilesProps } from './components/IPnpjsuploadfilesProps';

export interface IPnpjsuploadfilesWebPartProps {
  description: string;
}

export default class PnpjsuploadfilesWebPart extends BaseClientSideWebPart <IPnpjsuploadfilesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnpjsuploadfilesProps> = React.createElement(
      Pnpjsuploadfiles,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit():Promise<void>{
    return super.onInit().then(_ => {

      // other init code may be present

      sp.setup({
        spfxContext: this.context
      });
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
