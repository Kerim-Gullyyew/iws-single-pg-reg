import React, { useState } from "react";
import * as Yup from "yup";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import {
  ALevelProgram,
  date,
  DateObject,
  GenderParentChooseData,
  Package,
  ParentChooseData,
  Subject,
  ValidationErrors,
} from "../../../utils/Interfaces";
import { getMonthName } from "../../../utils/getMonthName";
import {
  calculateAnnualPaymentWithCondition,
  calculateDepositFee,
  calculateMonthlyPayment,
  calculateUpFrontPayment,
  monthlyTotalPayment,
  yearlyTotalPayment,
} from "../../../utils/calculateAnnualPaymentWithCondition";

interface SubmitApplicationProps {
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
  selectedPackage: Package | ALevelProgram | null;
  selectedSubjects: Subject[] | null;
  date: DateObject;
  partner: string | null;
  emailStudent: string;
  dateBirthStudent: string;
  firstNameStudent: string;
  paymentType: "Yearly" | "Monthly";
  lastNameStudent: string;
  checked: boolean;
  checked2: boolean;
  checked3: boolean;
  phoneNumberStudent: string;
  countryStudent: string | number;
  parentChooseParent: ParentChooseData;
  genderChooseParent: GenderParentChooseData;
  firstNameParent: string;
  lastNameParent: string;
  emailParent: string;
  phoneNumberParent: string;
  addressLineParent: string;
  postalCodeParent: string;
  countryParent: string | number;
  cityParent: string;
  priceWithCondition: number | null;
  setPriceWithCondition: React.Dispatch<React.SetStateAction<number | null>>;
  priceWithDiscount: number | null;
  setPriceWithDiscount: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedPackage: React.Dispatch<
    React.SetStateAction<Package | ALevelProgram | null>
  >;
}

