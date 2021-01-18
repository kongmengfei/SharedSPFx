import * as React from 'react';
import styles from './MgtDemo.module.scss';
import { IMgtDemoProps } from './IMgtDemoProps';
import { Get, MgtTemplateProps, Person } from '@microsoft/mgt-react';
import { PersonViewType, PersonCardInteraction, Providers } from '@microsoft/mgt';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { BetaGraph } from '@microsoft/mgt/dist/es6/BetaGraph';

const LoadingPerson = (props: MgtTemplateProps) => {
  return <div><Spinner size={SpinnerSize.large} label="Loading members..." /></div>;
};

const MemberPerson = (props: MgtTemplateProps) => {
  const person = props.dataContext;
  return <div>
    <Person userId={person.userPrincipalName} view={PersonViewType.twolines} fetchImage={true} showPresence={true}
      personCardInteraction={PersonCardInteraction.hover} line2Property="mail"></Person>
  </div>;
};

export default class MgtDemo extends React.Component<IMgtDemoProps, {}> {

  constructor(props: IMgtDemoProps) {
    super(props);
    let provider = Providers.globalProvider;
    provider.graph = BetaGraph.fromGraph(provider.graph);
  }

  public render(): React.ReactElement<IMgtDemoProps> {
    return (
      <div className={styles.mgtDemo}>
        <div className={styles.container}>

          <Person personQuery="me"
            view={PersonViewType.twolines}
            personCardInteraction={PersonCardInteraction.hover}
            showPresence={true}>
          </Person>

          <Get resource="/users" scopes={["User.Read.All"]}>
            <MemberPerson template="value" />
            <LoadingPerson template="loading" />
          </Get>

        </div>
      </div>
    );
  }

  // public componentDidMount() {
  //   Providers.globalProvider.graph.client.api('/users').version('beta').get().then(v => {
  //     console.log(v);
  //   });

  // }

}
