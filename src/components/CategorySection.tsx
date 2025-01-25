import { ReactNode } from "react";

export function CategorySection({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-y-4 px-4">{children}</div>;
}
