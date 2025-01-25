import { experienceSchema } from "@/lib/schemas";
import { Experience } from "@/types/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import {
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
import { DynamicAlert } from "./DynamicAlert";
import { AccordionEntry } from "./AccordionEntry";
import { AddBtn } from "./AddBtn";
import { CategorySection } from "./CategorySection";
import { DynamicForm } from "./DynamicForm";

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
    <CategorySection>
      {experiences.map((exp) => {
        return (
          <AccordionEntry
            key={exp.id}
            name={exp.company}
            openEdit={() => openEdit(exp)}
            openDelete={() => openDelete(exp)}
          />
        );
      })}
      {selectedExperience && (
        <DynamicAlert
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
          category="experience"
          subject={selectedExperience.company}
          onCancel={() => setIsAlertDialogOpen(false)}
          onConfirm={() => onDelete(selectedExperience.id)}
        />
      )}
      <DynamicForm<Experience>
        form={form}
        formFields={
          <>
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
          </>
        }
        triggerChildren={
          <AddBtn
            category="experience"
            onClick={() => {
              setSelectedExperience(null);
              form.reset(getEmptyForm());
            }}
          />
        }
        title={`${selectedExperience ? "Edit" : "Add"} Experience`}
        isOpen={isDialogOpen}
        submitBtnText={selectedExperience ? "Save" : "Add"}
        setIsOpen={setIsDialogOpen}
        onSubmit={onSubmit}
      />
    </CategorySection>
  );
}
