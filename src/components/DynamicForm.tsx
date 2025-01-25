import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Form } from "./ui/form";
import { CancelBtn } from "./CancelBtn";
import { Button } from "./ui/button";

export function DynamicForm<T extends FieldValues>({
  form,
  formFields,
  triggerChildren,
  title,
  isOpen,
  submitBtnText = "Save",
  setIsOpen,
  onSubmit,
}: {
  form: UseFormReturn<T, object, undefined>;
  formFields: ReactNode;
  triggerChildren: ReactNode;
  title: string;
  isOpen: boolean;
  submitBtnText?: string;
  setIsOpen: (open: boolean) => void;
  onSubmit: (values: T) => void;
}) {
  const isDesktop = useMediaQuery();

  const Container = isDesktop ? Dialog : Drawer;
  const Trigger = isDesktop ? DialogTrigger : DrawerTrigger;
  const Content = isDesktop ? DialogContent : DrawerContent;
  const Title = isDesktop ? DialogTitle : DrawerTitle;
  const Header = isDesktop ? DialogHeader : DrawerHeader;
  const Footer = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <Container open={isOpen} onOpenChange={setIsOpen}>
      <Trigger asChild>{triggerChildren}</Trigger>
      <Content className="max-h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2 overflow-y-auto sm:gap-y-4"
          >
            <Header>
              <Title className="text-start">{title}</Title>
            </Header>
            <section className="flex flex-col gap-y-2 overflow-y-auto px-4 sm:px-0">
              {formFields}
            </section>
            <Footer className="mt-2 flex-col-reverse gap-y-2">
              <CancelBtn
                onCancel={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              />
              <Button type="submit">{submitBtnText}</Button>
            </Footer>
          </form>
        </Form>
      </Content>
    </Container>
  );
}
