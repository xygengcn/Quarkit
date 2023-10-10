import { protocol, net } from 'electron';
import { join } from 'path';

/**
 * 自定义数据
 * @param scheme
 */
export function createProtocol(scheme: string) {
  protocol.handle(scheme, (request) => {
    const url = join(__dirname, request.url.slice(`${scheme}://`.length));
    return net.fetch('file://' + url);
  });
}
