import { skillSchema } from "@/lib/schemas";
import { Skill } from "@/types/resume";
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
import { setResume } from "@/lib/storage";
import { AccordionEntry } from "./AccordionEntry";
import { DynamicAlert } from "./DynamicAlert";
import { AddBtn } from "./AddBtn";
import { DynamicForm } from "./DynamicForm";
import { CategorySection } from "./CategorySection";

function getEmptyForm(): Omit<Skill, "id"> {
  return {
    name: "",
  };
}

export function SkillSection({
  skills,
  setSkills,
}: {
  skills: Skill[];
  setSkills: Dispatch<SetStateAction<Skill[]>>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const form = useForm<Skill>({
    resolver: zodResolver(skillSchema),
    defaultValues: selectedSkill ?? getEmptyForm(),
  });

  function openDelete(skill: Skill) {
    setSelectedSkill(skill);
    setIsAlertDialogOpen(true);
  }

  function onSubmit(values: Skill) {
    setSkills((prev) => {
      const newSkills = [...prev, { ...values, id: crypto.randomUUID() }];

      setResume("skills", newSkills);
      return newSkills;
    });
    setIsDialogOpen(false);
    form.reset();
    setSelectedSkill(null);
  }

  function onDelete(id: string) {
    setSkills((prev) => {
      const newSkills = prev.filter((p) => p.id !== id);

      setResume("skills", newSkills);
      return newSkills;
    });
    setIsAlertDialogOpen(false);
  }

  return (
    <CategorySection>
      {skills.map((skill) => {
        return (
          <AccordionEntry
            key={skill.id}
            name={skill.name}
            openDelete={() => openDelete(skill)}
          />
        );
      })}
      {selectedSkill && (
        <DynamicAlert
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
          category="skill"
          subject={selectedSkill.name}
          onCancel={() => setIsAlertDialogOpen(false)}
          onConfirm={() => onDelete(selectedSkill.id)}
        />
      )}
      <DynamicForm<Skill>
        form={form}
        formFields={
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
        }
        triggerChildren={
          <AddBtn
            category="skill"
            onClick={() => {
              setSelectedSkill(null);
              form.reset(getEmptyForm());
            }}
          />
        }
        title={`${selectedSkill ? "Edit" : "Add"} Skill`}
        isOpen={isDialogOpen}
        submitBtnText={selectedSkill ? "Save" : "Add"}
        setIsOpen={setIsDialogOpen}
        onSubmit={onSubmit}
      />
    </CategorySection>
  );
}
