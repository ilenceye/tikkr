import { Button, ButtonVariantsProps } from "@/components/ui/button";
import type { CountdownStatus } from "@/hooks/use-countdown";
import { CheckIcon, PlayIcon, RotateCcwIcon } from "lucide-react";

type ButtonProps = {
  variant: ButtonVariantsProps["variant"];
  onClick: () => void;
  children: React.ReactNode;
};

export function CountdownActions({
  status,
  onStart,
  onReset,
}: {
  status: CountdownStatus;
  onStart: () => void;
  onReset: () => void;
}) {
  const buttonPropsMap: Record<CountdownStatus, ButtonProps> = {
    idle: {
      variant: "default",
      onClick: onStart,
      children: (
        <>
          <PlayIcon className="mr-2 h-4 w-4" /> 开始
        </>
      ),
    },
    running: {
      variant: "outline",
      onClick: onReset,
      children: (
        <>
          <RotateCcwIcon className="mr-2 h-4 w-4" /> 重置
        </>
      ),
    },
    completed: {
      variant: "outline",
      onClick: onReset,
      children: (
        <>
          <CheckIcon className="mr-2 h-4 w-4" /> 知道了
        </>
      ),
    },
  };

  const { variant, onClick, children } = buttonPropsMap[status];

  return (
    <Button
      variant={variant}
      className="w-full cursor-pointer"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
