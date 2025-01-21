import { ReactNode } from "react";

export function GeneralDiv({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(150px,auto)_1fr] py-4">
      <h3>{title}</h3>
      <div className="flex flex-1 flex-col gap-y-3">{children}</div>
    </div>
  );
}
