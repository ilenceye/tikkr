import { cn } from "@/lib/classnames";
import { transformer } from "@/lib/time";

export function Countdown({ seconds }: { seconds: number }) {
  const isCompleted = seconds === 0;

  // 转换
  const [hh, mm, ss] = transformer(seconds);

  // 格式化
  const formattedHour = `0${hh}`.slice(-2);
  const formattedMinute = `0${mm}`.slice(-2);
  const formattedSecond = `0${ss}`.slice(-2);

  return (
    <div
      className={cn(
        "rounded-xl px-8 py-4 text-center font-mono text-7xl font-semibold tracking-tight",
        isCompleted && "animate-flash",
      )}
    >
      {formattedHour}:{formattedMinute}:{formattedSecond}
    </div>
  );
}
