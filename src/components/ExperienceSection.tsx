import { experienceSchema } from "@/lib/schemas";
import { Experience } from "@/types/resume";
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

function getEmptyForm(): Omit<Experience, "id"> {
  return {
    company: "",
    title: "",
    startDate: new Date(),
    endDate: undefined,
    description: "",
  };
}

export function ExperienceSection({
  experiences,
  setExperiences,
}: {
  experiences: Experience[];
  setExperiences: Dispatch<SetStateAction<Experience[]>>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  const form = useForm<Experience>({
    resolver: zodResolver(experienceSchema),
    defaultValues: selectedExperience ?? getEmptyForm(),
  });

  function openEdit(experience: Experience) {
    form.reset(experience);
    setSelectedExperience(experience);
    setIsDialogOpen(true);
  }

  function openDelete(experience: Experience) {
    setSelectedExperience(experience);
    setIsAlertDialogOpen(true);
  }

  function onSubmit(values: Experience) {
    if (selectedExperience) {
      setExperiences((prev) => {
        const newExperiences = prev.map((p) => {
          return p.id === selectedExperience.id
            ? { ...values, id: selectedExperience.id }
            : p;
        });

        setResume("experiences", newExperiences);
        return newExperiences;
      });
    } else {
      setExperiences((prev) => {
        const newExperiences = [
          ...prev,
          { ...values, id: crypto.randomUUID() },
        ];

        setResume("experiences", newExperiences);
        return newExperiences;
      });
    }

    setIsDialogOpen(false);
    form.reset();
    setSelectedExperience(null);
  }

  function onDelete(id: string) {
    setExperiences((prev) => {
      const newExperiences = prev.filter((p) => p.id !== id);

      setResume("experiences", newExperiences);
      return newExperiences;
    });
    setIsAlertDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4 p-4">
      {experiences.map((exp) => {
        return (
          <div
            key={exp.id}
            className="flex items-center justify-between gap-x-4"
          >
            <h3>{exp.company}</h3>
            <div className="flex gap-x-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(exp)}>
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openDelete(exp)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        );
      })}
      {selectedExperience && (
        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Experience</AlertDialogTitle>
              <AlertDialogDescription>
                Delete &apos;{selectedExperience.company}&apos; from Experience?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsAlertDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete(selectedExperience.id)}
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
              setSelectedExperience(null);
              form.reset(getEmptyForm());
            }}
          >
            <Plus />
            Add Experience
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
                  {selectedExperience ? "Edit" : "Add"} Experience
                </DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
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
              <DurationFormField<Experience> form={form} />
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
                  {selectedExperience ? "Edit" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
