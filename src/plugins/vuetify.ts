import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/src/locale/pt'

import RunescapeIcon from '@/icons/Runescape.vue'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      runescape: {
        component: RunescapeIcon
      }
    }
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#354B5E',
        secondary: '#b0bec5',
        accent: '#66798a',
        error: '#682222',
        info: '#283744',
        success: '#4ea729',
        warning: '#FFC107',
        // Custom
        background: '#192330',
        backgroundContrast: '#243340',
        secondaryBackground: '#354B5E',
        text: '#afc0d5',
        disabledText: '#9B9B9B'
      }
    }
  },
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
