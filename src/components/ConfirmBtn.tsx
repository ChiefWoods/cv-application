import { Button } from "./ui/button";

export function ConfirmBtn({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Button variant="destructive" onClick={() => onConfirm()}>
      Confirm
    </Button>
  );
}
