import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';

// import web component polyfills for browsers that need them
import 'regenerator-runtime/runtime';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';

import * as strings from 'MgtDemoWebPartStrings';
import MgtDemo from './components/MgtDemo';
import { IMgtDemoProps } from './components/IMgtDemoProps';

// import the providers at the top of the page
import { Providers, SharePointProvider } from '@microsoft/mgt';
import { BetaGraph } from '@microsoft/mgt/dist/es6/BetaGraph';
export interface IMgtDemoWebPartProps {
  description: string;
}

export default class MgtDemoWebPart extends BaseClientSideWebPart<IMgtDemoWebPartProps> {

  // set the global provider
  protected async onInit() {
    let provider = new SharePointProvider(this.context);
    
    Providers.globalProvider = provider;

    console.log("fffffffffffffff");
    console.log(provider);

    //Providers.globalProvider = new SharePointProvider(this.context);
  }

  public render(): void {
    const element: React.ReactElement<IMgtDemoProps> = React.createElement(
      MgtDemo,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

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
