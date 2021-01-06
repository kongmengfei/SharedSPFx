import * as React from 'react';
import styles from './AnnouncementGu.module.scss';
import { IAnnouncementGuProps } from './IAnnouncementGuProps';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { sp } from '@pnp/pnpjs';
import { IAnnouncementGuState } from './IAnnouncementGuState';

export default class AnnouncementGu extends React.Component<IAnnouncementGuProps, IAnnouncementGuState> {

  constructor(props: IAnnouncementGuProps) {
    super(props);
    this.state = {
      items: []
    };

    this._getData = this._getData.bind(this);
  }

  private _getData() {
    sp.web.lists.getByTitle("myannno").items.select("Title", "image", "Body").getAll().then(v => {
      console.log(v);
      this.setState({
        items: v
      });
    });

  }

  public render(): React.ReactElement<IAnnouncementGuProps> {

    return (
      <div className={styles.announcementGu}>
        <Button variant="contained" color="secondary"
          className={styles.Gridbutton}
          onClick={this._getData}>
          Old News
          </Button>

        <Grid container spacing={3} md={12} className={styles.Gridcontainer}
          justify='flex-start'
          alignItems="center"
          alignContent="center"
        >

          {this.state.items.map(e => {
            return <Grid item md={4}>
              <img src={e['image'].Url} alt={e['image'].Description}></img>
              <div>{e['Title']}</div>
              <div></div>
            </Grid>
          })}

        </Grid>

      </div>
    );
  }
}
