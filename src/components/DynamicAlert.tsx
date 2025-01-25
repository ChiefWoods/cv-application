import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ConfirmBtn } from "./ConfirmBtn";
import { CancelBtn } from "./CancelBtn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

export function DynamicAlert({
  open,
  onOpenChange,
  category,
  subject,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  subject: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const capitalizedCategory = capitalizeFirstLetter(category);
  const isDesktop = useMediaQuery();

  const Container = isDesktop ? AlertDialog : Drawer;
  const Content = isDesktop ? AlertDialogContent : DrawerContent;
  const Header = isDesktop ? AlertDialogHeader : DrawerHeader;
  const Title = isDesktop ? AlertDialogTitle : DrawerTitle;
  const Description = isDesktop ? AlertDialogDescription : DrawerDescription;
  const Footer = isDesktop ? AlertDialogFooter : DrawerFooter;

  return (
    <Container open={open} onOpenChange={onOpenChange}>
      <Content>
        <Header>
          <Title className="text-start">Delete {capitalizedCategory}</Title>
          <Description className="text-start">
            Delete &apos;{subject}&apos; from {capitalizedCategory}?
          </Description>
        </Header>
        <Footer className="flex-col-reverse gap-y-2">
          <CancelBtn onCancel={onCancel} />
          <ConfirmBtn onConfirm={onConfirm} />
        </Footer>
      </Content>
    </Container>
  );
}
