import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-neutral-50 group-[.toaster]:text-neutral-950 group-[.toaster]:border-neutral-300 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-neutral-600",
          actionButton: "group-[.toast]:bg-primary-500 group-[.toast]:text-neutral-50",
          cancelButton: "group-[.toast]:bg-neutral-200 group-[.toast]:text-neutral-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
