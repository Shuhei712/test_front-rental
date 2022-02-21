<template>
  <div class="bread-crumbs">
    <v-breadcrumbs class="text-white" :items="items">
      <template v-slot:divider>
        <v-icon color="#ffffff">mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'トップページ',
        disabled: false,
        href: '/',
      },
      {
        text: 'Link 1',
        disabled: false,
        href: '/',
      },
      {
        text: 'Link 2',
        disabled: true,
        href: '/',
      },
    ],
  }),
}
</script>
