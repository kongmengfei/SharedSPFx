import { IViewField } from "@pnp/spfx-controls-react/lib/ListView";
import { IColumn } from "office-ui-fabric-react";

export interface ISpfxPnpListviewState {
  items: any[];
  columns: IColumn[];
}
