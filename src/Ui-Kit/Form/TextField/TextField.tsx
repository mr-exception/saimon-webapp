import Key from "Utils/Key";
import React, { CSSProperties, useState } from "react";
import Styles from "./styles.module.css";
interface ITextFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeHolder: string;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
  validations?: ({ type: "REQUIRED" } | { type: "PUBLIC_KEY" } | { type: "REGEX"; regex: RegExp })[];
  max_lines?: number;
  styles?: CSSProperties;
}

const TextField: React.FC<ITextFieldProps> = ({ label, placeHolder, value, onChange, error, validations = [], max_lines = 1, styles = {} }: ITextFieldProps) => {
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
      <div className="row p-2" style={styles}>
        <div className="col-md-12 mb-2 capitalize">{label}</div>
        <div className="col-md-12 mb-2">
          <input
            type="text"
            placeholder={placeHolder}
            className={Styles.input}
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
        </div>
        <div className={Styles.error + " col-md-12"}>{error_text}</div>
      </div>
    );
  } else {
    return (
      <div className="row p-2" style={styles}>
        <div className="col-md-12 mb-2 capitalize">{label}</div>
        <div className="col-md-12 mb-2">
          <textarea
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
        </div>
        <div className={Styles.error + " col-md-12"}>{error_text}</div>
      </div>
    );
  }
};

export default TextField;
