import { EditBtn } from "./EditBtn";
import { DeleteBtn } from "./DeleteBtn";

export function AccordionEntry({
  name,
  openEdit = undefined,
  openDelete,
}: {
  name: string;
  openEdit?: () => void;
  openDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <h3>{name}</h3>
      <div className="flex gap-x-2">
        {openEdit && <EditBtn onEdit={openEdit} />}
        <DeleteBtn onDelete={openDelete} />
      </div>
    </div>
  );
}
