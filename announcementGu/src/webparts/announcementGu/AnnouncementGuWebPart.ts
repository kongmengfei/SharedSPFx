import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AnnouncementGuWebPartStrings';
import AnnouncementGu from './components/AnnouncementGu';
import { IAnnouncementGuProps } from './components/IAnnouncementGuProps';
import { sp } from '@pnp/pnpjs';

export interface IAnnouncementGuWebPartProps {
  description: string;
}

export default class AnnouncementGuWebPart extends BaseClientSideWebPart<IAnnouncementGuWebPartProps> {

  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {

      // other init code may be present

      sp.setup({
        spfxContext: this.context
      });
    });
  }


  public render(): void {
    const element: React.ReactElement<IAnnouncementGuProps> = React.createElement(
      AnnouncementGu,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
