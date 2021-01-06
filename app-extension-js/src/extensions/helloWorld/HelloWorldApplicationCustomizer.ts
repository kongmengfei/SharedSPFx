import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import styles from './AppCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'HelloWorldApplicationCustomizerStrings';
import * as $ from 'jquery';
import { func } from 'prop-types';

const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const head: any = document.getElementsByTagName("head")[0] || document.documentElement;

    // let articleRedirectScriptTag: HTMLScriptElement = document.createElement("script");
    // let jsurl = `${this.context.pageContext.web.serverRelativeUrl}/Style library/Hemanthkumar.js`;
    // articleRedirectScriptTag.src = jsurl;
    // articleRedirectScriptTag.type = "text/javascript";
    // head.insertAdjacentElement("beforeEnd", articleRedirectScriptTag);

    // console.log('jsurl:',jsurl);

    require('../../../asset/Hemanthkumar.js');

    //inject CSS
    let cssUrl = '/sites/sbdev/Style%20Library/test.css';
    let customStyle: HTMLLinkElement = document.createElement("link");
    customStyle.href = cssUrl;
    customStyle.rel = "stylesheet";
    customStyle.type = "text/css";
    head.insertAdjacentElement("beforeEnd", customStyle);

    return Promise.resolve();
  }

}
