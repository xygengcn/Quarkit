import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => {
    return { searchKeyword: '' };
  },
  actions: {
    setSearchKeyword(searchKeyword: string) {
      this.searchKeyword = searchKeyword || '';
    }
  }
});
