import { defineComponent, ref } from 'vue';
import Logo from '@/components/logo';
import './index.scss';
export default defineComponent({
  name: 'MainSearch',
  setup() {
    // 关键词
    const keyword = ref('');
    return () => (
      <div class="main-search" data-tauri-drag-region>
        <div class="main-search-logo">
          <Logo drag={true}></Logo>
        </div>
        <input class="main-search-input" v-model={keyword.value} />
      </div>
    );
  }
});
