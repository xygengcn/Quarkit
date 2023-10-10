import MainTransport from '../../transport/main';

export function createMainTransport() {
  const mainTransport = new MainTransport();
  mainTransport.handle('test', () => {
    return '111';
  });
}
