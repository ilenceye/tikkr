import { EmptyState } from "@/components/empty-state";
import { Layout } from "@/components/layout";
import { useTimerDialog } from "@/components/timer-dialog";
import { TimerList } from "@/components/timer-list";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTimers } from "@/hooks/use-timers";
import { PlusIcon } from "lucide-react";

export default function App() {
  const [activeTimerIdx, setActiveTimerIdx] = useLocalStorage(
    "active-timer-index",
    0,
  );
  const { timers, addTimer, deleteTimer, updateTimer } = useTimers();
  const { TimerDialog, openTimerDialog } = useTimerDialog();

  return (
    <>
      <TimerDialog onSubmit={addTimer} />
      <Layout>
        {timers.length > 0 ? (
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
              onTimerDelete={deleteTimer}
              onTimerUpdate={updateTimer}
            />
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
