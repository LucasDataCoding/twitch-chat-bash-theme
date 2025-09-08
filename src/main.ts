import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura'
import { Button, Card, Tab, TabList, TabPanel, TabPanels, Tabs, InputText } from 'primevue'
import { definePreset } from '@primeuix/themes'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const stylePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}',
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
app.component('InputText', InputText)

app.mount('#app')
