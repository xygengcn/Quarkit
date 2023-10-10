import { defineComponent } from 'vue';
import './index.scss';

/**
 * 主要展示区域
 */
export default defineComponent({
  name: 'MainContainer',
  setup() {
    return () => <div class="main-container"></div>;
  }
});
