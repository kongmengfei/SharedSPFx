import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PanelmeettabWebPartStrings';
import Panelmeettab from './components/Panelmeettab';
import { IPanelmeettabProps } from './components/IPanelmeettabProps';

export interface IPanelmeettabWebPartProps {
  description: string;
}

export default class PanelmeettabWebPart extends BaseClientSideWebPart<IPanelmeettabWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPanelmeettabProps> = React.createElement(
      Panelmeettab,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
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
