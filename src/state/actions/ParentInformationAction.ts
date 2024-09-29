import {
  ALevelProgram,
  DateObject,
  Package,
  Subject,
} from "../../utils/Interfaces";
import { ParentInformationActionType } from "../action-types";

interface ParentInformationAction {
  type: ParentInformationActionType.ADD_PARENTINFORMATION;
  payload: {
    selectedPackage: Package | ALevelProgram | null;
    selectedSubjects: Subject[] | null;
    date: DateObject;
    firstNameStudent: string;
    lastNameStudent: string;
    phoneNumberStudent: string;
    countryStudent: string | number;
    parentChooseParent: string;
    genderChooseParent: string;
    firstNameParent: string;
    lastNameParent: string;
    emailParent: string;
    phoneNumberParent: string;
    addressLineParent: string;
    postalCodeParent: string;
    countryParent: string | number;
    cityParent: string;
  };
}

interface ClearParentInformationAction {
  type: ParentInformationActionType.CLEAR_PARENTINFORMATION;
}

export type ParentInformationActionAll =
  | ParentInformationAction
  | ClearParentInformationAction;
