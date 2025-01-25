import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { personalSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Personal } from "@/types/resume";
import { setResume } from "@/lib/storage";
import { DynamicForm } from "./DynamicForm";
import { EditBtn } from "./EditBtn";

export function PersonalSection({
  personal,
  setPersonal,
}: {
  personal: Personal;
  setPersonal: (personal: Personal) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<Personal>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      name: personal.name,
      email: personal.email,
      phone: personal.phone,
      address: personal.address,
    },
  });

  function openEdit() {
    form.reset(personal);
    setIsOpen(true);
  }

  function onSubmit(values: Personal) {
    setPersonal(values);
    setResume("personal", values);
    setIsOpen(false);
    form.reset();
  }

  return (
    <DynamicForm<Personal>
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
          <div className="flex gap-x-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      }
      triggerChildren={<EditBtn onEdit={openEdit} />}
      title="Edit Personal"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSubmit={onSubmit}
    />
  );
}
