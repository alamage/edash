const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 250,
  });

  win.menuBarVisible = false;
  win.loadFile("dist/index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // Open a window if none are open (macOS)
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  // Explicity close the app when all windows closed (unless macOS)
  if (process.platform !== "darwin") app.quit();
});
