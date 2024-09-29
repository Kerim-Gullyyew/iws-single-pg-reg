import React from "react";

interface NormalLightInputProps {
  text: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusChange?: (isFocused: boolean) => void;
}

const NormalLightInput: React.FC<NormalLightInputProps> = ({
  text,
  value,
  onChange,
  onFocusChange,
}) => {
  const handleFocus = () => onFocusChange?.(true);
  const handleBlur = () => onFocusChange?.(false);

  return (
    <input
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={onChange}
      className="text-[16px] w-full text-black bg-inputBg focus:outline-none"
      placeholder={text}
      type="text"
    />
  );
};

export default NormalLightInput;
