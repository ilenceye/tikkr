import { Menu } from "@tauri-apps/api/menu";
import { TrayIcon, TrayIconOptions } from "@tauri-apps/api/tray";
import { getCurrentWindow } from "@tauri-apps/api/window";

async function toggleWindow() {
  const win = getCurrentWindow();
  const isVisible = await win.isVisible();

  if (isVisible) {
    await win.hide();
  } else {
    await win.show();
    await win.setFocus();
  }
}

async function createTrayMenu() {
  const menu = await Menu.new({
    items: [
      {
        id: "quit",
        text: "Quit",
        action: async () => {
          const appWindown = getCurrentWindow();
          await appWindown.close();
        },
      },
    ],
  });
  return menu;
}

export async function createTray() {
  const menu = await createTrayMenu();

  const options: TrayIconOptions = {
    tooltip: "Tikkr",
    icon: "icons/24x24.png",
    menu,
    showMenuOnLeftClick: false,
    action: async (event) => {
      switch (event.type) {
        case "Click":
          if (event.button === "Left") {
            toggleWindow();
          }
          break;
      }
    },
  };

  await TrayIcon.new(options);
}
