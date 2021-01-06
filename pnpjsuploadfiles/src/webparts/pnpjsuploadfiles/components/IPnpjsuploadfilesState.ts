import { IAttachmentFileInfo } from "@pnp/sp/attachments";

export interface IPnpjsuploadfilesState {
  subject:string;

  uploadfiles:IAttachmentFileInfo[];
}
