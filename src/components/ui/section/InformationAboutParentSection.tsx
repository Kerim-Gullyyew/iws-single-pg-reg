import React, { useMemo, useState } from "react";
import MainText from "../../text/MainText";
import PText from "../../text/PText";
import FormLayout from "../../form/FormLayout";
import NormalBoldText from "../../text/NormalBoldText";
import NormalLightInput from "../../form/NormalLightInput";
import PhoneNumber from "../../form/PhoneNumber";
import Dropdown from "../../form/Dropdown";
import countryList from "react-select-country-list";
import PRedText from "../../text/PRedText";
import {
  ValidationErrors,
  CountryData,
  ParentChooseData,
  GenderParentChooseData,
} from "../../../utils/Interfaces";

interface InformationAboutParentSectionProps {
  parentChooseParent: ParentChooseData;
  setParentChooseParent: React.Dispatch<React.SetStateAction<ParentChooseData>>;
  genderChooseParent: GenderParentChooseData;
  setGenderChooseParent: React.Dispatch<
    React.SetStateAction<GenderParentChooseData>
  >;
  firstNameParent: string;
  setFirstNameParent: React.Dispatch<React.SetStateAction<string>>;
  lastNameParent: string;
  setLastNameParent: React.Dispatch<React.SetStateAction<string>>;
  emailParent: string;
  setEmailParent: React.Dispatch<React.SetStateAction<string>>;
  phoneNumberParent: string;
  setPhoneNumberParent: React.Dispatch<React.SetStateAction<string>>;
  addressLineParent: string;
  setAddressLineParent: React.Dispatch<React.SetStateAction<string>>;
  postalCodeParent: string;
  setPostalCodeParent: React.Dispatch<React.SetStateAction<string>>;
  countryParent: string | number;
  setCountryParent: React.Dispatch<React.SetStateAction<string | number>>;
  cityParent: string;
  setCityParent: React.Dispatch<React.SetStateAction<string>>;
  validationErrors: ValidationErrors;
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

const InformationAboutParentSection: React.FC<
  InformationAboutParentSectionProps
> = ({
  validationErrors,
  parentChooseParent,
  setParentChooseParent,
  genderChooseParent,
  setGenderChooseParent,
  firstNameParent,
  setFirstNameParent,
  lastNameParent,
  setLastNameParent,
  emailParent,
  setEmailParent,
  phoneNumberParent,
  setPhoneNumberParent,
  addressLineParent,
  setAddressLineParent,
  postalCodeParent,
  setPostalCodeParent,
  countryParent,
  setCountryParent,
  cityParent,
  setCityParent,
  setValidationErrors,
}) => {
  function getGenderDisplayText(genderValue: GenderParentChooseData): string {
    switch (genderValue) {
      case GenderParentChooseData.Male:
        return "Male";
      case GenderParentChooseData.Female:
        return "Female";
      case GenderParentChooseData.PreferToNotSay:
        return "Prefer to not say";
      default:
        return "";
    }
  }

  const handleChooseParent = (choice: string) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      parentChooseParent: "",
    }));
    if (choice in ParentChooseData) {
      setParentChooseParent(
        ParentChooseData[choice as keyof typeof ParentChooseData]
      );
    }
  };

  const handleGenderChooseParent = (choice: string) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      genderChooseParent: "",
    }));
    if (choice in GenderParentChooseData) {
      setGenderChooseParent(
        GenderParentChooseData[choice as keyof typeof GenderParentChooseData]
      );
    }
  };

  const handleFirstName = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      firstNameParent: "",
    }));
    if (event.target.value && event.target.value.length > 0) {
      const formattedValue =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();

      setFirstNameParent(formattedValue);
    } else {
      setFirstNameParent("");
    }
  };

  const handleLastName = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      lastNameParent: "",
    }));
    if (event.target.value && event.target.value.length > 0) {
      const formattedValue =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();
      setLastNameParent(formattedValue);
    } else {
      setLastNameParent("");
    }
  };

  const handleEmail = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      emailParent: "",
    }));
    setEmailParent(event.target.value);
  };

  const handleAddress = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      addressLineParent: "",
    }));
    if (event.target.value && event.target.value.length > 0) {
      const formattedValue =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();
      setAddressLineParent(formattedValue);
    } else {
      setAddressLineParent("");
    }
  };

  const handlePostaCode = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      postalCodeParent: "",
    }));
    if (event.target.value && event.target.value.length > 0) {
      const formattedValue =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();
      setPostalCodeParent(formattedValue);
    } else {
      setPostalCodeParent("");
    }
  };

  const handleCountry = (selectedValue: string | number) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      countryParent: "",
    }));
    setCountryParent(selectedValue);
  };

  const handleCity = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      cityParent: "",
    }));
    if (event.target.value && event.target.value.length > 0) {
      const formattedValue =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();
      setCityParent(formattedValue);
    } else {
      setCityParent("");
    }
  };

  const options = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        label: country.label,
        value: country.label,
      }));
  }, []);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredItems: CountryData[] = options.filter((item) =>
    item.label.toLowerCase().includes(searchTerm)
  );
  return (
    <div>
      <MainText text="3. Parent/Guardian Information" />
      <div className="pt-3">
        <PText text="I confirm I am the" required={true} />
        {validationErrors && validationErrors.parentChooseParent && (
          <PRedText text={validationErrors.parentChooseParent} />
        )}
        <div className="pt-1 xs:pt-2 grid grid-cols-2 gap-4">
          <FormLayout
            selected={parentChooseParent === ParentChooseData.Parent}
            onClick={() => handleChooseParent(ParentChooseData.Parent)}>
            <div className="text-center">
              <NormalBoldText text={ParentChooseData.Parent} />
            </div>
          </FormLayout>
          <FormLayout
            selected={parentChooseParent === ParentChooseData.Guardian}
            onClick={() => handleChooseParent(ParentChooseData.Guardian)}>
            <div className="text-center">
              <NormalBoldText text={ParentChooseData.Guardian} />
            </div>
          </FormLayout>
        </div>
      </div>
      <div className="pt-3">
        <PText text="Gender Identity" required={true} />
        {validationErrors && validationErrors.genderChooseParent && (
          <PRedText text={validationErrors.genderChooseParent} />
        )}
        <div className="pt-2 grid grid-cols-1 xs:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-3 xs:gap-1 sm:gap-3">
          <FormLayout
            selected={genderChooseParent === GenderParentChooseData.Male}
            onClick={() =>
              handleGenderChooseParent(GenderParentChooseData.Male)
            }>
            <div className="text-center text-nowrap">
              <NormalBoldText
                text={getGenderDisplayText(GenderParentChooseData.Male)}
              />
            </div>
          </FormLayout>
          <FormLayout
            selected={genderChooseParent === GenderParentChooseData.Female}
            onClick={() =>
              handleGenderChooseParent(GenderParentChooseData.Female)
            }>
            <div className="text-center text-nowrap">
              <NormalBoldText
                text={getGenderDisplayText(GenderParentChooseData.Female)}
              />
            </div>
          </FormLayout>
          <FormLayout
            selected={
              genderChooseParent === GenderParentChooseData.PreferToNotSay
            }
            onClick={() =>
              handleGenderChooseParent(GenderParentChooseData.PreferToNotSay)
            }>
            <div className="text-center text-nowrap">
              <NormalBoldText
                text={getGenderDisplayText(
                  GenderParentChooseData.PreferToNotSay
                )}
              />
            </div>
          </FormLayout>
        </div>
      </div>
      <div className="pt-3 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-2 xs:gap-y-4 justify-center items-end">
        <div>
          <PText text="First Name" required={true} />
          {validationErrors && validationErrors.firstNameParent && (
            <PRedText text={validationErrors.firstNameParent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={!!(validationErrors && validationErrors.firstNameParent)}
              isInput={true}>
              <NormalLightInput
                text="Your first name"
                value={firstNameParent}
                onChange={handleFirstName}
              />
            </FormLayout>
          </div>
        </div>
        <div>
          <PText text="Last Name" required={true} />
          {validationErrors && validationErrors.lastNameParent && (
            <PRedText text={validationErrors.lastNameParent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={!!(validationErrors && validationErrors.lastNameParent)}
              isInput={true}>
              <NormalLightInput
                text="Your last name"
                value={lastNameParent}
                onChange={handleLastName}
              />
            </FormLayout>
          </div>
        </div>
        <div>
          <PText text="Email" required={true} />
          {validationErrors && validationErrors.emailParent && (
            <PRedText text={validationErrors.emailParent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={!!(validationErrors && validationErrors.emailParent)}
              isInput={true}>
              <NormalLightInput
                text="Your email address"
                value={emailParent}
                onChange={handleEmail}
              />
            </FormLayout>
          </div>
        </div>
        <div>
          <PText text="Phone number" required={true} />
          {validationErrors && validationErrors.phoneNumberParent && (
            <PRedText text={validationErrors.phoneNumberParent} />
          )}
          <div className="pt-1">
            <PhoneNumber
              isError={
                !!(validationErrors && validationErrors.phoneNumberParent)
              }
              value={phoneNumberParent}
              onChange={setPhoneNumberParent}
            />
          </div>
        </div>

        <div>
          <PText text="Address Line" required={true} />
          {validationErrors && validationErrors.addressLineParent && (
            <PRedText text={validationErrors.addressLineParent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={
                !!(validationErrors && validationErrors.addressLineParent)
              }
              isInput={true}>
              <NormalLightInput
                text="Enter your address"
                value={addressLineParent}
                onChange={handleAddress}
              />
            </FormLayout>
          </div>
        </div>

        <div>
          <PText text="Postal Code" required={true} />
          {validationErrors && validationErrors.postalCodeParent && (
            <PRedText text={validationErrors.postalCodeParent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={
                !!(validationErrors && validationErrors.postalCodeParent)
              }
              isInput={true}>
              <NormalLightInput
                text="Postal Code"
                value={postalCodeParent}
                onChange={handlePostaCode}
              />
            </FormLayout>
          </div>
        </div>

        <div className="">
          <PText text="Country of Residence" required={true} />
          {validationErrors && validationErrors.countryParent && (
            <PRedText text={validationErrors.countryParent} />
          )}
          <div className="pt-1">
            <Dropdown
              isError={!!(validationErrors && validationErrors.countryParent)}
              items={filteredItems}
              label={"Search your country"}
              value={countryParent}
              handle={handleCountry}
              isSearch={true}
            />
          </div>
        </div>

        <div>
          <PText text="City" required={true} />
          {validationErrors && validationErrors.cityParent && (
            <PRedText text={validationErrors.cityParent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={!!(validationErrors && validationErrors.cityParent)}
              isInput={true}>
              <NormalLightInput
                text="Your City"
                value={cityParent}
                onChange={handleCity}
              />
            </FormLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationAboutParentSection;
