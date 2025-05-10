import { TimerItem } from "@/components/timer-item";
import { TimerProps } from "@/types";

export function TimerList({
  timers,
  activeTimerIdx,
  onActiveTimerIdxChange,
}: {
  timers: TimerProps[];
  activeTimerIdx: number;
  onActiveTimerIdxChange: (idx: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {timers.map((timer, idx) => (
        <TimerItem
          timer={timer}
          isActive={idx === activeTimerIdx}
          onClick={() => idx !== activeTimerIdx && onActiveTimerIdxChange(idx)}
        />
      ))}
    </div>
  );
}
