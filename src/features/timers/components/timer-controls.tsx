import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useTimerDialog } from "@/features/timers/components/timer-dialog";
import { TimerProps } from "@/types";

export function TimerControls({
  children,
  timer,
  onDelete,
  onEdit,
}: React.PropsWithChildren<{
  timer: TimerProps;
  onDelete: () => void;
  onEdit: (timer: TimerProps) => void;
}>) {
  const { TimerDialog, openTimerDialog } = useTimerDialog();

  return (
    <>
      <TimerDialog
        variant="edit"
        defaultSeconds={timer.seconds}
        onSubmit={(seconds) => onEdit({ ...timer, seconds })}
      />
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem inset onSelect={openTimerDialog}>
            编辑
          </ContextMenuItem>
          <ContextMenuItem inset variant="destructive" onSelect={onDelete}>
            删除
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
