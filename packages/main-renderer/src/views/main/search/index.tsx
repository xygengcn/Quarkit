import Logo from '@/components/logo';
import { defineComponent } from 'vue';
import './index.scss';
import { MainSearchInput } from './input';
export default defineComponent({
  name: 'MainSearch',
  setup() {
    return () => (
      <div class="main-search" data-tauri-drag-region>
        <div class="main-search-logo">
          <Logo drag={true}></Logo>
        </div>
        <MainSearchInput />
      </div>
    );
  }
});
