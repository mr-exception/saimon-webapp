import Key from "core/Key/Key";
import React, { useState } from "react";
import "./styles.css";
const TextField: React.FC<ITextFieldProps> = ({
  label,
  placeHolder,
  value,
  onChange,
  error,
  validations = [],
}: ITextFieldProps) => {
  const [left, set_left] = useState(false);
  const [touched, set_touched] = useState(false);
  let error_text = error;
  if (!error && touched && left) {
    validations.forEach((validation) => {
      if (error_text !== undefined) {
        return;
      }
      if (validation.type === "REQUIRED") {
        if (value === "") {
          error_text = `${label} is required`;
          return;
        }
      }
      if (validation.type === "REGEX") {
        if (!validation.regex.test(value)) {
          error_text = `${label} is invalid`;
          return;
        }
      }
      if (validation.type === "PUBLIC_KEY") {
        if (!Key.isPublicKey(value)) {
          error_text = `${label} is not an invalid public key`;
          return;
        }
      }
    });
  }
  return (
    <div className="text_field">
      <div className="text_field__label">{label}</div>
      <input
        type="text"
        className="text_field__input"
        placeholder={placeHolder}
        value={value}
        onFocus={() => {
          set_touched(true);
        }}
        onBlur={() => {
          set_left(true);
        }}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      {error_text !== undefined ? (
        <div className="text_field__error">{error_text}</div>
      ) : null}
    </div>
  );
};

export default TextField;
