declare interface IProgressExtenCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ProgressExtenCommandSetStrings' {
  const strings: IProgressExtenCommandSetStrings;
  export = strings;
}
