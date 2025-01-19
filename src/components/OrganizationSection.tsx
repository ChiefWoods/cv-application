import { organizationSchema } from "@/lib/schemas";
import { Organization } from "@/types/resume";
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

function getEmptyForm(): Omit<Organization, "id"> {
  return {
    name: "",
    position: "",
    location: "",
    startDate: new Date(),
    endDate: undefined,
    description: "",
  };
}

export function OrganizationSection({
  organizations,
  setOrganizations,
}: {
  organizations: Organization[];
  setOrganizations: Dispatch<SetStateAction<Organization[]>>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);

  const form = useForm<Organization>({
    resolver: zodResolver(organizationSchema),
    defaultValues: selectedOrganization ?? getEmptyForm(),
  });

  function openEdit(organization: Organization) {
    form.reset(organization);
    setSelectedOrganization(organization);
    setIsDialogOpen(true);
  }

  function openDelete(organization: Organization) {
    setSelectedOrganization(organization);
    setIsAlertDialogOpen(true);
  }

  function onSubmit(values: Organization) {
    if (selectedOrganization) {
      setOrganizations((prev) =>
        prev.map((p) => {
          return p.id === selectedOrganization.id
            ? { ...values, id: selectedOrganization.id }
            : p;
        }),
      );
    } else {
      setOrganizations((prev) => [
        ...prev,
        { ...values, id: crypto.randomUUID() },
      ]);
    }

    setIsDialogOpen(false);
    form.reset();
    setSelectedOrganization(null);
  }

  function onDelete(id: string) {
    setOrganizations((prev) => prev.filter((p) => p.id !== id));
    setIsAlertDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4 p-4">
      {organizations.map((org) => {
        return (
          <div
            key={org.id}
            className="flex items-center justify-between gap-x-4"
          >
            <h3>{org.name}</h3>
            <div className="flex gap-x-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(org)}>
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openDelete(org)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        );
      })}
      {selectedOrganization && (
        <AlertDialog
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Organization</AlertDialogTitle>
              <AlertDialogDescription>
                Delete &apos;{selectedOrganization.name}&apos; from
                Organization?
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
                onClick={() => onDelete(selectedOrganization.id)}
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
              setSelectedOrganization(null);
              form.reset(getEmptyForm());
            }}
          >
            <Plus />
            Add Organization
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
                  {selectedOrganization ? "Edit" : "Add"} Organization
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
                name="position"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DurationFormField<Organization> form={form} />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                  {selectedOrganization ? "Edit" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
