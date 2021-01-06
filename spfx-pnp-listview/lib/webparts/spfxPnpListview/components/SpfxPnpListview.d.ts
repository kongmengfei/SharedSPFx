import * as React from 'react';
import { ISpfxPnpListviewProps } from './ISpfxPnpListviewProps';
import { ISpfxPnpListviewState } from './ISpfxPnpListviewState';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
export default class SpfxPnpListview extends React.Component<ISpfxPnpListviewProps, ISpfxPnpListviewState> {
    constructor(props: ISpfxPnpListviewProps, state: ISpfxPnpListviewState);
    private _getfiles;
    render(): React.ReactElement<ISpfxPnpListviewProps>;
    private _onRenderRow;
}
//# sourceMappingURL=SpfxPnpListview.d.ts.map