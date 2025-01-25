import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface AddBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  category: string;
  onClick: () => void;
}

export const AddBtn = forwardRef<HTMLButtonElement, AddBtnProps>(
  ({ category, onClick, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="sm"
        onClick={onClick}
        {...props}
      >
        <Plus />
        Add {capitalizeFirstLetter(category)}
      </Button>
    );
  },
);

AddBtn.displayName = "AddBtn";
