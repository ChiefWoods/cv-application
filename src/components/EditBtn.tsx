import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface EditBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onEdit: () => void;
}

export const EditBtn = forwardRef<HTMLButtonElement, EditBtnProps>(
  ({ onEdit, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={() => onEdit()}
        {...props}
      >
        <Pencil />
      </Button>
    );
  },
);

EditBtn.displayName = "EditBtn";
