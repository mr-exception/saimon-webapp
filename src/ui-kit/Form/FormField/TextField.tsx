import React from "react";
import "./styles.css";
const TextField: React.FC<ITextFieldProps> = ({
  label,
  placeHolder,
  value,
  onChange,
}: ITextFieldProps) => {
  return (
    <div className="text_field">
      <div className="text_field__label">{label}</div>
      <input
        type="text"
        className="text_field__input"
        placeholder={placeHolder}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

export default TextField;
