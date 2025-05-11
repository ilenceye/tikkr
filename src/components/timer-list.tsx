import { Fragment } from "react/jsx-runtime";

import { TimerControls } from "@/components/timer-controls";
import { useTimerDialog } from "@/components/timer-dialog";
import { TimerItem } from "@/components/timer-item";
import { TimerProps } from "@/types";

export function TimerList({
  timers,
  activeTimerIdx,
  onActiveTimerIdxChange,
  onTimerDelete,
  onTimerUpdate,
}: {
  timers: TimerProps[];
  activeTimerIdx: number;
  onActiveTimerIdxChange: (idx: number) => void;
  onTimerDelete: (id: string) => void;
  onTimerUpdate: (timer: TimerProps) => void;
}) {
  const { TimerDialog, openTimerDialog } = useTimerDialog();

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {timers.map((timer, idx) => (
          <Fragment key={timer.id}>
            <TimerDialog
              variant="edit"
              defaultSeconds={timer.seconds}
              onSubmit={(seconds) => onTimerUpdate({ ...timer, seconds })}
            />
            <TimerControls
              onDelete={() => onTimerDelete(timer.id)}
              onEdit={openTimerDialog}
            >
              <TimerItem
                timer={timer}
                isActive={idx === activeTimerIdx}
                onClick={() =>
                  idx !== activeTimerIdx && onActiveTimerIdxChange(idx)
                }
              />
            </TimerControls>
          </Fragment>
        ))}
      </div>
    </>
  );
}
