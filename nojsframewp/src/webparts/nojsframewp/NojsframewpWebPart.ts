import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NojsframewpWebPart.module.scss';
import * as strings from 'NojsframewpWebPartStrings';

export interface INojsframewpWebPartProps {
  description: string;
}

export default class NojsframewpWebPart extends BaseClientSideWebPart<INojsframewpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="ms-Grid">
      <div class="ms-Grid-row">
          <div class=${styles.b}><div class=${styles.block}>1</div></div>
          <div class=${styles.b}><div class=${styles.block}>1</div></div>
          <div class=${styles.b}><div class=${styles.block}>1</div></div>
          <div class=${styles.b}><div class=${styles.block}>1</div></div>
        </div>
        <div class="ms-Grid-row">
        <div class=${styles.b}><div class=${styles.block}>2</div></div>
        <div class=${styles.b}><div class=${styles.block}>2</div></div>
        <div class=${styles.b}><div class=${styles.block}>2</div></div>
        <div class=${styles.b}><div class=${styles.block}>2</div></div>
        </div>
      </div>`;
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
