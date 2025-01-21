import { formatMonthYear } from "@/lib/utils";

export function DateP({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate?: Date | null;
}) {
  return (
    <p className="font-semibold">
      {formatMonthYear(startDate)} -{" "}
      {endDate ? formatMonthYear(endDate) : "Present"}
    </p>
  );
}
