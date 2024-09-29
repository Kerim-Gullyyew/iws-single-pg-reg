import {
  ALevelProgram,
  DateObject,
  GenderParentChooseData,
  Package,
  ParentChooseData,
  Subject,
  ValidationErrors,
} from "../../src/utils/Interfaces";

const numberOfMonths = 9;
const monthNumbers: { [key: number]: number } = {
  9: 9,
  10: 8,
  11: 7,
  12: 6,
  1: 5,
  2: 4,
  3: 3,
  4: 2,
  5: 1,
};

export function calculateAnnualPaymentWithCondition(
  selectedSubjects: Subject[] | null,
  programOrPackage: Package | ALevelProgram
) {
  let sum = 0;
  if ("condition" in programOrPackage && programOrPackage.condition) {
    if (selectedSubjects) {
      selectedSubjects.forEach((sub) => {
        sum += sub.price;
      });
      if (
        selectedSubjects.length >= programOrPackage.condition.selected &&
        selectedSubjects.length < 6
      ) {
        sum *= 1 - programOrPackage.condition.discount / 100;
      }
      if (selectedSubjects.length >= 6) {
        sum = 0;
        if (programOrPackage?.name === "Primary School") {
          selectedSubjects.slice(0, 5).forEach((sub, index) => {
            sum += sub.price;
          });
          sum *= 1 - programOrPackage.condition.discount / 100;
          selectedSubjects.slice(5).forEach((sub, index) => {
            sum += 900;
          });
        }

        if (programOrPackage?.name === "Secondary School") {
          selectedSubjects.slice(0, 5).forEach((sub, index) => {
            sum += sub.price;
          });
          sum *= 1 - programOrPackage.condition.discount / 100;
          selectedSubjects.slice(5).forEach((sub, index) => {
            sum += 1080;
          });
        }

        if (programOrPackage?.name === "I/GCSE School") {
          selectedSubjects.slice(0, 5).forEach((sub, index) => {
            sum += sub.price;
          });
          sum *= 1 - programOrPackage.condition.discount / 100;
          selectedSubjects.slice(5).forEach((sub, index) => {
            sum += 1296;
          });
        }
      }
    }
  }
  if (
    "price_condition" in programOrPackage &&
    programOrPackage.price_condition
  ) {
    if (selectedSubjects) {
      const numberOfSubjects = selectedSubjects.length;
      const priceConditionItem = programOrPackage.price_condition.find(
        (item) => item[numberOfSubjects]
      );

      if (priceConditionItem) {
        sum = priceConditionItem[numberOfSubjects] ?? 0;
      }
    }
  }
  return sum;
}

export function calculateMonthlyPayment(
  selectedSubjects: Subject[] | null,
  programOrPackage: Package | ALevelProgram
) {
  const monthlyPayment =
    calculateAnnualPaymentWithCondition(selectedSubjects, programOrPackage) /
    numberOfMonths;
  return monthlyPayment;
}

export function calculateUpFrontPayment(
  selectedSubjects: Subject[] | null,
  programOrPackage: Package | ALevelProgram,
  date: DateObject
) {
  const upFrontPayment =
    calculateMonthlyPayment(selectedSubjects, programOrPackage) *
    monthNumbers[date.month];
  return upFrontPayment;
}

export function calculateDepositFee(
  selectedSubjects: Subject[] | null,
  programOrPackage: Package | ALevelProgram,
  date: DateObject
) {
  const depositFee =
    calculateUpFrontPayment(selectedSubjects, programOrPackage, date) / 10;
  return depositFee;
}

export function yearlyTotalPayment(
  selectedSubjects: Subject[] | null,
  programOrPackage: Package | ALevelProgram,
  date: DateObject
) {
  const yearlyTotalPayment =
    calculateUpFrontPayment(selectedSubjects, programOrPackage, date) + 200;
  return yearlyTotalPayment;
}

export function monthlyTotalPayment(
  selectedSubjects: Subject[] | null,
  programOrPackage: Package | ALevelProgram,
  date: DateObject
) {
  const monthlyTotalPayment =
    calculateMonthlyPayment(selectedSubjects, programOrPackage) +
    calculateDepositFee(selectedSubjects, programOrPackage, date) +
    200;
  return monthlyTotalPayment;
}
