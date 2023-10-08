import { defineComponent } from 'vue';
import './index.scss';
import MainSearch from './search';
import MainContainer from './container';

/**
 * 首页
 */
export default defineComponent({
  name: 'Main',
  setup() {
    return () => (
      <div class="main">
        <MainSearch></MainSearch>
        <MainContainer></MainContainer>
      </div>
    );
  }
});
