import { contextBridge } from 'electron';
import RenderTransport from '../transport/render';

const transport = new RenderTransport();

contextBridge.exposeInMainWorld('electron', {
  test: async () => {
    return await transport.request('test');
  }
});
