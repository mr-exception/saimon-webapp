import React, { CSSProperties } from "react";
import Typography from "Ui-Kit/Typography/Typography";
interface IProps {
  style: CSSProperties;
  value?: string;
  onChange?: (value: string) => void;
  label: string;
  error?: string;
}
const TextInput: React.FC<IProps> = ({ style, value, label }: IProps) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <Typography variant="body1">{label}</Typography>
      </div>
      <div className="col-md-12">
        <Typography variant="body1">{label}</Typography>
      </div>
    </div>
  );
};

export default TextInput;
