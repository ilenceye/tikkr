import { useState } from "react";

import { Countdown } from "@/components/countdown";
import { CountdownActions } from "@/components/countdown-actions";
import { Layout } from "@/components/layout";
import { TimerList } from "@/features/timers";
import { useCountdown } from "@/hooks/use-countdown";
import { getCurrentWindow } from "@tauri-apps/api/window";

export default function App() {
  const [initialSeconds, setInitialSeconds] = useState(0);

  const handleCountdownFinish = async () => {
    const win = getCurrentWindow();
    const [isVisible, isFocused] = await Promise.all([
      win.isVisible(),
      win.isFocused(),
    ]);

    if (!isVisible) {
      await win.show();
    } else if (!isFocused) {
      await win.setFocus();
    }
  };

  const { isIdle, isCompleted, secondsLeft, status, endingMs, start, reset } =
    useCountdown({
      initialSeconds,
      onFinish: handleCountdownFinish,
    });

  const endingClock = new Date(endingMs).toLocaleTimeString("zh-CN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCountdownStart = () => {
    start();
    setTimeout(() => {
      getCurrentWindow().hide();
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex h-full flex-col p-6">
        {isIdle ? (
          <div className="w-full">
            <TimerList onSecondsChange={setInitialSeconds} />
          </div>
        ) : (
          <div className="grid grow place-items-center text-center">
            <div>
              <Countdown seconds={secondsLeft} />
              <div className="text-muted-foreground text-sm">
                {isCompleted
                  ? "倒计时已结束"
                  : `倒计时将在 ${endingClock} 结束`}
              </div>
            </div>
          </div>
        )}
        <div className="mt-auto">
          <CountdownActions
            status={status}
            onStart={handleCountdownStart}
            onReset={reset}
          />
        </div>
      </div>
    </Layout>
  );
}
