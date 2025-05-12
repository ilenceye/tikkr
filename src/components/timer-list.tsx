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

  const handleTimerDelete = (id: string, idx: number) => {
    onTimerDelete(id);

    if (idx <= activeTimerIdx && activeTimerIdx !== 0) {
      onActiveTimerIdxChange(activeTimerIdx - 1);
    }
  };

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
              onDelete={() => handleTimerDelete(timer.id, idx)}
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
