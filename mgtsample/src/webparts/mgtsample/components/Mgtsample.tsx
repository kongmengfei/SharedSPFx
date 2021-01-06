import * as React from 'react';
import styles from './Mgtsample.module.scss';
import { IMgtsampleProps } from './IMgtsampleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Person } from '@microsoft/mgt-react';

export default class Mgtsample extends React.Component<IMgtsampleProps, {}> {
  public render(): React.ReactElement<IMgtsampleProps> {
    return (
      <div className={styles.mgtsample}>
        <div className={styles.container}>
          
          <Person personQuery="me" />

        </div>
      </div>
    );
  }
}
