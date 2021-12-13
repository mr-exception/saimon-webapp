interface IMenuItemProps {
  IconComponent: React.FC;
  onClick: () => void;
  caption: string;
  isActive: boolean;
}
