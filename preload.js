const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bridge", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  suspend: () => ipcRenderer.invoke("suspend"),
  reboot: () => ipcRenderer.invoke("reboot"),
  shutdown: () => ipcRenderer.invoke("shutdown"),
});
