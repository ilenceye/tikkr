import { useState } from "react";

import { Countdown } from "@/components/countdown";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { TimerList } from "@/features/timers";
import { useCountdown } from "@/hooks/use-countdown";
import { PlayIcon, RotateCcwIcon } from "lucide-react";

export default function App() {
  const [initialSeconds, setInitialSeconds] = useState(0);

  const { isRunning, isEnd, secondsLeft, start, reset } = useCountdown({
    initialSeconds,
  });

  return (
    <Layout>
      <div className="flex h-full flex-col p-6">
        {!isRunning && !isEnd ? (
          <div className="w-full">
            <TimerList onSecondsChange={setInitialSeconds} />
          </div>
        ) : (
          <div className="flex grow items-center">
            <Countdown seconds={secondsLeft} />
          </div>
        )}
        <div className="mt-auto">
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
    </Layout>
  );
}
