import { useLocalStorage } from "@/hooks/use-local-storage";
import { TimerProps } from "@/types";

export const useTimers = () => {
  const [timers, setTimers] = useLocalStorage<TimerProps[]>("timers", []);

  const addTimer = (seconds: number) => {
    const newTimer: TimerProps = { id: crypto.randomUUID(), seconds };
    setTimers([...timers, newTimer]);
  };

  const deleteTimer = (id: string) => {
    const newTimers = timers.filter((t) => t.id !== id);
    setTimers(newTimers);
  };

  return { timers, addTimer, deleteTimer };
};
