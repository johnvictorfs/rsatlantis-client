<template>
  <v-card>
    <!-- Title -->
    <v-toolbar class="text-wrap headline mb-2" color="grey darken-2">
      <v-toolbar-title class="text-wrap">
        <slot name="title" />
      </v-toolbar-title>
    </v-toolbar>

    <!-- Description -->
    <v-card-text class="text-justify">
      <slot name="description" />
    </v-card-text>

    <!-- Actions -->
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>
