import React from "react";
import MainText from "../../text/MainText";
import {
  Subject,
  Package,
  ALevelProgram,
  DateObject,
} from "../../../utils/Interfaces";
import NormalLightText from "../../text/NormalLightText";
import NormalText from "../../text/NormalText";
import PText from "../../text/PText";
import {
  calculateDepositFee,
  calculateMonthlyPayment,
  calculateUpFrontPayment,
  monthlyTotalPayment,
  yearlyTotalPayment,
} from "../../../utils/calculateAnnualPaymentWithCondition";

interface PaymentSectionProps {
  paymentType: "Yearly" | "Monthly";
  date: DateObject;
  selectedPackage: Package | ALevelProgram | null;
  selectedSubjects: Subject[] | null;
}
const PaymentSection: React.FC<PaymentSectionProps> = ({
  selectedPackage,
  paymentType,
  selectedSubjects,
  date,
}) => {
  return (
    <div>
      {paymentType === "Monthly" && (
        <>
          <div className="mb-6">
            {selectedPackage && (
              <PText
                text={`The first installment of £${calculateMonthlyPayment(
                  selectedSubjects,
                  selectedPackage
                ).toFixed(
                  2
                )} will be charged now, followed by a monthly payment of £${calculateMonthlyPayment(
                  selectedSubjects,
                  selectedPackage
                ).toFixed(2)} on the 1st of each month.`}
              />
            )}
          </div>
        </>
      )}

      <MainText text={"Your Payment"} />
      <div className="w-full mt-2 h-[2px] rounded-full bg-black" />
      {paymentType === "Yearly" ? (
        <>
          <div className="py-2 flex justify-between">
            <NormalLightText text={"Up-front Payment"} />
            <div className="text-right">
              {selectedPackage && (
                <NormalText
                  text={`£${calculateUpFrontPayment(
                    selectedSubjects,
                    selectedPackage,
                    date
                  ).toFixed(2)}`}
                />
              )}
            </div>
          </div>
          <div className="py-2 flex justify-between">
            <NormalLightText text={"Registration Fee"} />
            <div className="text-right">
              {selectedPackage && <NormalText text={"£200.00"} />}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="py-2 flex justify-between">
            <NormalLightText text={"1st Installment"} />
            <div className="text-right">
              {selectedPackage && (
                <NormalText
                  text={`£${calculateMonthlyPayment(
                    selectedSubjects,
                    selectedPackage
                  ).toFixed(2)}`}
                />
              )}
            </div>
          </div>

          <div className="py-2 flex justify-between">
            <NormalLightText text={"Deposit Fee"} />
            <div className="text-right">
              {selectedPackage && (
                <NormalText
                  text={`£${calculateDepositFee(
                    selectedSubjects,
                    selectedPackage,
                    date
                  ).toFixed(2)}`}
                />
              )}
            </div>
          </div>
          <div className="py-2 flex justify-between">
            <NormalLightText text={"Registration Fee"} />
            <div className="text-right">
              {selectedPackage && <NormalText text={`£200.00`} />}
            </div>
          </div>
        </>
      )}

      <div className="w-full mt-2 h-[2px] rounded-full bg-black" />
      <div className="py-4 flex justify-between">
        <MainText text={"Total Payment"} />
        <div className="text-right">
          {selectedPackage && (
            <>
              {paymentType === "Yearly" ? (
                <MainText
                  text={`£${yearlyTotalPayment(
                    selectedSubjects,
                    selectedPackage,
                    date
                  ).toFixed(2)}`}
                />
              ) : (
                <MainText
                  text={`£${monthlyTotalPayment(
                    selectedSubjects,
                    selectedPackage,
                    date
                  ).toFixed(2)}`}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
