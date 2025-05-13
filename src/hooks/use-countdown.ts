import { useEffect, useRef, useState } from "react";

type TimerStatus = "initial" | "running" | "end";

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
  const isEnd = status === "end";

  const intervalId = useRef<number>();
  const startMs = useRef<number>(0);
  const endingMs = useRef<number>(0);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    // Fix the timer is not accurate,
    // by reset the time left and restart Interval when the window is focused.
    const handleFocus = () => {
      if (status === "running") {
        const passedSeconds = Math.round((Date.now() - startMs.current) / 1000); // TODO: 这里用四舍五入总感觉有点问题
        const newTotalSeconds = initialSeconds - passedSeconds;
        clearInterval(intervalId.current);
        setSecondsLeft(newTotalSeconds);
        intervalId.current = window.setInterval(() => {
          setSecondsLeft((prev) =>
            Date.now() >= endingMs.current ? 0 : prev - 1,
          );
        }, 1000);
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, [secondsLeft, status]);

  // 计时结束
  useEffect(() => {
    if (intervalId.current) {
      if (secondsLeft === 0) {
        clearInterval(intervalId.current);
        setStatus("end");

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

    intervalId.current = window.setInterval(() => {
      // check if now is equal to ending clock, if it is, set total seconds to 0
      setSecondsLeft((prev) => {
        // console.log(
        //   endingMs.current,
        //   Date.now(),
        //   prev,
        //   Date.now() >= endingMs.current,
        //   Date.now() >= endingMs.current ? 0 : prev - 1
        // ); // FIX: 为什么这里会 log 两次？
        return Date.now() >= endingMs.current ? 0 : prev - 1;
      });
    }, 1000);
  };

  // 计时运行期间or计时结束后，重置计时器
  const reset = () => {
    if (status === "running" || status === "end") {
      clearInterval(intervalId.current);
      setSecondsLeft(initialSeconds);
      setStatus("initial");
    }
  };

  return {
    start,
    reset,
    secondsLeft,
    isRunning,
    isEnd,
  };
};
