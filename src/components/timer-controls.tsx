import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function TimerControls({
  children,
  onDelete,
  onEdit,
}: React.PropsWithChildren<{
  onDelete: () => void;
  onEdit: () => void;
}>) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem inset onSelect={onEdit}>
          编辑
        </ContextMenuItem>
        <ContextMenuItem inset variant="destructive" onSelect={onDelete}>
          删除
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
