import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";

export function AddBtn({
  type,
  onClick,
}: {
  type: string;
  onClick: () => void;
}) {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      <Plus />
      Add {capitalizeFirstLetter(type)}
    </Button>
  );
}
