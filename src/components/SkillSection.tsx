import { skillSchema } from "@/lib/schemas";
import { Skill } from "@/types/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { setResume } from "@/lib/storage";
import { CancelBtn } from "./CancelBtn";
import { AccordionEntry } from "./AccordionEntry";
import { DeleteAlert } from "./DeleteAlert";
import { AddBtn } from "./AddBtn";

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
    <div className="flex flex-col gap-y-4 px-4">
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
        <DeleteAlert
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
          type="skill"
          subject={selectedSkill.name}
          onCancel={() => setIsAlertDialogOpen(false)}
          onConfirm={() => onDelete(selectedSkill.id)}
        />
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <AddBtn
            category="skill"
            onClick={() => {
              setSelectedSkill(null);
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
                <DialogTitle>Add Skill</DialogTitle>
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
              <DialogFooter className="mt-2">
                <DialogClose asChild>
                  <CancelBtn onCancel={() => form.reset()} />
                </DialogClose>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
