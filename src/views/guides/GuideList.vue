<template>
  <v-container app>
    <v-alert border="top" type="error" transition="scale-transition" v-if="(notFound || visibleGuides.length == 0) && !loading">
      Nenhum Guia Encontrado
    </v-alert>
    <v-flex
      v-for="guide in visibleGuides"
      :key="guide.slug"
      justify-center
      xs12
      sm8
      md4
      offset-xs4
      class="pt-5"
    >
      <Guide :guide="guide" :content="false" :details-button="true" />
    </v-flex>
    <v-layout>
      <v-pagination v-if="visibleGuides.length > 5" v-model="page" :length="pageLength" circle />
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/api'

import Guide from '@/components/Guide.vue'

export default {
  name: 'GuideList',
  components: {
    Guide
  },
  data: () => ({
    notFound: false,
    guides: [],
    page: 1,
    pageSize: 5
  }),
  async created() {
    try {
      const guides = await this.$store.dispatch('guideList')

      for (const guide of guides) {
        switch (guide.category) {
          case 'pvm':
            guide.category = 'PvM'
            break
          case 'skilling':
            guide.category = 'Habilidades'
            break
          default:
            guide.category = 'Outros'
        }

        try {
          const author = await guide.getAuthor()

          guide.author = {
            name: author.username,
            isAdmin: author.is_staff,
            isSuperUser: author.is_superuser
          }
        } catch (error) {
          guide.author = {
            name: 'N/A',
            isAdmin: false,
            isSuperUser: false
          }
        }
        this.guides = guides
      }
    } catch (error) {
      this.notFound = true
    }
  },
  computed: {
    visibleGuides() {
      return this.guides.slice(((this.page - 1) * this.pageSize), (this.page * this.pageSize))
    },
    pageLength() {
      return Math.ceil(this.guides.length / this.pageSize)
    },
    loading() {
      return this.$store.state.loading.loading
    }
  }
}
</script>
