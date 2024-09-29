import {
  ALevelProgram,
  DateObject,
  Package,
  Subject,
} from "../../utils/Interfaces";
import { ParentInformationActionType } from "../action-types";
import { ParentInformationActionAll } from "../actions/ParentInformationAction";

interface ParentInformationState {
  selectedPackage: Package | ALevelProgram | null;
  selectedSubjects: Subject[] | null;
  date: DateObject | null;
  firstNameStudent: string | null;
  lastNameStudent: string | null;
  phoneNumberStudent: string | null;
  countryStudent: string | number | null;
  parentChooseParent: string | null;
  genderChooseParent: string | null;
  firstNameParent: string | null;
  lastNameParent: string | null;
  emailParent: string | null;
  phoneNumberParent: string | null;
  addressLineParent: string | null;
  postalCodeParent: string | null;
  countryParent: string | number | null;
  cityParent: string | null;
}

const initialState = {
  selectedPackage: null,
  selectedSubjects: null,
  date: null,
  firstNameStudent: null,
  lastNameStudent: null,
  phoneNumberStudent: null,
  countryStudent: null,
  parentChooseParent: null,
  genderChooseParent: null,
  firstNameParent: null,
  lastNameParent: null,
  emailParent: null,
  phoneNumberParent: null,
  addressLineParent: null,
  postalCodeParent: null,
  countryParent: null,
  cityParent: null,
};

const ParentInformationReducer = (
  state: ParentInformationState = initialState,
  action: ParentInformationActionAll
): ParentInformationState => {
  switch (action.type) {
    case ParentInformationActionType.ADD_PARENTINFORMATION:
      return {
        selectedPackage: action.payload.selectedPackage,
        selectedSubjects: action.payload.selectedSubjects,
        date: action.payload.date,
        firstNameStudent: action.payload.firstNameStudent,
        lastNameStudent: action.payload.lastNameStudent,
        phoneNumberStudent: action.payload.phoneNumberStudent,
        countryStudent: action.payload.countryStudent,
        parentChooseParent: action.payload.parentChooseParent,
        genderChooseParent: action.payload.genderChooseParent,
        firstNameParent: action.payload.firstNameParent,
        lastNameParent: action.payload.lastNameParent,
        emailParent: action.payload.emailParent,
        phoneNumberParent: action.payload.phoneNumberParent,
        addressLineParent: action.payload.addressLineParent,
        postalCodeParent: action.payload.postalCodeParent,
        countryParent: action.payload.countryParent,
        cityParent: action.payload.cityParent,
      };

    case ParentInformationActionType.CLEAR_PARENTINFORMATION:
      return {
        selectedPackage: null,
        selectedSubjects: null,
        date: null,
        firstNameStudent: null,
        lastNameStudent: null,
        phoneNumberStudent: null,
        countryStudent: null,
        parentChooseParent: null,
        genderChooseParent: null,
        firstNameParent: null,
        lastNameParent: null,
        emailParent: null,
        phoneNumberParent: null,
        addressLineParent: null,
        postalCodeParent: null,
        countryParent: null,
        cityParent: null,
      };

    default:
      return state;
  }
};

export default ParentInformationReducer;
