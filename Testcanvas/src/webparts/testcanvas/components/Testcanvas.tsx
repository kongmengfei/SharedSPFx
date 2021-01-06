import * as React from 'react';
import styles from './Testcanvas.module.scss';
import { ITestcanvasProps } from './ITestcanvasProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Testcanvas extends React.Component<ITestcanvasProps, {}> {
  public render(): React.ReactElement<ITestcanvasProps> {
    return (
      <div className={styles.testcanvas}>
        <canvas
          ref="canvas"
          height="500px"
          width="500px"
        ></canvas>
      </div>
    );
  }

  public componentDidMount() {
    this.gameLoader();
  }

  private gameLoader(): void {
    const ctx = (this.refs.canvas as HTMLCanvasElement).getContext('2d');
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 150, 75);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx");
  }

}
