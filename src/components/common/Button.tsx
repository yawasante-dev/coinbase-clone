import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  to?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  to: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-border text-foreground hover:bg-secondary",
  ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-xs",
  default: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-[14px]",
};

const Button = ({ variant = "primary", size = "default", fullWidth = false, className, children, ...props }: ButtonProps) => {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition-colors",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  const { to, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
