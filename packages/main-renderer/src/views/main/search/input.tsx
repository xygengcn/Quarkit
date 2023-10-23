import { defineComponent, onMounted, ref } from 'vue';
import { debounce } from 'throttle-debounce';
import './index.scss';
import { useAppStore } from '@/store';
export const MainSearchInput = defineComponent({
  name: 'MainSearchInput',
  setup() {
    // 关键词
    const keyword = ref('');

    // 中文输入
    const composing = ref(false);

    // store
    const appStore = useAppStore();

    // 输入框
    const refInput = ref<HTMLInputElement>();

    // 处理输入
    const handleInput = debounce(600, () => {
      if (!composing.value) {
        console.log('[输入]', keyword.value);
        appStore.setSearchKeyword(keyword.value.trim());
      }
    });

    // 中文开始输入
    const onCompositionstart = () => {
      composing.value = true;
    };

    // 中文开始结束
    const onCompositionend = () => {
      composing.value = false;
    };

    // 初始化
    onMounted(() => {
      refInput.value?.focus();
    });
    return () => (
      <div class="main-search-input">
        <input ref={refInput} v-model={keyword.value} placeholder="你好，Quarkit" spellcheck={false} onInput={handleInput} onCompositionstart={onCompositionstart} onCompositionend={onCompositionend} />
      </div>
    );
  }
});
