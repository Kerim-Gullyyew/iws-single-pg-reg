import React, { useMemo, useState } from "react";
import PText from "../../text/PText";
import FormLayout from "../../form/FormLayout";
import NormalLightInput from "../../form/NormalLightInput";
import PhoneNumber from "../../form/PhoneNumber";
import MainText from "../../text/MainText";
import Dropdown from "../../form/Dropdown";
import countryList from "react-select-country-list";
import PRedText from "../../text/PRedText";
import { ValidationErrors, CountryData } from "../../../utils/Interfaces";

interface InformationAboutStudentSectionProps {
  firstNameStudent: string;
  setFirstNameStudent: React.Dispatch<React.SetStateAction<string>>;
  emailStudent: string;
  setEmailStudent: React.Dispatch<React.SetStateAction<string>>;
  dateBirthStudent: string;
  setDateBirthStudent: React.Dispatch<React.SetStateAction<string>>;
  lastNameStudent: string;
  setLastNameStudent: React.Dispatch<React.SetStateAction<string>>;
  phoneNumberStudent: string;
  setPhoneNumberStudent: React.Dispatch<React.SetStateAction<string>>;

  countryStudent: string | number;
  setCountryStudent: React.Dispatch<React.SetStateAction<string | number>>;

  validationErrors?: ValidationErrors;
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

const InformationAboutStudentSection: React.FC<
  InformationAboutStudentSectionProps
> = ({
  dateBirthStudent,
  setDateBirthStudent,
  firstNameStudent,
  setFirstNameStudent,
  lastNameStudent,
  setLastNameStudent,
  phoneNumberStudent,
  setPhoneNumberStudent,
  countryStudent,
  setCountryStudent,
  validationErrors,
  setValidationErrors,
  emailStudent,
  setEmailStudent,
}) => {
  const handleFirstName = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      firstNameStudent: "",
    }));

    if (event.target.value && event.target.value.length > 0) {
      const formattedValue =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();

      setFirstNameStudent(formattedValue);
    } else {
      setFirstNameStudent("");
    }
  };
  const handleDateBirth = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      dateBirthStudent: "",
    }));

    if (event.target.value && event.target.value.length > 0) {
      let value = event.target.value;
      const cleanValue = value.replace(/[^0-9]/g, "");
      if (cleanValue.length <= 2) {
        value = cleanValue;
      } else if (cleanValue.length <= 4) {
        value = `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`;
      } else if (cleanValue.length <= 8) {
        value = `${cleanValue.slice(0, 2)}/${cleanValue.slice(
          2,
          4
        )}/${cleanValue.slice(4)}`;
      }

      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      const formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      setDateBirthStudent(formattedValue);
    } else {
      setDateBirthStudent("");
    }
  };

  const handleLastName = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      lastNameStudent: "",
    }));
    if (event.target.value && event.target.value.length > 0) {
      const formattedValue =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1).toLowerCase();

      setLastNameStudent(formattedValue);
    } else {
      setLastNameStudent("");
    }
  };

  const handleEmail = (event: { target: { value: string } }) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      emailStudent: "",
    }));
    if (event.target.value && event.target.value.length > 0) {
      setEmailStudent(event.target.value);
    } else {
      setEmailStudent("");
    }
  };
  const handleCountry = (selectedValue: string | number) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      countryStudent: "",
    }));
    setCountryStudent(selectedValue);
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
      <MainText text="2. Information about the student" />
      <div className="pt-1 xs:pt-2 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-2 xs:gap-y-4 justify-center items-end">
        <div>
          <PText text="First Name" required={true} />
          {validationErrors && validationErrors.firstNameStudent && (
            <PRedText text={validationErrors.firstNameStudent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={
                !!(validationErrors && validationErrors.firstNameStudent)
              }
              isInput={true}>
              <NormalLightInput
                value={firstNameStudent}
                onChange={handleFirstName}
                text="Student's first name"
              />
            </FormLayout>
          </div>
        </div>

        <div>
          <PText text="Last Name" required={true} />
          {validationErrors && validationErrors.lastNameStudent && (
            <PRedText text={validationErrors.lastNameStudent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={!!(validationErrors && validationErrors.lastNameStudent)}
              isInput={true}>
              <NormalLightInput
                value={lastNameStudent}
                onChange={handleLastName}
                text="Student's last name"
              />
            </FormLayout>
          </div>
        </div>

        <div>
          <PText text="Email" required={true} />
          {validationErrors && validationErrors.emailStudent && (
            <PRedText text={validationErrors.emailStudent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={!!(validationErrors && validationErrors.emailStudent)}
              isInput={true}>
              <NormalLightInput
                value={emailStudent}
                onChange={handleEmail}
                text="Student's email"
              />
            </FormLayout>
          </div>
        </div>

        <div>
          <PText text="Date of Birth" required={true} />
          {validationErrors && validationErrors.dateBirthStudent && (
            <PRedText text={validationErrors.dateBirthStudent} />
          )}
          <div className="pt-1">
            <FormLayout
              isError={
                !!(validationErrors && validationErrors.dateBirthStudent)
              }
              isInput={true}>
              <NormalLightInput
                text="dd/MM/YYYY"
                value={dateBirthStudent}
                onChange={handleDateBirth}
              />
            </FormLayout>
          </div>
        </div>

        <div>
          <PText text="Phone number" required={true} />
          {validationErrors && validationErrors.phoneNumberStudent && (
            <PRedText text={validationErrors.phoneNumberStudent} />
          )}
          <div className="pt-1">
            <PhoneNumber
              isError={
                !!(validationErrors && validationErrors.phoneNumberStudent)
              }
              value={phoneNumberStudent}
              onChange={setPhoneNumberStudent}
            />
          </div>
        </div>
        <div className="">
          <PText text="Country of Residence" required={true} />
          {validationErrors && validationErrors.countryStudent && (
            <PRedText text={validationErrors.countryStudent} />
          )}
          <div className="pt-1">
            <Dropdown
              isError={!!(validationErrors && validationErrors.countryStudent)}
              items={filteredItems}
              label={"Search your country"}
              value={countryStudent}
              handle={handleCountry}
              isSearch={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationAboutStudentSection;
