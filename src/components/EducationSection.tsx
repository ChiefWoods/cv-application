import { educationSchema } from "@/lib/schemas";
import { Education } from "@/types/resume";
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
import { DurationFormField } from "./DurationFormField";
import { setResume } from "@/lib/storage";
import { CancelBtn } from "./CancelBtn";
import { DeleteAlert } from "./DeleteAlert";
import { AccordionEntry } from "./AccordionEntry";
import { AddBtn } from "./AddBtn";

function getEmptyForm(): Omit<Education, "id"> {
  return {
    school: "",
    title: "",
    startDate: new Date(),
    endDate: undefined,
    description: "",
  };
}

export function EducationSection({
  educations,
  setEducations,
}: {
  educations: Education[];
  setEducations: Dispatch<SetStateAction<Education[]>>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(
    null,
  );

  const form = useForm<Education>({
    resolver: zodResolver(educationSchema),
    defaultValues: selectedEducation ?? getEmptyForm(),
  });

  function openEdit(education: Education) {
    form.reset(education);
    setSelectedEducation(education);
    setIsDialogOpen(true);
  }

  function openDelete(education: Education) {
    setSelectedEducation(education);
    setIsAlertDialogOpen(true);
  }

  function onSubmit(values: Education) {
    if (selectedEducation) {
      setEducations((prev) => {
        const newEducations = prev.map((p) => {
          return p.id === selectedEducation.id
            ? { ...values, id: selectedEducation.id }
            : p;
        });

        setResume("educations", newEducations);
        return newEducations;
      });
    } else {
      setEducations((prev) => {
        const newEducations = [...prev, { ...values, id: crypto.randomUUID() }];

        setResume("educations", newEducations);
        return newEducations;
      });
    }

    setIsDialogOpen(false);
    form.reset();
    setSelectedEducation(null);
  }

  function onDelete(id: string) {
    setEducations((prev) => {
      const newEducations = prev.filter((edu) => edu.id !== id);

      setResume("educations", newEducations);
      return newEducations;
    });
    setIsAlertDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4 px-4">
      {educations.map((edu) => {
        return (
          <AccordionEntry
            key={edu.id}
            name={edu.school}
            openEdit={() => openEdit(edu)}
            openDelete={() => openDelete(edu)}
          />
        );
      })}
      {selectedEducation && (
        <DeleteAlert
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
          type="education"
          subject={selectedEducation.school}
          onCancel={() => setIsAlertDialogOpen(false)}
          onConfirm={() => onDelete(selectedEducation.id)}
        />
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <AddBtn
            category="education"
            onClick={() => {
              setSelectedEducation(null);
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
                  {selectedEducation ? "Edit" : "Add"} Education
                </DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DurationFormField<Education> form={form} />
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
              <DialogFooter className="mt-2 gap-2">
                <DialogClose asChild>
                  <CancelBtn onCancel={() => form.reset()} />
                </DialogClose>
                <Button type="submit">
                  {selectedEducation ? "Edit" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
