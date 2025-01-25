import { organizationSchema } from "@/lib/schemas";
import { Organization } from "@/types/resume";
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
    <CategorySection>
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
        <DynamicAlert
          open={isAlertDialogOpen}
          onOpenChange={setIsAlertDialogOpen}
          category="organization"
          subject={selectedOrganization.name}
          onCancel={() => setIsAlertDialogOpen(false)}
          onConfirm={() => onDelete(selectedOrganization.id)}
        />
      )}
      <DynamicForm<Organization>
        form={form}
        formFields={
          <>
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
          </>
        }
        triggerChildren={
          <AddBtn
            category="organization"
            onClick={() => {
              setSelectedOrganization(null);
              form.reset(getEmptyForm());
            }}
          />
        }
        title={`${selectedOrganization ? "Edit" : "Add"} Organization`}
        isOpen={isDialogOpen}
        submitBtnText={selectedOrganization ? "Save" : "Add"}
        setIsOpen={setIsDialogOpen}
        onSubmit={onSubmit}
      />
    </CategorySection>
  );
}
