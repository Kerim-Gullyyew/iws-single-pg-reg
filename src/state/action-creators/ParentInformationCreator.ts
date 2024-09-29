import {
  ALevelProgram,
  DateObject,
  Package,
  Subject,
} from "../../utils/Interfaces";
import { ParentInformationActionType } from "../action-types";
import { ParentInformationActionAll } from "../actions/ParentInformationAction";
import { Dispatch } from "redux";

export const addParentInformation = (json: {
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
}) => {
  return (dispatch: Dispatch<ParentInformationActionAll>) => {
    dispatch({
      type: ParentInformationActionType.ADD_PARENTINFORMATION,
      payload: json,
    });
  };
};

export const clearParentInformation = () => {
  return (dispatch: Dispatch<ParentInformationActionAll>) => {
    dispatch({
      type: ParentInformationActionType.CLEAR_PARENTINFORMATION,
    });
  };
};
