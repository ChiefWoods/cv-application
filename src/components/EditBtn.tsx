import { Pencil } from "lucide-react";
import { Button } from "./ui/button";

export function EditBtn({ onEdit }: { onEdit: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={() => onEdit()}>
      <Pencil />
    </Button>
  );
}
