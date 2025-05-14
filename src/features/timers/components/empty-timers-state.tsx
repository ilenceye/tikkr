import { Button } from "@/components/ui/button";
import { Plus, Timer } from "lucide-react";

export function EmptyTimersState({ action }: { action?: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-gray-100 p-4">
        <Timer className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="mb-2 text-base font-medium text-gray-700">没有计时器</h3>
      <p className="mb-4 max-w-xs text-sm text-gray-500">
        添加一些常用的计时器，以便快速开始倒计时
      </p>
      <Button className="flex items-center gap-1" onClick={action}>
        <Plus className="h-4 w-4" /> 添加计时器
      </Button>
    </div>
  );
}
