import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export function DownloadBtn({ onClick }: { onClick: () => void }) {
  const isDesktop = useMediaQuery();

  return (
    <Button
      variant="outline"
      className={cn(
        "fixed aspect-square size-fit rounded-full text-blue-500 [&_svg]:size-6",
        isDesktop ? "right-3 top-3 z-[2]" : "bottom-4 right-4",
      )}
      onClick={() => onClick()}
    >
      <Download />
    </Button>
  );
}
