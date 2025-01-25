import { educationSchema } from "@/lib/schemas";
import { Education } from "@/types/resume";
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
import { DynamicForm } from "./DynamicForm";
import { CategorySection } from "./CategorySection";

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
    <CategorySection>
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
        <DynamicAlert
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
          category="education"
          subject={selectedEducation.school}
          onCancel={() => setIsAlertDialogOpen(false)}
          onConfirm={() => onDelete(selectedEducation.id)}
        />
      )}
      <DynamicForm<Education>
        form={form}
        formFields={
          <>
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
          </>
        }
        triggerChildren={
          <AddBtn
            category="education"
            onClick={() => {
              setSelectedEducation(null);
              form.reset(getEmptyForm());
            }}
          />
        }
        title={`${selectedEducation ? "Edit" : "Add"} Education`}
        isOpen={isDialogOpen}
        submitBtnText={selectedEducation ? "Save" : "Add"}
        setIsOpen={setIsDialogOpen}
        onSubmit={onSubmit}
      />
    </CategorySection>
  );
}
