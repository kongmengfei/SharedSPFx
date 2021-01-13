declare interface IPlayerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'PlayerWebPartStrings' {
  const strings: IPlayerWebPartStrings;
  export = strings;
}
