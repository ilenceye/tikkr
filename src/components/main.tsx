import { useState } from "react";

import { useTimerDialog } from "@/components/timer-dialog";
import { TimerList } from "@/components/timer-list";
import { Button } from "@/components/ui/button";
import { TimerProps } from "@/types";
import { PlusIcon } from "lucide-react";

export function Main({
  timers,
  onTimerDelete,
  onTimerAdd,
}: {
  timers: TimerProps[];
  onTimerDelete: (id: string) => void;
  onTimerAdd: (seconds: number) => void;
}) {
  const [activeTimerIdx, setActiveTimerIdx] = useState(0);
  const { TimerDialog, openTimerDialog } = useTimerDialog();

  return (
    <>
      <TimerDialog onTimerAdd={onTimerAdd} />
      <div className="p-6">
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
        <TimerList
          timers={timers}
          activeTimerIdx={activeTimerIdx}
          onActiveTimerIdxChange={setActiveTimerIdx}
          onTimerDelete={onTimerDelete}
        />
      </div>
    </>
  );
}
