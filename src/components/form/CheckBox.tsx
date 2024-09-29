import React from "react";
import StandartText from "../text/StandartText";

interface CheckBoxProps {
  checked: boolean | undefined;
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, label }) => {
  return (
    <div className="flex items-center">
      <div className="mr-3">
        <div
          className={
            "w-[18px] max-w-[18px] min-w-[18px] h-[18px] min-h-[18px] max-h-[18px] rounded-full flex justify-center items-center " +
            (checked
              ? "shadow-[inset_0_0_0_2px_#FFF]"
              : "shadow-[inset_0_0_0_2px_#A6A6A6]")
          }>
          <div
            className={
              "w-[10px] max-w-[10px] min-w-[10px] h-[10px] min-h-[10px] max-h-[10px] rounded-full " +
              (checked && "bg-white")
            }
          />
        </div>
      </div>
      <StandartText text={label} />
    </div>
  );
};

export default CheckBox;
