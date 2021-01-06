import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import styles from './NojsframworkWebPart.module.scss';
import * as strings from 'NojsframworkWebPartStrings';

export interface INojsframworkWebPartProps {
  description: string;
}

declare var SP: any;
declare var SPClientPeoplePicker_InitStandaloneControlWrapper: any;

export default class NojsframworkWebPart extends BaseClientSideWebPart<INojsframworkWebPartProps> {

  public onInit(): Promise<void> {
    SPComponentLoader.loadCss('/_layouts/15/1033/styles/corev15.css');

    return SPComponentLoader.loadScript('/_layouts/15/init.js', {
      globalExportsName: '$_global_init'
    })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/MicrosoftAjax.js', {
          globalExportsName: 'Sys'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/ScriptResx.ashx?name=sp.res&culture=en-us', {
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
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/sp.init.js', {
          globalExportsName: 'SP'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/1033/strings.js', {
          globalExportsName: 'Strings'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/sp.ui.dialog.js', {
          globalExportsName: 'SP'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/clienttemplates.js', {
          globalExportsName: 'SP'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/clientforms.js', {
          globalExportsName: 'SP'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/clientpeoplepicker.js', {
          globalExportsName: 'SP'
        });
      })
      .then((): Promise<{}> => {
        return SPComponentLoader.loadScript('/_layouts/15/autofill.js', {
          globalExportsName: 'SP'
        });
      })
      .then((): Promise<void> => {
        return SPComponentLoader.loadScript('/_layouts/15/sp.core.js', {
          globalExportsName: 'SP'
        });
      });





  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.nojsframwork}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <span class="${ styles.title}">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle}">Customize SharePoint experiences using web parts.</p>
              <p class="${ styles.description}">${escape(this.properties.description)}</p>

              <div id="dialog" title="Basic dialog">
                <p>This is the default dialog</p>
              </div>
              <div>
                <label>User Name:</label>
                <div id="_UserName"></div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
      var schema = {};
      schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
      schema['SearchPrincipalSource'] = 15;
      schema['ResolvePrincipalSource'] = 15;
      schema['AllowMultipleValues'] = false;
      schema['MaximumEntitySuggestions'] = 50;
      schema['Width'] = '280px';
      SPClientPeoplePicker_InitStandaloneControlWrapper("_UserName", null, schema);
    }, 'clientpeoplepicker.js');


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
