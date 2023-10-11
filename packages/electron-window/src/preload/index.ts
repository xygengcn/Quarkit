import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('__ELECTRON__', {
  // ipc模块
  __IPC__: {
    // 请求主进程
    invoke: async (channel: string, ...args: any[]) => {
      return ipcRenderer.invoke(channel, ...args);
    },
    // 请求主进程
    on: async (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      return ipcRenderer.on(channel, listener);
    }
  }
});
