const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

let observersOnFocus = [];
let observersOnBlur = [];

let isFocused = false;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 250,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    },
  });

  win.menuBarVisible = false;
  win.loadFile("dist/index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("isFocused", () => {
    return isFocused;
  });

  ipcMain.handle("registerOnFocus", (functionToRun) => {
    console.log("registerOnFocus called");
    observersOnFocus.push(functionToRun);
    console.log(observersOnFocus.length);
  });

  ipcMain.handle("registerOnBlur", (functionToRun) => {
    console.log("registerOnBlur called");
    observersOnBlur.push(functionToRun);
    console.log(observersOnBlur.length);
  });

  ipcMain.handle("registerOnFocus2", () => {
    console.log("registerOnFocus bare");
  });

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

  ipcMain.handle("getVolume", async () => {
    return new Promise((resolve, reject) => {
      exec(
        "pactl get-sink-volume 0 | awk '{print $5}'",
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
          }
          console.log(`stdout: ${stdout}}`);
          resolve(parseInt(stdout.replace("%", "")));
        }
      );
    });
  });

  createWindow();

  app.on("activate", () => {
    // Open a window if none are open (macOS)
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });

  app.on("window-all-closed", () => {
    // Explicity close the app when all windows closed (unless macOS)
    if (process.platform !== "darwin") app.quit();
  });

  app.on("browser-window-focus", () => {
    console.log("browser-window-focus");
    isFocused = true;

    console.log(observersOnFocus.length);
    for (const toRun of observersOnFocus) {
      console.log("calling toRun on " + toRun.toString());
      toRun();
    }
  });

  app.on("browser-window-blur", () => {
    console.log("browser-window-blur event");
    isFocused = false;

    for (const toRun of observersOnBlur) {
      console.log("calling toRun on " + toRun.toString());
      toRun();
    }
  });
});
