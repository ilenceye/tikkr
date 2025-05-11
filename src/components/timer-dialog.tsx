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
  onTimerAdd: (seconds: number) => void;
};

export function TimerDialog({
  open,
  onOpenChange,
  onTimerAdd,
}: TimerDialogProps) {
  const [seconds, setSeconds] = useState(0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>添加计时器</DialogTitle>
        </DialogHeader>
        <TimePicker seconds={seconds} onSecondsChange={setSeconds} />
        <DialogFooter>
          <DialogClose>取消</DialogClose>
          <Button
            onClick={() => {
              onTimerAdd(seconds);
              onOpenChange(false);
            }}
          >
            添加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const useTimerDialog = () => {
  const [open, setOpen] = useState(false);

  return {
    TimerDialog: ({ onTimerAdd }: Pick<TimerDialogProps, "onTimerAdd">) => (
      <TimerDialog open={open} onOpenChange={setOpen} onTimerAdd={onTimerAdd} />
    ),
    openTimerDialog: () => setOpen(true),
  };
};
