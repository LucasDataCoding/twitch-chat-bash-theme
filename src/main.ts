import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura'
import { Button, Card, Tab, TabList, TabPanel, TabPanels, Tabs, InputText, Divider } from 'primevue'
import { definePreset } from '@primeuix/themes'
const app = createApp(App)

app.use(createPinia())
app.use(router)

const stylePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#da4140', // SUA COR PRINCIPAL
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
  },
  common: {
    fontFamily: {
      primary: ['Roboto', 'sans-serif'],
      heading: ['Bungee', 'sans-serif'],
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: stylePreset,
  },
})

app.component('Button', Button)
app.component('Card', Card)
app.component('Tabs', Tabs)
app.component('TabList', TabList)
app.component('Tab', Tab)
app.component('TabPanels', TabPanels)
app.component('TabPanel', TabPanel)
app.component('Card', Card)
app.component('Divider', Divider)
app.component('InputText', InputText)

app.mount('#app')
