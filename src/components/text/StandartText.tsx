import React from "react";

interface StandartTextProps {
  text: string | null;
}

const StandartText: React.FC<StandartTextProps> = ({ text }) => {
  return <div className="font-sans text-[16px] font-[400]">{text}</div>;
};

export default StandartText;
