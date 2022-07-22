export interface Option {
  _id?: string;
  details: string;
  count?: number;
}

export enum OptionType {
  True_Or_False ="True or False",
  Multiple_Choice = "Multiple Choice"
}
