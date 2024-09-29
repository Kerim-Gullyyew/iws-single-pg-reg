import React, { useState } from "react";
import HeaderText from "../components/text/HeaderText";
import MainText from "../components/text/MainText";
import Camdridge from "../components/ui/svg/Cambridge.svg";
import Cobis from "../components/ui/svg/Cobis.svg";
import Ukrlp from "../components/ui/svg/Ukrlp.svg";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import {
  FaSquareFacebook,
  FaLinkedin,
  FaSquareInstagram,
  FaSquareTwitter,
} from "react-icons/fa6";
import DesiredStartDateSection from "../components/ui/section/DesiredStartDateSection";
import InformationAboutStudentSection from "../components/ui/section/InformationAboutStudentSection";
import InformationAboutParentSection from "../components/ui/section/InformationAboutParentSection";
import StudyInformationSection from "../components/ui/section/StudyInformationSection";
import SubjectSelectionSection from "../components/ui/section/SubjectSelectionSection";
import SummarySection from "../components/ui/section/SummarySection";
import PaymentSection from "../components/ui/section/PaymentSection";
import { ValidationErrors } from "../utils/Interfaces";
import {
  Subject,
  DateObject,
  Package,
  ParentChooseData,
  GenderParentChooseData,
  ALevelProgram,
} from "../utils/Interfaces";
import { useTypedSelector } from "../hooks/useTypedSelector";
import SubmitApplication from "../components/ui/section/SubmitApplication";
import PRedText from "../components/text/PRedText";
interface NewPageProps {}

