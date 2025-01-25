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
      setOrganizations((prev) => {
        const newOrganizations = prev.map((p) => {
          return p.id === selectedOrganization.id
            ? { ...values, id: selectedOrganization.id }
            : p;
        });

        setResume("organizations", newOrganizations);
        return newOrganizations;
      });
    } else {
      setOrganizations((prev) => {
        const newOrganizations = [
          ...prev,
          { ...values, id: crypto.randomUUID() },
        ];

        setResume("organizations", newOrganizations);
        return newOrganizations;
      });
    }

    setIsDialogOpen(false);
    form.reset();
    setSelectedOrganization(null);
  }

  function onDelete(id: string) {
    setOrganizations((prev) => {
      const newOrganizations = prev.filter((p) => p.id !== id);

      setResume("organizations", newOrganizations);
      return newOrganizations;
    });
    setIsAlertDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-4 px-4">
      {organizations.map((org) => {
        return (
          <AccordionEntry
            key={org.id}
            name={org.name}
            openEdit={() => openEdit(org)}
            openDelete={() => openDelete(org)}
          />
        );
      })}
      {selectedOrganization && (
        <DeleteAlert
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
          type="organization"
          subject={selectedOrganization.name}
          onCancel={() => setIsAlertDialogOpen(false)}
          onConfirm={() => onDelete(selectedOrganization.id)}
        />
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <AddBtn
            category="organization"
            onClick={() => {
              setSelectedOrganization(null);
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
                  <FormItem>
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
