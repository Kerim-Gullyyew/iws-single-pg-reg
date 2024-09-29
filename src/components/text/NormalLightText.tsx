import React from "react";

interface NormalLightTextProps {
  text: null | string | number;
}

const NormalLightText: React.FC<NormalLightTextProps> = ({ text }) => {
  return <div className="text-[16px] text-textLight">{text}</div>;
};

export default NormalLightText;
