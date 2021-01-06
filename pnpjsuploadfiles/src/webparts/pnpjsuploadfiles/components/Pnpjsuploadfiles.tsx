import * as React from 'react';
import styles from './Pnpjsuploadfiles.module.scss';
import { IPnpjsuploadfilesProps } from './IPnpjsuploadfilesProps';
import { IPnpjsuploadfilesState } from './IPnpjsuploadfilesState';
import ReactFileReader from 'react-file-reader';
import { IAttachmentFileInfo } from "@pnp/sp/attachments";
import { sp, IItemAddResult, IViewFields } from "@pnp/sp/presets/all";

export default class Pnpjsuploadfiles extends React.Component<IPnpjsuploadfilesProps, IPnpjsuploadfilesState> {

  public constructor(props: IPnpjsuploadfilesProps) {
    super(props);
    this.state = {
      subject: 'test sub',
      uploadfiles: null
    };
  }

  public render(): React.ReactElement<IPnpjsuploadfilesProps> {
    return (
      <div className={styles.pnpjsuploadfiles}>
        <div className={styles.container}>

          <div className={styles.row}>
            <input type="text" value={this.state.subject} onChange={e => this.handleChange(e)} />
          </div>

          <div className={styles.row}>
            <ReactFileReader multipleFiles={true} fileTypes={[".csv", ".xlsx", ".Docx", ".pdf"]} base64={true}
              handleFiles={f => this.handleFiles(f)}>
              <button className='btn'>Upload</button>
            </ReactFileReader>
          </div>

          <div className={styles.row}>
            <button id="btn_add" className={styles.button} onClick={this.createItem.bind(this)}>Submit</button>
          </div>

        </div>
      </div>
    );
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ subject: event.target.value });
  }

  private handleFiles(f) {
    var filelist = f.fileList;

    var fileInfos: IAttachmentFileInfo[] = [];

    fileInfos.push({
      name: "My file name 1",
      content: "string, blob, or array"
    });

    // loop through files
    for (var i = 0; i < filelist.length; i++) {

      // get item
      let file: File = filelist.item(i);

      fileInfos.push({
        name: file.name,
        content: file
      });

    }

    this.setState({
      uploadfiles: fileInfos
    });

  }

  private createItem(): void {


    const web = await sp.web.select("Title")()
  console.log("Web Title: ", web.Title);

  const result2 = await sp.web.lists.getByTitle('kkkk').views.getByTitle('All Items')();

  console.log("view: ", result2);

  const fields:IViewFields = await sp.web.lists.getByTitle('kkkk').views.getByTitle('All Items').fields();
  console.log("field: ", fields);





    const list = sp.web.lists.getByTitle("kkkk");




    // get all the views and their properties
    const view = list.views.getByTitle("All Items").get().


    sp.web.lists.getByTitle("mylist").items.add({
      'Title': this.state.subject
    }).then((r: IItemAddResult) => {
      r.item.attachmentFiles.addMultiple(this.state.uploadfiles);
    }).then(e => { console.log("successfully created"); }).catch(e => { console.log("Error while creating the item" + e) });

  }

}
