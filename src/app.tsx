import { useState } from "react";

import { CreateTimerView } from "@/components/create-timer-view";
import { EmptyState } from "@/components/empty-state";
import { Layout } from "@/components/layout";
import { useTimers } from "@/hooks/use-timers";

type View = "main" | "create-timer";

export default function App() {
  const [view, setView] = useState<View>("main");
  const { addTimer } = useTimers();

  return (
    <Layout>
      {view === "main" && (
        <div className="flex h-full items-center justify-center">
          <EmptyState action={() => setView("create-timer")} />
        </div>
      )}
      {view === "create-timer" && (
        <CreateTimerView
          onCancel={() => setView("main")}
          onSubmit={(seconds) => {
            addTimer(seconds);
            setView("main");
          }}
        />
      )}
    </Layout>
  );
}
