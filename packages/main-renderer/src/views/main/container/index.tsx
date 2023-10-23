import { defineComponent } from 'vue';
import './index.scss';
import MainContainerSearchPanel from './search-panel';

/**
 * 主要展示区域
 */
export default defineComponent({
  name: 'MainContainer',
  setup() {
    return () => (
      <div class="main-container">
        <MainContainerSearchPanel></MainContainerSearchPanel>
      </div>
    );
  }
});
