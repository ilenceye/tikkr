import { useEffect, useRef, useState } from "react";

type TimerStatus = "initial" | "running" | "completed";

export const useCountdown = ({
  initialSeconds,
  onFinish,
}: {
  initialSeconds: number;
  onFinish?: () => void;
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  const [status, setStatus] = useState<TimerStatus>("initial");
  const isRunning = status === "running";
  const isCompleted = status === "completed";

  const intervalId = useRef<number>();
  const startMs = useRef<number>(0);
  const endingMs = useRef<number>(0);

  const runCountdownInterval = () => {
    window.clearInterval(intervalId.current);
    intervalId.current = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
  };

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    // Fix the timer is not accurate,
    // by reset the time left and restart Interval when the window is focused.
    const handleFocus = () => {
      if (status === "running") {
        console.log("FOCUS");
        // reset the time left
        const passedSeconds = Math.floor((Date.now() - startMs.current) / 1000);
        const remaining = Math.max(0, initialSeconds - passedSeconds);
        setSecondsLeft(remaining);

        // restart Interval
        runCountdownInterval();
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, [status, initialSeconds]);

  // 计时结束
  useEffect(() => {
    if (intervalId.current) {
      if (secondsLeft === 0) {
        clearInterval(intervalId.current);
        setStatus("completed");

        //
        onFinish?.();
      }
    }
  }, [secondsLeft]);

  // 启动计时
  const start = () => {
    setStatus("running");

    // get ending ms
    startMs.current = Date.now();
    endingMs.current = startMs.current + secondsLeft * 1000;

    runCountdownInterval();
  };

  // 计时运行期间or计时结束后，重置计时器
  const reset = () => {
    if (status === "running" || status === "completed") {
      clearInterval(intervalId.current);
      startMs.current = 0;
      endingMs.current = 0;
      setSecondsLeft(initialSeconds);
      setStatus("initial");
    }
  };

  return {
    start,
    reset,
    secondsLeft,
    isRunning,
    isCompleted,
    endingMs: endingMs.current,
  };
};
