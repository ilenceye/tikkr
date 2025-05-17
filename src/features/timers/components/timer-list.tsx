import { useEffect } from "react";

import { TimerControls } from "@/features/timers/components/timer-controls";
import { TimerItem } from "@/features/timers/components/timer-item";
import { TimerListControls } from "@/features/timers/components/timer-list-controls";
import { useTimers } from "@/features/timers/hooks/use-timers";
import { useLocalStorage } from "@/hooks/use-local-storage";

export function TimerList({
  onSecondsChange,
}: {
  onSecondsChange: (seconds: number) => void;
}) {
  const [activeTimerIdx, setActiveTimerIdx] = useLocalStorage(
    "active-timer-index",
    0,
  );
  const { timers, addTimer, deleteTimer, updateTimer } = useTimers();

  useEffect(() => {
    const activeSeconds =
      timers.length > 0 ? timers[activeTimerIdx].seconds : 0;
    onSecondsChange(activeSeconds);
  }, [activeTimerIdx, timers]);

  const handleTimerAdd = (seconds: number) => {
    addTimer(seconds);
    setActiveTimerIdx(timers.length);
  };

  const handleTimerDelete = (id: string, idx: number) => {
    deleteTimer(id);

    if (idx <= activeTimerIdx && activeTimerIdx !== 0) {
      setActiveTimerIdx(activeTimerIdx - 1);
    }
  };

  return (
    <>
      <TimerListControls onTimerAdd={handleTimerAdd} />
      <div className="grid grid-cols-3 gap-2">
        {timers.map((timer, idx) => (
          <TimerControls
            key={timer.id}
            timer={timer}
            onDelete={() => handleTimerDelete(timer.id, idx)}
            onEdit={updateTimer}
          >
            <TimerItem
              timer={timer}
              isActive={idx === activeTimerIdx}
              onClick={() => idx !== activeTimerIdx && setActiveTimerIdx(idx)}
            />
          </TimerControls>
        ))}
      </div>
    </>
  );
}
