import * as React from 'react';
import styles from './Player.module.scss';
import { IPlayerProps } from './IPlayerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, DefaultButton } from 'office-ui-fabric-react';

export default class Player extends React.Component<IPlayerProps, {}> {
  private video_ref: React.RefObject<HTMLVideoElement>;
  private txtParam: string;

  constructor(props: IPlayerProps) {
    super(props);
    // 產生一個可以儲存 DOM element 的 ref
    this.video_ref = React.createRef();

  }


  public render(): React.ReactElement<IPlayerProps> {
    return (
      <div className={styles.player}>

        <video
          id="VidPlayer"
          ref={this.video_ref}
          className={styles.video}
        //controls
        >
          <source src="https://www.w3schools.com/tags/movie.ogg" type="video/ogg"></source>
          </video>< br />

        <TextField id="txtVideoURL" onChange={(ev, newValue) => { this.txtParam = newValue; }} />

        <DefaultButton text="Submit" onClick={() => { this.textFieldChanged(this.txtParam); }} />

      </div>
    );
  }

  private textFieldChanged(newValue: string) {
    let vidplay = this.video_ref.current;
    let source = document.createElement('source');
    source.setAttribute('src', newValue);
    vidplay.appendChild(source);
    vidplay.load();
    vidplay.play();
  }

}
