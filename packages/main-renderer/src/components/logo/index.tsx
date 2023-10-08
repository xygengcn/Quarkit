import { defineComponent } from 'vue';
import './index.scss';
export default defineComponent({
  name: 'MainSearch',
  props: {
    // 兼容tauri的拖动事件 data-tauri-drag-region
    drag: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return () => (
      <div class="logo" data-tauri-drag-region={props.drag}>
        <div class="green" data-tauri-drag-region={props.drag}></div>
        <div class="pink" data-tauri-drag-region={props.drag}></div>
        <div class="blue" data-tauri-drag-region={props.drag}></div>
      </div>
    );
  }
});
