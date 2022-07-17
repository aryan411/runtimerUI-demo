export interface Option {
  _id?: string;
  details: string;
  count?: number;
}

export enum OptionType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}
