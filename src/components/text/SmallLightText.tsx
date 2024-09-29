import React from "react";

interface SmallLightTextProps {
  text: string | null;
  selected?: boolean;
}

const SmallLightText: React.FC<SmallLightTextProps> = ({ text, selected }) => {
  return (
    <div
      className={"text-[12px] " + (selected ? "text-white" : "text-textLight")}>
      {text}
    </div>
  );
};

export default SmallLightText;
