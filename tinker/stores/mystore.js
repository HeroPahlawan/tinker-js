import { defineStore } from 'pinia';

export const navTitle = defineStore('navTitle', {
  state: () => ({ name: '' }),
});