const NewPage: React.FC<NewPageProps> = () => {
  const navigate = useNavigate();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const partner = query.get("partner");

  const parentInformation = useTypedSelector(
    (state: any) => state.parentInformation
  );
  //Study Information
  const [selectedPackage, setSelectedPackage] = useState<
    Package | ALevelProgram | null
  >(null);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[] | null>(
    null
  );
  const [date, setDate] = useState<DateObject>({
    day: 3,
    month: 9,
    year: 2024,
  });

  const [firstNameStudent, setFirstNameStudent] = useState("");
  const [lastNameStudent, setLastNameStudent] = useState("");
  const [emailStudent, setEmailStudent] = useState("");
  const [dateBirthStudent, setDateBirthStudent] = useState("");

  const [phoneNumberStudent, setPhoneNumberStudent] = useState<string>("44");
  const [countryStudent, setCountryStudent] = useState<string | number>("");
  const [parentChooseParent, setParentChooseParent] =
    useState<ParentChooseData>(
      parentInformation.parentChooseParent || ParentChooseData.Parent
    );
  const [genderChooseParent, setGenderChooseParent] =
    useState<GenderParentChooseData>(
      parentInformation.genderChooseParent || GenderParentChooseData.Male
    );
  const [firstNameParent, setFirstNameParent] = useState(
    parentInformation.firstNameParent || ""
  );
  const [lastNameParent, setLastNameParent] = useState(
    parentInformation.lastNameParent || ""
  );
  const [emailParent, setEmailParent] = useState(
    parentInformation.emailParent || ""
  );
  const [phoneNumberParent, setPhoneNumberParent] = useState<string>(
    parentInformation.phoneNumberParent || "44"
  );
  const [addressLineParent, setAddressLineParent] = useState(
    parentInformation.addressLineParent || ""
  );
  const [postalCodeParent, setPostalCodeParent] = useState(
    parentInformation.postalCodeParent || ""
  );
  const [countryParent, setCountryParent] = useState<string | number>(
    parentInformation.countryParent || ""
  );
  const [cityParent, setCityParent] = useState(
    parentInformation.cityParent || ""
  );
  const [checked, setChecked] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [checked3, setChecked3] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<"Yearly" | "Monthly">(
    "Yearly"
  );
  const [priceWithCondition, setPriceWithCondition] = useState<number | null>(
    null
  );
  const [priceWithDiscount, setPriceWithDiscount] = useState<number | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  return (
    <React.Fragment>
      <div className="hidden md:flex md:justify-between md:items-center md:container py-3">
        <div>
          <img
            src="/logo19231.webp"
            onClick={() => {
              window.open("https://www.iwsonlineschool.co.uk/", "_blank");
            }}
            className=" w-36 object-contain cursor-pointer"
            alt="logo"
          />
        </div>

        <div>
          <div
            onClick={() => {
              window.open(
                "https://www.iwsonlineschool.co.uk/contact-us",
                "_blank"
              );
            }}
            className="bg-blue text-center cursor-pointer px-4 py-2 rounded-md text-white font-[500] text-[14px]">
            Contact Us
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-textLight" />

      <div className="py-12">
        <div className="container">
          <HeaderText />
        </div>
        <div className="md:grid md:grid-cols-12 container">
          <div className="md:col-span-7">
            <div className="container">
              <div className="pt-10">
                <StudyInformationSection
                  validationErrors={validationErrors}
                  setValidationErrors={setValidationErrors}
                  setSelectedSubjects={setSelectedSubjects}
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                />
              </div>
              {selectedPackage && (
                <div className="pt-10">
                  <SubjectSelectionSection
                    setValidationErrors={setValidationErrors}
                    selectedPackage={selectedPackage}
                    selectedSubjects={selectedSubjects}
                    validationErrors={validationErrors}
                    setSelectedSubjects={setSelectedSubjects}
                  />
                </div>
              )}

              <div className="pt-10">
                <DesiredStartDateSection
                  validationErrors={validationErrors}
                  date={date}
                  setDate={setDate}
                />
              </div>

              <div className="pt-10">
                <InformationAboutStudentSection
                  emailStudent={emailStudent}
                  setEmailStudent={setEmailStudent}
                  dateBirthStudent={dateBirthStudent}
                  setDateBirthStudent={setDateBirthStudent}
                  setValidationErrors={setValidationErrors}
                  firstNameStudent={firstNameStudent}
                  setFirstNameStudent={setFirstNameStudent}
                  lastNameStudent={lastNameStudent}
                  setLastNameStudent={setLastNameStudent}
                  phoneNumberStudent={phoneNumberStudent}
                  setPhoneNumberStudent={setPhoneNumberStudent}
                  countryStudent={countryStudent}
                  setCountryStudent={setCountryStudent}
                  validationErrors={validationErrors}
                />
              </div>
              <div className="pt-10">
                <InformationAboutParentSection
                  setValidationErrors={setValidationErrors}
                  parentChooseParent={parentChooseParent}
                  setParentChooseParent={setParentChooseParent}
                  genderChooseParent={genderChooseParent}
                  setGenderChooseParent={setGenderChooseParent}
                  firstNameParent={firstNameParent}
                  setFirstNameParent={setFirstNameParent}
                  lastNameParent={lastNameParent}
                  setLastNameParent={setLastNameParent}
                  emailParent={emailParent}
                  setEmailParent={setEmailParent}
                  phoneNumberParent={phoneNumberParent}
                  setPhoneNumberParent={setPhoneNumberParent}
                  addressLineParent={addressLineParent}
                  setAddressLineParent={setAddressLineParent}
                  postalCodeParent={postalCodeParent}
                  setPostalCodeParent={setPostalCodeParent}
                  countryParent={countryParent}
                  setCountryParent={setCountryParent}
                  cityParent={cityParent}
                  setCityParent={setCityParent}
                  validationErrors={validationErrors}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 md:justify-end md:flex">
            <div className="pt-16">
              <div className=" bg-inputBg md:bg-white w-full lg:min-w-[400px] md:max-w-[380px] md:border md:rounded-lg md:border-inputBorder">
                <div className="px-5 py-3">
                  <SummarySection
                    paymentType={paymentType}
                    setPaymentType={setPaymentType}
                  />
                </div>
                <div className="px-5 py-3">
                  <PaymentSection
                    paymentType={paymentType}
                    date={date}
                    selectedPackage={selectedPackage}
                    selectedSubjects={selectedSubjects}
                  />
                  <div className="pt-1">
                    <div className="pt-3 flex gap-3">
                      <input
                        value={checked ? "checked" : ""}
                        onChange={() => setChecked(!checked)}
                        id="check"
                        type="checkbox"
                        className="w-4 min-w-4 min-h-4 h-4 bg-inputBg mt-1 cursor-pointer"
                      />
                      <label htmlFor="check" className=" cursor-pointer ">
                        I have read and agreed to the{" "}
                        <span
                          className="text-blue hover:underline"
                          onClick={() =>
                            window.open(
                              "https://iwsonlineschool.co.uk/terms-conditions",
                              "_blank"
                            )
                          }>
                          IWS Online School Terms and Conditions
                        </span>
                        .
                      </label>
                    </div>
                    {validationErrors && validationErrors.checked && (
                      <PRedText text={validationErrors.checked} />
                    )}
                    <div className="pt-3 flex gap-3">
                      <input
                        value={checked2 ? "checked" : ""}
                        onChange={() => setChecked2(!checked2)}
                        id="check2"
                        type="checkbox"
                        className="w-4 min-w-4 min-h-4 h-4 bg-inputBg mt-1 cursor-pointer"
                      />
                      <label htmlFor="check2" className=" cursor-pointer ">
                        I have read and agreed to the{" "}
                        <span
                          className="text-blue hover:underline"
                          onClick={() =>
                            window.open(
                              "https://www.iwsonlineschool.co.uk/privacy-policy",
                              "_blank"
                            )
                          }>
                          IWS Privacy Policy
                        </span>
                        .
                      </label>
                    </div>
                    {validationErrors && validationErrors.checked2 && (
                      <PRedText text={validationErrors.checked2} />
                    )}
                    <div className="pt-3 flex gap-3">
                      <input
                        value={checked3 ? "checked" : ""}
                        onChange={() => setChecked3(!checked3)}
                        id="check3"
                        type="checkbox"
                        className="w-4 min-w-4 min-h-4 h-4 bg-inputBg mt-1 cursor-pointer"
                      />
                      <label htmlFor="check3" className=" cursor-pointer ">
                        I give permission for IWS Online School to feature my
                        child's photos and videos for marketing and
                        promotional purposes.
                      </label>
                    </div>
                    {validationErrors && validationErrors.checked3 && (
                      <PRedText text={validationErrors.checked3} />
                    )}
                    <div className="py-10 px-8">
                      <SubmitApplication
                        paymentType={paymentType}
                        partner={partner}
                        selectedPackage={selectedPackage}
                        selectedSubjects={selectedSubjects}
                        date={date}
                        setSelectedPackage={setSelectedPackage}
                        firstNameStudent={firstNameStudent}
                        emailStudent={emailStudent}
                        dateBirthStudent={dateBirthStudent}
                        lastNameStudent={lastNameStudent}
                        phoneNumberStudent={phoneNumberStudent}
                        countryStudent={countryStudent}
                        parentChooseParent={parentChooseParent}
                        genderChooseParent={genderChooseParent}
                        firstNameParent={firstNameParent}
                        lastNameParent={lastNameParent}
                        emailParent={emailParent}
                        phoneNumberParent={phoneNumberParent}
                        addressLineParent={addressLineParent}
                        postalCodeParent={postalCodeParent}
                        countryParent={countryParent}
                        cityParent={cityParent}
                        setValidationErrors={setValidationErrors}
                        priceWithCondition={priceWithCondition}
                        setPriceWithCondition={setPriceWithCondition}
                        priceWithDiscount={priceWithDiscount}
                        setPriceWithDiscount={setPriceWithDiscount}
                        checked={checked}
                        checked2={checked2}
                        checked3={checked3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 container">
          <MainText text={"Accredited by"} />
          <div className="w-full mt-2 h-[2px] rounded-full bg-black" />
          <div className="flex justify-center">
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 justify-center items-center gap-10">
              <img src={Camdridge} alt="Camdridge" />
              <img src={Cobis} alt="Cobis" />
              <img src={Ukrlp} alt="Ukrlp" />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:flex-col w-full bg-indigo-100">
        <div className="flex justify-between w-full container py-5">
          <div>
            <img
              src="/logo19231.webp"
              onClick={() => {
                window.open("https://www.iwsonlineschool.co.uk/", "_blank");
              }}
              className=" w-48 object-contain cursor-pointer"
              alt="logo"
            />
          </div>

          <div>
            <div>
              <div className="pt-5">
                <p className="text-[16px] text-indigo-900 font-[600] tracking-tighter">
                  Follow us on social media
                </p>
                <div className="flex gap-3 items-center py-2">
                  <FaLinkedin
                    className=" cursor-pointer"
                    onClick={() => {
                      window.open(
                        "https://www.linkedin.com/company/iwschoolonline/",
                        "_blank"
                      );
                    }}
                    size={28}
                  />
                  <FaSquareFacebook
                    className=" cursor-pointer"
                    onClick={() => {
                      window.open(
                        "https://www.facebook.com/iwschoolonline",
                        "_blank"
                      );
                    }}
                    size={28}
                  />
                  <FaSquareTwitter
                    className=" cursor-pointer"
                    onClick={() => {
                      window.open(
                        "https://twitter.com/iwsonlineschool",
                        "_blank"
                      );
                    }}
                    size={28}
                  />
                  <FaSquareInstagram
                    className=" cursor-pointer"
                    onClick={() => {
                      window.open(
                        "https://www.instagram.com/iwsonlineschool/",
                        "_blank"
                      );
                    }}
                    size={28}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="h-[2px] bg-textLight w-full rounded-full" />
          <div className="py-5 flex justify-between items-center">
            <p
              onClick={() => {
                window.open(
                  "https://iwsonlineschool.co.uk/terms-conditions",
                  "_blank"
                );
              }}
              className="text-[16px] cursor-pointer text-indigo-900 font-[600] tracking-tighter">
              Terms and Conditions
            </p>
            <p className="text-[16px] text-indigo-900 font-[600] tracking-tighter">
              2024 IWS Online School. All rights reserved
            </p>
            <p
              onClick={() => {
                window.open(
                  "https://www.iwsonlineschool.co.uk/privacy-policy",
                  "_blank"
                );
              }}
              className="text-[16px] cursor-pointer text-indigo-900 font-[600] tracking-tighter">
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewPage;
