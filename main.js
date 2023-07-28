const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

let win = null;
const createWindow = () => {
  win = new BrowserWindow({
    width: 500,
    height: 250,
    backgroundColor: "#000000",
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    },
    title: "edash",
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
    //exec("$HOME/suspend", (error, stdout, stderr) => {
    exec("systemctl suspend", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      //console.log(`stdout: ${stdout}}`);
    });
  });

  ipcMain.handle("reboot", () => {
    exec("systemctl reboot", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      //console.log(`stdout: ${stdout}}`);
    });
  });

  ipcMain.handle("shutdown", () => {
    exec("systemctl poweroff", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      //console.log(`stdout: ${stdout}}`);
    });
  });

  ipcMain.handle("getVolume", async () => {
    //console.log("getVolume called");
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
          //console.log(`stdout: ${stdout}}`);
          resolve(parseInt(stdout.replace("%", "")));
        }
      );
    });
  });

  ipcMain.handle("setVolume", async (event, volume) => {
    //console.log("setVolume called");
    exec(`pactl set-sink-volume 0 ${volume}%`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      // console.log(`stdout: ${stdout}}`);
    });
  });

  ipcMain.handle("getMuteState", async () => {
    //console.log("getMuteState called");
    return new Promise((resolve, reject) => {
      exec(
        "pactl get-sink-mute 0 | awk '{print $2}'",
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
          }
          //console.log(`stdout: ${stdout}}`);
          //console.log(stdout === "yes\n");
          resolve(stdout === "yes\n");
        }
      );
    });
  });
  ipcMain.handle("toggleMute", async () => {
    //console.log("toggleMute called");
    return new Promise((resolve, reject) => {
      exec("pactl set-sink-mute 0 toggle", (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        //console.log(`stdout: ${stdout}}`);
      });
    });
  });

  createWindow();

  app.on("activate", () => {
    console.log("activate");
    // Open a window if none are open (macOS)
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });

  app.on("window-all-closed", () => {
    // Explicity close the app when all windows closed (unless macOS)
    if (process.platform !== "darwin") app.quit();
  });
});
