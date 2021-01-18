import * as React from 'react';
import styles from './MgtDemo.module.scss';
import { IMgtDemoProps } from './IMgtDemoProps';
import { Person, People, Agenda, TeamsChannelPicker, Tasks, PeoplePicker } from '@microsoft/mgt-react';
import { PersonViewType, PersonCardInteraction, Providers } from '@microsoft/mgt';


export default class MgtDemo extends React.Component<IMgtDemoProps, {}> {
  public render(): React.ReactElement<IMgtDemoProps> {
    return (
      <div className={styles.mgtDemo}>
        <div className={styles.container}>
          <Person personQuery="me"
            view={PersonViewType.twolines}
            personCardInteraction={PersonCardInteraction.hover}
            showPresence={true}></Person>

          <People></People>

          <Agenda></Agenda>

          <PeoplePicker></PeoplePicker>

          <TeamsChannelPicker></TeamsChannelPicker>

          <Tasks></Tasks>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    Providers.globalProvider.graph.client.api('/users').version('beta').get().then(v => {
      console.log(v);
    });

  }


}
