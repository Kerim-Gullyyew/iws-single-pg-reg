import React from "react";

interface PTextProps {
  text: null | string;
  required?: boolean;
}

const PText: React.FC<PTextProps> = ({ text, required }) => {
  return (
    <p className="text-[15px] font-[400] font-sans flex items-center">
      {text}
      {required && <div className="text-blue pl-1 text-[15px]">*</div>}
    </p>
  );
};

export default PText;