const SubmitApplication: React.FC<SubmitApplicationProps> = ({
  selectedPackage,
  partner,
  selectedSubjects,
  date,
  firstNameStudent,
  emailStudent,
  checked,
  checked2,
  checked3,
  dateBirthStudent,
  lastNameStudent,
  phoneNumberStudent,
  countryStudent,
  paymentType,
  parentChooseParent,
  genderChooseParent,
  firstNameParent,
  lastNameParent,
  emailParent,
  phoneNumberParent,
  addressLineParent,
  postalCodeParent,
  countryParent,
  cityParent,
  setValidationErrors,
}) => {
  const { addParentInformation } = useActions();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    selectedPackage: Yup.mixed()
      .nullable()
      .required("A package selection is required"),
    selectedSubjects: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required(),
          name: Yup.string().required(),
        })
      )
      .nullable()
      .required(
        "At least" +
          selectedPackage?.min_select +
          " subject(s) must be selected"
      ),
    date: Yup.object()
      .shape({
        day: Yup.number().required(),
        month: Yup.number().required(),
        year: Yup.number().required(),
      })
      .required("Date is required"),
    checked: Yup.boolean().oneOf([true], "This field must be checked"),
    checked2: Yup.boolean().oneOf([true], "This field must be checked"),
    checked3: Yup.boolean().oneOf([true], "This field must be checked"),
    firstNameStudent: Yup.string().required("First name is required"),
    emailStudent: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    dateBirthStudent: Yup.string().required("Date of Birth is required"),
    lastNameStudent: Yup.string().required("Last name is required"),
    phoneNumberStudent: Yup.string().required("Phone number is required"),
    countryStudent: Yup.string()
      .trim()
      .required("Country is required")
      .test(
        "is-not-empty",
        "Country cannot be empty",
        (value) => value !== " "
      ),
    parentChooseParent: Yup.mixed()
      .oneOf(Object.values(ParentChooseData))
      .required("Parent choice is required"),
    genderChooseParent: Yup.mixed()
      .oneOf(Object.values(GenderParentChooseData))
      .required("Gender choice is required"),
    firstNameParent: Yup.string().required("First name is required"),
    lastNameParent: Yup.string().required("Last name is required"),
    emailParent: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumberParent: Yup.string().required("Phone number is required"),
    addressLineParent: Yup.string().required("Address line is required"),
    postalCodeParent: Yup.string().required("Postal code is required"),
    countryParent: Yup.string()
      .trim()
      .required("Country is required")
      .test(
        "is-not-empty",
        "Country cannot be empty",
        (value) => value !== " "
      ),
    cityParent: Yup.string().required("City is required"),
  });

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(partner);

    const data = {
      student: {
        firstName: firstNameStudent,
        lastName: lastNameStudent,
        email: emailStudent,
        dob: dateBirthStudent,
        phone: phoneNumberStudent,
        country: countryStudent,
      },
      parent: {
        guardian: parentChooseParent,
        gender: genderChooseParent,
        firstName: firstNameParent,
        lastName: lastNameParent,
        email: emailParent,
        phone: phoneNumberParent,
        address: addressLineParent,
        postalCode: postalCodeParent,
        country: countryParent,
        city: cityParent,
      },
      study: {
        ageGroup: selectedPackage?.name,
        programmes: selectedSubjects,
        desiredStartDate:
          date.day + " / " + getMonthName(date.month) + " / " + date.year,
      },
      partner: partner,
      paymentType: paymentType,
      annualPayment:
        selectedPackage &&
        paymentType === "Yearly" &&
        calculateUpFrontPayment(
          selectedSubjects,
          selectedPackage,
          date
        ).toFixed(2),
      depositFee:
        selectedPackage &&
        paymentType === "Monthly" &&
        calculateDepositFee(selectedSubjects, selectedPackage, date).toFixed(2),
      monthlyPayment:
        selectedPackage &&
        paymentType === "Monthly" &&
        calculateMonthlyPayment(selectedSubjects, selectedPackage).toFixed(2),
      totalPrice:
        selectedPackage &&
        (paymentType === "Yearly"
          ? yearlyTotalPayment(selectedSubjects, selectedPackage, date).toFixed(
              2
            )
          : monthlyTotalPayment(
              selectedSubjects,
              selectedPackage,
              date
            ).toFixed(2)),
    };

    setLoading(true);

    try {
      await validationSchema.validate(
        {
          selectedPackage,
          selectedSubjects,
          date,
          checked,
          checked2,
          checked3,
          firstNameStudent,
          lastNameStudent,
          phoneNumberStudent,
          countryStudent,
          parentChooseParent,
          genderChooseParent,
          firstNameParent,
          emailStudent,
          dateBirthStudent,
          lastNameParent,
          emailParent,
          phoneNumberParent,
          addressLineParent,
          postalCodeParent,
          countryParent,
          cityParent,
        },
        { abortEarly: false }
      );

      const json = {
        selectedPackage,
        selectedSubjects,
        date,
        firstNameStudent,
        lastNameStudent,
        phoneNumberStudent,
        countryStudent,
        parentChooseParent,
        genderChooseParent,
        firstNameParent,
        lastNameParent,
        emailParent,
        phoneNumberParent,
        addressLineParent,
        postalCodeParent,
        countryParent,
        cityParent,
      };
      addParentInformation(json);

      try {
        const response = await axios.post(
          "https://api.main.iwsonlineschool.co.uk/create-checkout-session-enrol",
          // "http://localhost:3500/create-checkout-session-enrol",
          {
            // const response = await axios.post('https://api.summer-enrol.iwsonlineschool.co.uk/create-checkout-session', {
            // const response = await axios.post('http://192.168.1.101:3500/create-checkout-session', {
            // const response = await axios.post('https://webhook-test.com/3b140efbed6ba087f2c32567260f1d17', {
            data: data,
          }
        );
        window.location.href = response.data.url;
      } catch (error) {
        console.error("Payment Error:", error);
        setError("Payment processing failed. Please try again.");
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = err.inner.reduce((acc, error) => {
          if (typeof error.path === "string") {
            return {
              ...acc,
              [error.path]: error.message,
            };
          }
          return acc;
        }, {});
        setValidationErrors(errors);
      } else {
        setError("Validation failed. Please check your input.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <div
          onClick={handlePayment}
          className="bg-blue hover:bg-purple-600 cursor-pointer w-full rounded-lg">
          <div className="text-center py-4 px-6 text-white font-bold text-[20px] tracking-wider">
            Go To Payment
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitApplication;
