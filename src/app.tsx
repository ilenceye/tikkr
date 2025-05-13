import { useMemo } from "react";

import { Countdown } from "@/components/countdown";
import { EmptyState } from "@/components/empty-state";
import { Layout } from "@/components/layout";
import { useTimerDialog } from "@/components/timer-dialog";
import { TimerList } from "@/components/timer-list";
import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks/use-countdown";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTimers } from "@/hooks/use-timers";
import { PlayIcon, PlusIcon, RotateCcwIcon } from "lucide-react";

export default function App() {
  const [activeTimerIdx, setActiveTimerIdx] = useLocalStorage(
    "active-timer-index",
    0,
  );
  const { timers, addTimer, deleteTimer, updateTimer } = useTimers();
  const { TimerDialog, openTimerDialog } = useTimerDialog();

  // 根据计时场景，设置计时的初始时间
  const initialSeconds = useMemo(
    () => (timers.length > 0 ? timers[activeTimerIdx].seconds : 0),
    [timers, activeTimerIdx],
  );

  const { isRunning, isEnd, secondsLeft, start, reset } = useCountdown({
    initialSeconds,
    onFinish: () => {
      alert("计时结束.");
      reset();
    },
  });

  const handleTimerAdd = (seconds: number) => {
    addTimer(seconds);
    setActiveTimerIdx(timers.length);
  };

  return (
    <>
      <TimerDialog onSubmit={handleTimerAdd} />
      <Layout>
        {timers.length > 0 ? (
          <div className="p-6">
            <Countdown seconds={secondsLeft} />
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
              onTimerDelete={deleteTimer}
              onTimerUpdate={updateTimer}
            />
            <div className="mt-6">
              {!isRunning && !isEnd ? (
                <Button className="w-full cursor-pointer" onClick={start}>
                  <PlayIcon className="mr-2 h-4 w-4" /> 开始
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={reset}
                >
                  <RotateCcwIcon className="mr-2 h-4 w-4" /> 重置
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <EmptyState action={openTimerDialog} />
          </div>
        )}
      </Layout>
    </>
  );
}
