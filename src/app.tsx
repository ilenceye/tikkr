import { EmptyState } from "@/components/empty-state";
import { Layout } from "@/components/layout";

export default function App() {
  return (
    <Layout>
      <div className="flex h-full items-center justify-center">
        <EmptyState />
      </div>
    </Layout>
  );
}
