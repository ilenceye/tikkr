import { TitleBar } from "@/components/title-bar";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col">
      <TitleBar />
      <main className="grow overflow-auto">{children}</main>
    </div>
  );
}
