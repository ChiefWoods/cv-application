import { ReactNode } from "react";

export function Entry({
  header,
  subtitle,
  date,
  description,
}: {
  header: string;
  subtitle: string;
  date: ReactNode;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-col flex-wrap justify-between gap-1 sm:flex-row">
        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold">{header}</h4>
          <p>{subtitle}</p>
        </div>
        {date}
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
