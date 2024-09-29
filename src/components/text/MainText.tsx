import React from "react";

interface MainTextProps {
  text: string | null;
}

const MainText: React.FC<MainTextProps> = ({ text }) => {
  return <div className="text-[20px] font-[700] font-sans">{text}</div>;
};

export default MainText;
