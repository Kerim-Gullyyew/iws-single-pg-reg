import React, { useState, MouseEventHandler, ReactElement } from "react";
interface FormLayoutProps {
  children: ReactElement;
  selected?: boolean;
  isInput?: boolean;
  isError?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  onClick,
  selected,
  isInput,
  isError,
}) => {
  const [animate, setAnimate] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const child = React.Children.only(children) as ReactElement;

  const handleOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClick) {
      onClick(e);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 200);
    }
  };

  return (
    <div
      onClick={handleOnClick}
      className={
        `${animate ? "animate-fade-in " : ""}` +
        `${onClick ? "cursor-pointer " : ""}` +
        "shadow-[inset_0_0_0_1px_#E6E6E6] p-4 rounded-lg px-4 py-3 min-w-[104px] " +
        `${
          selected
            ? "bg-blue text-white duration-250 transition-all "
            : "bg-inputBg "
        } ` +
        `${isInput && isFocused ? "shadow-[inset_0_0_0_1px_#4366F6] " : ""}` +
        `${isError && "shadow-[inset_0_0_0_1px_#EF4444] "}` +
        `${!selected && onClick ? " hover:bg-gray-200 " : ""}`
      }>
      {React.cloneElement(child, { onFocusChange: setIsFocused })}
    </div>
  );
};

export default FormLayout;
