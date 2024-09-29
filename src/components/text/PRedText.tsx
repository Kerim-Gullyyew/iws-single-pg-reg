import React from "react";

interface PRedTextProps {
  text: null | string;
}

const PRedText: React.FC<PRedTextProps> = ({ text }) => {
  return (
    <p className="text-[15px] text-red-500 font-[400] font-sans flex items-center">
      {text}
    </p>
  );
};

export default PRedText;
