import React from "react";
import MainText from "../../text/MainText";
interface SummarySectionProps {
  paymentType: string;
  setPaymentType: React.Dispatch<React.SetStateAction<"Yearly" | "Monthly">>;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  setPaymentType,
  paymentType,
}) => {
  return (
    <div>
      <MainText text={"Select the payment option"} />
      <div className="w-full mt-2 h-[2px] rounded-full bg-black" />

      <div className="border-2 mt-4 border-gray-300 p-2 rounded-xl w-full flex justify-center gap-5 ">
        <div
          onClick={() => setPaymentType("Yearly")}
          className={`transition-colors cursor-pointer flex justify-center items-center duration-300 text-lg py-2 outline-none flex-1 rounded-lg text-center ${
            paymentType === "Yearly" ? "bg-blue text-white" : ""
          }`}>
          Up-front
        </div>
        <div
          onClick={() => setPaymentType("Monthly")}
          className={`transition-colors cursor-pointer flex justify-center items-center duration-300 text-lg py-2 outline-none flex-1 rounded-lg text-center ${
            paymentType === "Monthly" ? "bg-blue text-white" : ""
          }`}>
          Monthly Installments
        </div>
      </div>

      {/* <div className='w-full h-[1px] rounded-full bg-textLight' /> */}
    </div>
  );
};

export default SummarySection;
