<template>
  <v-app>
    <v-main>
      <Layout>
        <router-view />
      </Layout>
    </v-main>
  </v-app>
</template>

<script>
import Layout from './components/layout'
export default {
  components: { Layout }
}
</script>
