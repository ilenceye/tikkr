import { cn } from "@/lib/classnames";
import { timify, transformer } from "@/lib/time";
import { TimerProps } from "@/types";

const getTime = (seconds: number) => {
  const [hh, mm, ss] = transformer(seconds);
  return timify(ss, mm, hh);
};

export function TimerItem({
  timer,
  isActive,
  onClick,
}: {
  timer: TimerProps;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "cursor-pointer rounded-sm border p-2 text-sm transition-all",
        isActive && "border-gray-300 bg-gray-100 text-gray-900",
      )}
      onClick={onClick}
    >
      {getTime(timer.seconds)}
    </button>
  );
}
