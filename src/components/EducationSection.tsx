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
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { setResume } from "@/lib/storage";

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
    <div className="flex flex-col gap-y-4 p-4">
      {educations.map((edu) => {
        return (
          <div
            key={edu.id}
            className="flex items-center justify-between gap-x-4"
          >
            <h3>{edu.school}</h3>
            <div className="flex gap-x-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(edu)}>
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openDelete(edu)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        );
      })}
      {selectedEducation && (
        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Education</AlertDialogTitle>
              <AlertDialogDescription>
                Delete &apos;{selectedEducation.school}&apos; from Education?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAlertDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete(selectedEducation.id)}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedEducation(null);
              form.reset(getEmptyForm());
            }}
          >
            <Plus />
            Add Education
          </Button>
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
              <DialogFooter className="mt-2">
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
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
