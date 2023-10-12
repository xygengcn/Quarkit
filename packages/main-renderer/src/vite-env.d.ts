/// <reference types="vite/client" />
import type { IElectronPreload } from '@quarkit/electron';
import type Transport from '@/transport';

// 全局
declare global {
  interface Window {
    __ELECTRON__: IElectronPreload;
    $api: Transport;
  }
}

export default global;
