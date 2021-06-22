interface ITextFieldProps {
  value: string;
  onChange: (string) => void;
  label: string;
  placeHolder: string;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
  validations?: (
    | { type: "REQUIRED" }
    | { type: "PUBLIC_KEY" }
    | { type: "REGEX"; regex: RegExp }
  )[];
  max_lines?: number;
}
