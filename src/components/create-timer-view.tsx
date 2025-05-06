import { useState } from "react";

import TimePicker from "@/components/time-picker";
import { Button } from "@/components/ui/button";

export function CreateTimerView({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (seconds: number) => void;
}) {
  const [seconds, setSeconds] = useState(0);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-center text-lg font-bold">添加计时器</h2>
      <TimePicker seconds={seconds} onSecondsChange={setSeconds} />
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="h-9 grow"
          size="sm"
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          className="h-9 grow"
          size="sm"
          onClick={() => onSubmit(seconds)}
        >
          保存
        </Button>
      </div>
    </div>
  );
}
