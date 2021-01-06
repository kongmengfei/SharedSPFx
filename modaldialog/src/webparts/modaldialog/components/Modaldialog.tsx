import * as React from 'react';
import styles from './Modaldialog.module.scss';
import { IModaldialogProps } from './IModaldialogProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind, DialogType } from 'office-ui-fabric-react';
import { IModalDialogState } from './IModalDialogState';
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";

export default class Modaldialog extends React.Component<IModaldialogProps, IModalDialogState> {
  constructor(props: IModaldialogProps, state: IModalDialogState) {
    super(props);
    this.state = {
      shouldhide: true
    };
  }

  public render(): React.ReactElement<IModaldialogProps> {
    let imagePath = "https://isvdevchat.sharepoint.com/sites/testprivate/_layouts/1/userphoto.aspx?size=L&username=admin@ISVDevChat.onmicrosoft.com";
    let defaultimg = "https://icons.iconarchive.com/icons/aha-soft/iron-man/256/Ironman-Mask-3-Old-icon.png";

    return (
      <div className={styles.modaldialog}>
        <div className={styles.container}>

          <div className={styles.row}>
            <div className={styles.column}>
              <a href="https://github.com" className={styles.button} target="_blank">external site, no data-interception</a>
            </div>
            <div className={styles.column}>
              <a href="https://github.com" className={styles.button} target="_blank" data-interception="off">external site + data-interception</a>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.column}>
              <a href="/sites/sbdev/Lists/DraftApps/AllItems.aspx" className={styles.button} target="_blank" >SP site, no data-interception</a>
            </div>
            <div className={styles.column}>
              <a href="/sites/sbdev/Lists/DraftApps/AllItems.aspx" className={styles.button} target="_blank" data-interception="off">SP site + data-interception</a>
            </div>
            <div className={styles.column}>
              {/*
              <a className={styles.button} href="#" onClick={this._handleClick}>
                <span className={styles.label}>Open Dialog</span>
              </a>
*/}







              {/*      <img src={imagePath} onError={e=>{(e.target as any).src = defaultimg;}} alt='user photo'></img>

              <IFrameDialog
                url="https://andyweb2.azurewebsites.net/"
                hidden={this.state.shouldhide}
                modalProps={{
                  isBlocking: true

                }}
                onDismiss={() => this.setState({ shouldhide: true })}
                dialogContentProps={{
                  type: DialogType.normal,
                  showCloseButton: true
                }}
                width={'600px'}
                height={'380px'} />                     */}

            </div>
          </div>
        </div>
      </div>
    );
  }

  @autobind
  private _handleClick() {
    this.setState({ shouldhide: !this.state.shouldhide });
  }
}
