<template>
  <v-card color="backgroundContrast">
    <!-- Title -->
    <v-toolbar class="text-wrap headline mb-2" color="background">
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
