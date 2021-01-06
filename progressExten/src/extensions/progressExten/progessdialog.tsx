import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { DialogContent } from 'office-ui-fabric-react';
import { sp } from '@pnp/sp';

interface IProgressDialogContentProps {
  DefaultProgress?: number;
  close: () => void;
}

interface IProgressDialogContentState {
  Progress: number;
}

class ProgressDialogContent extends React.Component<IProgressDialogContentProps, IProgressDialogContentState> {

  constructor(props: IProgressDialogContentProps) {
    super(props);
    // Default progress

    this.state = {
      Progress: this.props.DefaultProgress ? this.props.DefaultProgress : 0
    };
  }

  public componentDidMount() {
    // Sleep in loop
    // sp.web.lists.getByTitle('kkkk').items.getAll().then(res => {
    //   console.log(res[0]['ID']);
    //   this.setState({
    //     Progress: 0.5
    //   });
    //   console.log('hh');
    // });

    for (let i = 2; i < 11; i++) {
      setTimeout(() => {
        this.setState({
          Progress: i / 10
        });

        if (this.state.Progress == 1) {
          this.props.close();
        }

      }, 3000);
    }

  }

  public render(): JSX.Element {
    return <DialogContent
      title='Progress bar content'
      showCloseButton={false}
    >
      <ProgressIndicator label="Example" description="Example description" percentComplete={this.state.Progress}></ProgressIndicator>
    </DialogContent>;
  }

}

export default class ProgressDialogDialog extends BaseDialog {
  public initprogress: number;

  constructor() {
    super({ isBlocking: true });
  }

  public render(): void {
    ReactDOM.render(<ProgressDialogContent
      DefaultProgress={this.initprogress}
      close={this.close}
    />, this.domElement);
  }

  public getConfig(): IDialogConfiguration {
    return {
      isBlocking: true
    };
  }


}
