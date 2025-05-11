import { useState } from "react";

import TimePicker from "@/components/time-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

type TimerDialogProps = Required<Pick<DialogProps, "open" | "onOpenChange">> & {
  variant?: "add" | "edit";
  defaultSeconds?: number;
  onSubmit: (seconds: number) => void;
};

export function TimerDialog({
  open,
  onOpenChange,
  variant = "add",
  defaultSeconds = 0,
  onSubmit,
}: TimerDialogProps) {
  const [seconds, setSeconds] = useState(defaultSeconds);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant === "add" ? "添加计时器" : "编辑计时器"}
          </DialogTitle>
        </DialogHeader>
        <TimePicker seconds={seconds} onSecondsChange={setSeconds} />
        <DialogFooter>
          <DialogClose>取消</DialogClose>
          <Button
            onClick={() => {
              onSubmit(seconds);
              onOpenChange(false);
            }}
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const useTimerDialog = () => {
  const [open, setOpen] = useState(false);

  return {
    TimerDialog: ({
      variant,
      defaultSeconds,
      onSubmit,
    }: Pick<TimerDialogProps, "variant" | "defaultSeconds" | "onSubmit">) => (
      <TimerDialog
        open={open}
        onOpenChange={setOpen}
        variant={variant}
        defaultSeconds={defaultSeconds}
        onSubmit={onSubmit}
      />
    ),
    openTimerDialog: () => setOpen(true),
  };
};
