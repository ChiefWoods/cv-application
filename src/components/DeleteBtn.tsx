import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function DeleteBtn({ onDelete }: { onDelete: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={() => onDelete()}>
      <Trash2 />
    </Button>
  );
}
