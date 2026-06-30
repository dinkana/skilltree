import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Theme, Locale } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'system')
  const locale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'ru')

  function applyTheme() {
    const isDark = theme.value === 'dark' || 
      (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', isDark)
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    try { localStorage.setItem('theme', newTheme) } catch {}
    applyTheme()
  }

  function setLocale(newLocale: Locale) {
    locale.value = newLocale
    try { localStorage.setItem('locale', newLocale) } catch {}
  }

  watch(theme, applyTheme, { immediate: true })

  return {
    theme,
    locale,
    setTheme,
    setLocale
  }
})