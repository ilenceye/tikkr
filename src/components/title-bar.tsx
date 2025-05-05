import { getCurrentWindow } from "@tauri-apps/api/window";
import { Clock3Icon, XIcon } from "lucide-react";

export function TitleBar() {
  return (
    <div data-tauri-drag-region className="bg-secondary sticky top-0 px-4 py-2">
      <div className="flex items-center gap-1">
        <Clock3Icon className="size-4" />
        <span className="text-sm font-medium">Tikkr</span>
      </div>
      <div className="absolute top-0 right-0 bottom-0">
        <button
          className="hover:bg-destructive h-full px-3 transition-colors hover:text-white"
          onClick={() => getCurrentWindow().hide()}
        >
          <XIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
