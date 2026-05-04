import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, id, className, ...props }: InputProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring placeholder:text-muted-foreground focus:border-primary focus:ring-2",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
