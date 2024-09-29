import React from "react";

interface NormalBoldTextProps {
  text: null | string;
  link?: boolean;
}

const NormalBoldText: React.FC<NormalBoldTextProps> = ({ text, link }) => {
  return (
    <div
      className={
        "font-sans text-[16px] font-[700] " +
        (link && "cursor-pointer hover:underline hover:underline-offset-4")
      }>
      {text}
    </div>
  );
};

export default NormalBoldText;
