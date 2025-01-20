import { skillSchema } from "@/lib/schemas";
import { Skill } from "@/types/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
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
import { Plus, Trash2 } from "lucide-react";
import { setResume } from "@/lib/storage";

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
    <div className="flex flex-col gap-y-4 p-4">
      {skills.map((skill) => {
        return (
          <div
            key={skill.id}
            className="flex items-center justify-between gap-x-4"
          >
            <h3>{skill.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openDelete(skill)}
            >
              <Trash2 />
            </Button>
          </div>
        );
      })}
      {selectedSkill && (
        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Skill</AlertDialogTitle>
              <AlertDialogDescription>
                Delete &apos;{selectedSkill.name}&apos; from Skill?
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
                onClick={() => onDelete(selectedSkill.id)}
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
              setSelectedSkill(null);
              form.reset(getEmptyForm());
            }}
          >
            <Plus />
            Add Skill
          </Button>
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
                  <Button
                    variant="secondary"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
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
