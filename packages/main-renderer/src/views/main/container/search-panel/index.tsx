import { computed, defineComponent } from 'vue';
import './index.scss';
import { useAppStore } from '@/store';

/**
 * 搜索结果
 */
export default defineComponent({
  name: 'MainContainerSearchPanel',
  setup() {
    const appStore = useAppStore();

    const list = computed(() => {
      return appStore.searchKeyword.split('');
    });

    return () => (
      <div class="main-container-search-panel" v-show={list.value.length > 0}>
        {list.value.map((item) => {
          return (
            <div class="main-container-search-panel-item">
              <div class="main-container-search-panel-item-icon">
                <img src="https://psstatic.cdn.bcebos.com/video/wiseindex/aa6eef91f8b5b1a33b454c401_1660835115000.png"></img>
              </div>
              <div class="main-container-search-panel-item-info">
                <span>{item}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});
