import { Button } from "./ui/button";

export function CancelBtn({ onCancel }: { onCancel: () => void }) {
  return (
    <Button variant="outline" onClick={() => onCancel()}>
      Cancel
    </Button>
  );
}
