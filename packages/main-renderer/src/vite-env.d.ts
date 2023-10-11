/// <reference types="vite/client" />
import type { IElectronPreload } from '@quarkit/electron';

// 全局
declare global {
  interface Window {
    __ELECTRON__: IElectronPreload;
  }
}

export default global;
