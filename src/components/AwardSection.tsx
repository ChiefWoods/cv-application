import { awardSchema } from "@/lib/schemas";
import { Award } from "@/types/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DatePicker } from "./ui/date-picker";
import { setResume } from "@/lib/storage";
import { CancelBtn } from "./CancelBtn";
import { DeleteAlert } from "./DeleteAlert";
import { AccordionEntry } from "./AccordionEntry";
import { AddBtn } from "./AddBtn";

function getEmptyForm(): Omit<Award, "id"> {
  return {
    name: "",
    organization: "",
    date: new Date(),
    description: "",
  };
}

export function AwardSection({
  awards,
  setAwards,
}: {
  awards: Award[];
  setAwards: Dispatch<SetStateAction<Award[]>>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  const form = useForm<Award>({
    resolver: zodResolver(awardSchema),
    defaultValues: selectedAward ?? getEmptyForm(),
  });

  function openEdit(award: Award) {
    form.reset(award);
    setSelectedAward(award);
    setIsDialogOpen(true);
  }

  function openDelete(award: Award) {
    setSelectedAward(award);
    setIsAlertDialogOpen(true);
  }

  function onSubmit(values: Award) {
    if (selectedAward) {
      setAwards((prev) => {
        const newAwards = prev.map((p) => {
          return p.id === selectedAward.id
            ? { ...values, id: selectedAward.id }
            : p;
        });

        setResume("awards", newAwards);
        return newAwards;
      });
    } else {
      setAwards((prev) => {
        const newAwards = [...prev, { ...values, id: crypto.randomUUID() }];

        setResume("awards", newAwards);
        return newAwards;
      });
    }

    setIsDialogOpen(false);
    form.reset();
    setSelectedAward(null);
  }

  function onDelete(id: string) {
    setAwards((prev) => {
      const newAwards = prev.filter((p) => p.id !== id);

      setResume("awards", newAwards);
      return newAwards;
    });
    setIsAlertDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4 px-4">
      {awards.map((award) => {
        return (
          <AccordionEntry
            key={award.id}
            name={award.name}
            openEdit={() => openEdit(award)}
            openDelete={() => openDelete(award)}
          />
        );
      })}
      {selectedAward && (
        <DeleteAlert
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
          type="award"
          subject={selectedAward.name}
          onCancel={() => setIsAlertDialogOpen(false)}
          onConfirm={() => onDelete(selectedAward.id)}
        />
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <AddBtn
            type="award"
            onClick={() => {
              setSelectedAward(null);
              form.reset(getEmptyForm());
            }}
          />
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-2"
            >
              <DialogHeader>
                <DialogTitle>
                  {selectedAward ? "Edit" : "Add"} Award
                </DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col gap-y-2">
                    <FormLabel className="mt-1">Date</FormLabel>
                    <FormControl>
                      <DatePicker date={field.value} setDate={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-2">
                <DialogClose asChild>
                  <CancelBtn onCancel={() => form.reset()} />
                </DialogClose>
                <Button type="submit">{selectedAward ? "Edit" : "Add"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
