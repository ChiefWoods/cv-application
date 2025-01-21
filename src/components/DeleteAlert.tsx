import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ConfirmBtn } from "./ConfirmBtn";
import { CancelBtn } from "./CancelBtn";

export function DeleteAlert({
  open,
  onOpenChange,
  type,
  subject,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
  subject: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const capitalizedType = capitalizeFirstLetter(type);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {capitalizedType}</AlertDialogTitle>
          <AlertDialogDescription>
            Delete &apos;{subject}&apos; from {capitalizedType}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <CancelBtn onCancel={onCancel} />
          <ConfirmBtn onConfirm={onConfirm} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
