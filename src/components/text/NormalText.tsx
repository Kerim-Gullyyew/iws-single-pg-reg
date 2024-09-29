import React from "react";

interface NormalTextProps {
  text: string | null;
}

const NormalText: React.FC<NormalTextProps> = ({ text }) => {
  return <div className="font-sans text-[16px] font-[600]">{text}</div>;
};

export default NormalText;
