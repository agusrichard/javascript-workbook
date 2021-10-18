<template>
  <v-btn
    class="btn"
    color="primary"
    @click="$emit('click')"
  >
    {{ title }}
  </v-btn>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
</style>