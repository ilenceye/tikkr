import { useState } from "react";

import { TimerList } from "@/components/timer-list";
import { TimerProps } from "@/types";

export function Main({
  timers,
  onTimerDelete,
}: {
  timers: TimerProps[];
  onTimerDelete: (id: string) => void;
}) {
  const [activeTimerIdx, setActiveTimerIdx] = useState(0);

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="text-sm font-bold">计时器</div>
      </div>
      <TimerList
        timers={timers}
        activeTimerIdx={activeTimerIdx}
        onActiveTimerIdxChange={setActiveTimerIdx}
        onTimerDelete={onTimerDelete}
      />
    </div>
  );
}
