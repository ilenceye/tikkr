import { Menu } from "@tauri-apps/api/menu";
import { TrayIcon, TrayIconOptions } from "@tauri-apps/api/tray";

import { getCurrentWindow } from "@tauri-apps/api/window";

async function toggleWindow() {
  const appWindow = getCurrentWindow();
  const isVisible = await appWindow.isVisible();

  if (isVisible) {
    await appWindow.hide();
  } else {
    await appWindow.show();
    await appWindow.setFocus(); // Bring the window to front and focus.
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
    icon: "icons/icon.png",
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
