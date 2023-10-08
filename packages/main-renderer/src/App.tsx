import { defineComponent } from 'vue';
import './App.scss';
import Main from './views/main';
export default defineComponent({
  name: 'app',
  setup() {
    return () => (
      <div class="app">
        <Main></Main>
      </div>
    );
  }
});
