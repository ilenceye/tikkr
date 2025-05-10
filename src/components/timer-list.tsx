import { TimerControls } from "@/components/timer-controls";
import { TimerItem } from "@/components/timer-item";
import { TimerProps } from "@/types";

export function TimerList({
  timers,
  activeTimerIdx,
  onActiveTimerIdxChange,
  onTimerDelete,
}: {
  timers: TimerProps[];
  activeTimerIdx: number;
  onActiveTimerIdxChange: (idx: number) => void;
  onTimerDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {timers.map((timer, idx) => (
        <TimerControls key={timer.id} onDelete={() => onTimerDelete(timer.id)}>
          <TimerItem
            timer={timer}
            isActive={idx === activeTimerIdx}
            onClick={() =>
              idx !== activeTimerIdx && onActiveTimerIdxChange(idx)
            }
          />
        </TimerControls>
      ))}
    </div>
  );
}
