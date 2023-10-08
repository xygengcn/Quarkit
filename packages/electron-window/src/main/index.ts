/**
 * electron 主文件
 */
import { app, BrowserWindow } from 'electron';
import { createMainWindow } from './windows';

/**
 * 程序启动
 */
app.whenReady().then(() => {
  createMainWindow();
});

/**
 * 窗口关闭
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * 窗口激活
 */
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    return createMainWindow();
  }
  return null;
});
