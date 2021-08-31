export interface IButtonProps {
  onClick: () => void;
  caption: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "warning" | "danger";
  className?: string;
  minWidth?: number;
}
