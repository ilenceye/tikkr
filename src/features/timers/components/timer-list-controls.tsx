import { Button } from "@/components/ui/button";
import { useTimerDialog } from "@/features/timers/components/timer-dialog";
import { PlusIcon } from "lucide-react";

export function TimerListControls({
  onTimerAdd,
}: {
  onTimerAdd: (seconds: number) => void;
}) {
  const { TimerDialog, openTimerDialog } = useTimerDialog();

  return (
    <>
      <TimerDialog variant="add" defaultSeconds={0} onSubmit={onTimerAdd} />
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-bold">计时器</div>
        <Button
          variant="ghost"
          className="size-8 cursor-pointer"
          onClick={openTimerDialog}
        >
          <PlusIcon />
        </Button>
      </div>
    </>
  );
}
