import { EmptyState } from "@/components/empty-state";
import { Layout } from "@/components/layout";
import { Main } from "@/components/main";
import { useTimerDialog } from "@/components/timer-dialog";
import { useTimers } from "@/hooks/use-timers";

export default function App() {
  const { timers, addTimer, deleteTimer } = useTimers();
  const { TimerDialog, openTimerDialog } = useTimerDialog();

  return (
    <>
      <TimerDialog onTimerAdd={addTimer} />
      <Layout>
        {timers.length > 0 ? (
          <Main
            timers={timers}
            onTimerDelete={deleteTimer}
            onTimerAdd={addTimer}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <EmptyState action={openTimerDialog} />
          </div>
        )}
      </Layout>
    </>
  );
}
