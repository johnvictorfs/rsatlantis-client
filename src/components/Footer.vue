<template>
  <v-footer dark padless>
    <v-card class="flex" text tile style="border: none;" color="#354B5E">
      <v-sparkline
        fill
        class="wave"
        :smooth="25"
        :gradient="['#354B5E']"
        :line-width="4"
        :padding="0"
        :height="7"
        :value="[4, 3, 4, 5, 4, 5, 3, 4, 5, 4]"
        style="background-color: #243340; border: none;"
      />
      <v-card-title>
        <v-row align="center" justify="center">
          <v-btn
            @mouseleave="item.colorUse = 'white'"
            @mouseover="item.colorUse = item.color"
            :key="item.path"
            :href="item.path"
            class="mx-3"
            v-for="item in items"
            icon
            target="_blank"
            style="text-decoration: none;"
          >
            <v-icon :color="item.colorUse">
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-actions class="justify-center" style="background-color: #243340">
        <strong>&copy; {{ currentYear }} — Atlantis</strong>
        <v-btn icon>
          <a href="https://github.com/johnvictorfs/rsatlantis" target="_blank" style="text-decoration: none;">
            <v-icon color="white">fab fa-github</v-icon>
          </a>
        </v-btn>
        <v-btn rounded small :href="apiDocsUrl">
          <v-icon small left>
            fa-code
          </v-icon>
          API
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import api from '@/api'
import Vue from 'vue'

interface FooterItem {
  icon: string
  path: string
  color: string
  colorUse: string
}

interface Data {
  items: FooterItem[]
  currentYear: number
  apiDocsUrl: string
  clanUrl: string
}

export default Vue.extend({
  name: 'Footer',
  data: (): Data => ({
    currentYear: new Date().getFullYear(),
    apiDocsUrl: api.docs.redoc(),
    clanUrl: 'http://services.runescape.com/m=clan-home/clan/Atlantis',
    items: [
      {
        icon: 'fab fa-discord',
        path: 'https://discord.gg/2aYDY8N',
        color: '#7289da',
        colorUse: ''
      },
      {
        icon: 'fab fa-facebook-f',
        path: 'https://www.facebook.com/groups/196808473833963/',
        color: '#4267b2',
        colorUse: ''
      },
      {
        icon: 'fab fa-whatsapp',
        path: 'https://chat.whatsapp.com/H9EnoOCot8dG1hv5f5f6cP',
        color: '#4fce5d',
        colorUse: ''
      },
      {
        icon: 'fab fa-youtube',
        path: 'https://www.youtube.com/channel/UCecHF0mm4_wxlF-Ef_NWClQ/',
        color: '#ef4c4c',
        colorUse: ''
      },
      {
        icon: '$runescape',
        path: 'http://services.runescape.com/m=clan-home/clan/Atlantis',
        color: '#38738f',
        colorUse: ''
      }
    ]
  })
})
</script>

<style lang="scss" scoped>
.wave {
  background-color: rgb(48, 48, 48);
}
</style>
