import { useId, useState } from "react";
import { DatePicker } from "./ui/date-picker";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export function DurationFormField<T extends FieldValues>({
  form,
}: {
  form: UseFormReturn<T>;
}) {
  const [isOngoing, setIsOngoing] = useState<boolean>(
    !form.getValues("endDate" as Path<T>),
  );
  const checkboxId = useId();

  return (
    <div className="flex gap-x-2">
      <FormField
        control={form.control}
        name={"startDate" as Path<T>}
        render={({ field }) => (
          <FormItem className="flex flex-1 flex-col gap-y-2">
            <FormLabel className="mt-1">Start Date</FormLabel>
            <FormControl>
              <DatePicker date={field.value} setDate={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"endDate" as Path<T>}
        render={({ field }) => (
          <FormItem className="flex flex-1 flex-col gap-y-2">
            <FormLabel className="mt-1">End Date</FormLabel>
            <FormControl>
              <div className="flex flex-col gap-y-2">
                <DatePicker
                  date={field.value ?? undefined}
                  setDate={field.onChange}
                  disabled={isOngoing}
                  disabledDates={(date) => {
                    const startDate = form.watch(
                      "startDate" as Path<T>,
                    ) as Date;
                    return startDate ? date < startDate : false;
                  }}
                />
                <fieldset className="flex items-center gap-x-2">
                  <Checkbox
                    id={checkboxId}
                    checked={isOngoing}
                    onCheckedChange={(checked) => {
                      setIsOngoing(checked as boolean);
                      if (checked) {
                        field.onChange(undefined);
                      }
                    }}
                  />
                  <Label htmlFor={checkboxId}>Ongoing</Label>
                </fieldset>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
