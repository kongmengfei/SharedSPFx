import * as React from 'react';
import styles from './HelloworldWebpart01.module.scss';
import { IHelloworldWebpart01Props } from './IHelloworldWebpart01Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloworldWebpart01 extends React.Component<IHelloworldWebpart01Props, {}> {
  public render(): React.ReactElement<IHelloworldWebpart01Props> {
    return (
      <div className={ styles.helloworldWebpart01 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
