<template>
  <h1>
    <slot></slot>
  </h1>
</template>

<script>
export default {
}
</script>

<style scoped>
h1 {
  padding: 0 15px;
  font-size: 42px;
  text-align: center;
  display: inline-block;
  margin: 0 auto 25px auto;
  border-bottom: 2px solid var(--granny-smith-apple);
}
</style>