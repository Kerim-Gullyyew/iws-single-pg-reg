import React from "react";

interface HeaderTextProps {}

const HeaderText: React.FC<HeaderTextProps> = ({}) => {
  return (
    <div className="text-[40px] font-bold font-sans leading-10 max-w-2xl">
      Enrol your child at IWS Online school Academic Year 2024-2025
    </div>
  );
};

export default HeaderText;
