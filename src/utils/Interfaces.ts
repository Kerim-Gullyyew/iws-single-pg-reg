export interface ValidationErrors {
  selectedPackage?: string;
  selectedSubjects?: string;
  date?: string;
  checked?: string;
  checked2?: string;
  checked3?: string;
  firstNameStudent?: string;
  lastNameStudent?: string;
  dateBirthStudent?: string;
  emailStudent?: string;
  phoneNumberStudent?: string;
  addressLineStudent?: string;
  postalCodeStudent?: string;
  countryStudent?: string;
  cityStudent?: string;
  parentChooseParent?: string;
  genderChooseParent?: string;
  firstNameParent?: string;
  lastNameParent?: string;
  emailParent?: string;
  phoneNumberParent?: string;
  addressLineParent?: string;
  postalCodeParent?: string;
  countryParent?: string;
  cityParent?: string;
}
export interface Subject {
  id: number;
  name: string;
  price: number;
  exist: boolean;
}
export type DateObject = {
  day: number;
  month: number;
  year: number;
};
export interface Package {
  name: string;
  age: string;
  discount: number;
  min_select: number;
  selected: number;
  condition: {
    selected: number;
    discount: number;
  };
  package: {
    id: number;
    name: string;
    price: number;
    exist: boolean;
  }[];
}
export interface CountryData {
  label: string;
  value: string;
}
export enum ParentChooseData {
  Parent = "Parent",
  Guardian = "Guardian",
}
export enum GenderParentChooseData {
  Male = "Male",
  Female = "Female",
  PreferToNotSay = "PreferToNotSay",
}
export interface PriceConditionItem {
  [key: number]: number | undefined;
}
export interface ALevelProgram {
  name: string;
  age: string;
  price_condition: PriceConditionItem[];
  discount: number;
  min_select: number;
  selected: number;
  package: {
    id: number;
    name: string;
    price: number;
    exist: boolean;
  }[];
}

export interface date {
  id: number;
  name: string;
  session: string;
  start_date: {
    id: number;
    name: string;
  }[];
}
