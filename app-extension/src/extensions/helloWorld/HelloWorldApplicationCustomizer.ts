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

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    // const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
    // let cssUrl = '/sites/sbdev/Style%20Library/custom.css';
    // let customStyle: HTMLLinkElement = document.createElement("link");
    // customStyle.href = cssUrl;
    // customStyle.rel = "stylesheet";
    // customStyle.type = "text/css";
    // head.insertAdjacentElement("beforeEnd", customStyle);


    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);


    const settingIcon = document.getElementsByClassName("ms-Icon ms-Icon--Info")[0];
    if (settingIcon != null) {
      settingIcon.addEventListener("click", () => {
        alert('Hi');
      });
    }

    return Promise.resolve();
  }


  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }

  private _renderPlaceHolders(): void {
    console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
    console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames
        .map(name => PlaceholderName[name])
        .join(", ")
    );

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = "(Top property was not defined.)";
        }

        if (this._topPlaceholder.domElement) {
          this._topPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="${styles.top}">
              <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
            topString
          )}
            </div>
          </div>`;
        }
      }
    }

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = "(Bottom property was not defined.)";
        }

        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="${styles.bottom}">
              <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
            bottomString
          )}
            </div>
          </div>`;
        }
      }
    }
  }


}
