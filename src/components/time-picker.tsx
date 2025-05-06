import { useMemo, useState } from "react";

import { cn } from "@/lib/classnames";
import { transformer } from "@/lib/time";

const UNITS = {
  hour: "时",
  minute: "分",
  second: "秒",
} as const;

const unitToSeconds: Record<string, number> = {
  [UNITS.hour]: 3600,
  [UNITS.minute]: 60,
  [UNITS.second]: 1,
};

const timify = (seconds: number) => {
  const [hh, mm, ss] = transformer(seconds);

  const hour = hh ? `${hh}时` : "";
  const minute = mm ? `${mm}分` : "";
  const second = ss ? `${ss}秒` : "";

  if (seconds) {
    return hour + minute + second;
  }

  return "0";
};

export default function TimePicker({
  seconds,
  onSecondsChange,
}: {
  seconds: number;
  onSecondsChange: (seconds: number) => void;
}) {
  const [input, setInput] = useState(0);
  const output = useMemo(() => timify(seconds), [seconds]);

  const handleDigitClick = (digit: number) => {
    const newInput = parseInt(`${input}${digit}`);
    setInput(newInput);
  };

  const handleUnitClick = (unit: string) => {
    const newSeconds = seconds + input * unitToSeconds[unit];
    onSecondsChange(newSeconds);
    setInput(0);
  };

  const handleClear = () => {
    setInput(0);
    onSecondsChange(0);
  };

  return (
    <div className="overflow-clip rounded-md text-center">
      <div className="h-12 bg-gray-300 text-lg leading-12">
        {input === 0 || (input !== 0 && output !== "0") ? (
          <span>{output}</span>
        ) : null}
        {input !== 0 && <span className="text-gray-500">{input}</span>}
      </div>

      <div className="grid grid-cols-4 grid-rows-4 bg-gray-50">
        <div className="col-span-3 row-span-full">
          <div className="grid grid-cols-3 grid-rows-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
              <button
                className={cn(digit === 0 && "col-span-3", "h-10")}
                key={digit}
                onClick={() => handleDigitClick(digit)}
              >
                {digit}
              </button>
            ))}
          </div>
        </div>

        <div className="row-span-3">
          <div className="grid">
            {Object.values(UNITS).map((unit) => (
              <button
                className="h-10 hover:bg-gray-200"
                key={unit}
                onClick={() => handleUnitClick(unit)}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        <button
          className="hover:bg-destructive/60 h-10 hover:text-white"
          onClick={handleClear}
        >
          C
        </button>
      </div>
    </div>
  );
}
