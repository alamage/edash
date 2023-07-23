const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 250,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.menuBarVisible = false;
  win.loadFile("dist/index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => {
    console.log("pinged");
    return "pong";
  });

  ipcMain.handle("suspend", () => {
    exec("./suspend", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}}`);
    });
  });

  ipcMain.handle("reboot", () => {
    exec("shutdown -r now", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}}`);
    });
  });

  ipcMain.handle("shutdown", () => {
    exec("shutdown -h now", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}}`);
    });
  });

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
