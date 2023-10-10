import { ipcRenderer } from 'electron';
import { Action, Message, NodeAction, NodeActionPromise } from './type.d';
import EventEmitter from 'eventemitter3';

/**
 * 渲染层消息处理中心
 *
 */
export default class RenderTransport<T extends NodeAction = NodeAction> extends EventEmitter {
  constructor() {
    super();
    // 请求回调处理
    this.onRequestCallback();

    // 跨项目实时通信
    this.broadcastChannel = this.createBoardcastChannel();
  }
  // 动作集合
  private actions: Map<string, Action> = new Map();

  // 跨项目实时通信
  private broadcastChannel: BroadcastChannel;

  /**
   * 请求
   */
  public async request(name: string, ...params: any[]) {
    if (this.actions.has(name)) {
      const action = this.actions.get(name);
      return action?.call(undefined, ...params);
    }
    const data = await ipcRenderer.invoke('message-center-render-request', name, ...params);
    if (data?.error) {
      return Promise.reject(data.error);
    }
    return Promise.resolve(data?.result);
  }

  /**
   * 发布
   * @param action
   * @param message
   */
  public publishRender(action: string, message: any) {
    this.broadcastChannel.postMessage({
      action,
      message
    });
  }

  /**
   * 订阅
   */
  public subscribe(action: string, cb: (message: any) => void) {
    this.on(action, cb);
  }

  /**
   * 取消订阅
   * @param action
   * @param cb
   */
  public unsunscribe(action: string, cb?: (message: any) => void) {
    if (cb) {
      this.removeListener(action, cb);
    } else {
      this.removeAllListeners(action);
    }
  }

  /**
   * 注册动作
   * @param action
   * @param callback
   */
  public handleActions(actions: NodeAction) {
    Object.entries(actions).forEach(([key, value]) => {
      this.actions.set(key, value);
    });
  }

  /**
   * 创建请求代理
   * @returns
   */
  public createRequest<K extends NodeAction = T>(): NodeActionPromise<K> {
    /**
     * 创建请求代理
     */
    const proxy = new Proxy<NodeActionPromise<K>>({} as NodeActionPromise<K>, {
      set(_target, name) {
        // 禁止修改
        throw new TypeError((name as string) + '是只读属性');
      },
      get: (_target, name: string) => {
        return async (...params: any) => {
          this.request(name, ...params);
        };
      }
    });
    return proxy;
  }

  /**
   * 创建跨项目实时通信实例
   * @returns
   */
  private createBoardcastChannel(channel: string = 'Fslink-BroadcastChannel') {
    // 跨项目实时通信
    const broadcastChannel = new BroadcastChannel(channel);
    // 跨项目实时通信监听事件
    broadcastChannel.addEventListener('message', (e) => {
      if (e.data?.action) {
        console.log('[RenderTransport] broadcastChannel', e.data);
        this.emit(e.data.action, e.data.message);
      }
    });
    return broadcastChannel;
  }

  /**
   * 接收请求回调，返回到请求
   */
  private onRequestCallback() {
    // eslint-disable-next-line
    ipcRenderer.on('message-center-main', async (event, message: Message) => {
      console.log('[RenderTransport] message-center-main', message.action || message.subject);
      // 寻找注册的方法
      if (message.action) {
        if (this.actions.has(message.action)) {
          const callback = this.actions.get(message.action);
          let result = null;
          let error: unknown = null;
          try {
            // 执行回调
            result = await callback?.(...message.args);
          } catch (e) {
            error = e;
          }
          // 返回结果
          event.sender.send(message.id, { id: message.id, result, error });
          return;
        }
        // 返回空结果
        event.sender.send(message.id, {
          id: message.id,
          result: null,
          error: Error(`${message.action}未注册`)
        });
        return;
      }
      // 订阅
      if (message.subject) {
        this.emit(message.subject, ...message.args);
      }
    });
  }

  /**
   * 启动通信
   */
  public start() {
    const keys = Array.from(this.actions.keys());
    ipcRenderer.invoke('message-center-render-init', keys);
  }
}
