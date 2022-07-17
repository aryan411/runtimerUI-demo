import { Option, OptionType } from "./option.model";

export default interface Question {
  _id?: string;
  title: string;
  optionType: OptionType;
  options: Option[];
  chosenOptions?: string[];
}
