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
  max_lines = 1,
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
  if (max_lines === 1) {
    return (
      <div className="text_field flex flex-col mt-2">
        <div className="text_field__label flex flex-col">{label}</div>
        <input
          type="text"
          className="text_field__input border-2 rounded-md border-secondary p-4"
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
          <div className="text_field__error flex flex-row justify-start text-danger">
            {error_text}
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="text_field flex flex-col mt-2">
        <div className="text_field__label flex flex-col">{label}</div>
        <textarea
          className="text_field__input border-2 rounded-md border-secondary p-4"
          placeholder={placeHolder}
          style={{ minHeight: max_lines * 18 }}
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
          <div className="text_field__error flex flex-row justify-start text-danger">
            {error_text}
          </div>
        ) : null}
      </div>
    );
  }
};

export default TextField;
