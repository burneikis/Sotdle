import { loadTheme, saveTheme } from '$lib/utils/storage';

class ThemeStore {
  current: 'light' | 'dark' = $state('light');

  isDark = $derived(this.current === 'dark');

  constructor() {
    // Will be initialized in init()
  }

  init() {
    this.current = loadTheme();
    this.applyTheme();
  }

  toggle() {
    this.current = this.current === 'light' ? 'dark' : 'light';
    saveTheme(this.current);
    this.applyTheme();
  }

  private applyTheme() {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.isDark);
    }
  }
}

export const themeStore = new ThemeStore();
