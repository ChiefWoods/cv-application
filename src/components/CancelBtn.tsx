import { Button } from "./ui/button";

export function CancelBtn({ onCancel }: { onCancel: () => void }) {
  return (
    <Button variant="secondary" onClick={() => onCancel()}>
      Cancel
    </Button>
  );
}
