<template>
  <div>
    <Title>Welcome</Title>
    <Container>
      <p>Hi... Probably you ask what is this thing? Yeah, me too.</p>
      <p>But you can follow this guide and there is something at the end of this app.</p>
      <p>What you have to do is just answer these questions. There are several levels you have to go through.</p>
      <p>Just like any other game, to go to the next level you have to answer it correctly or you'll stuck and never find the end of the game.</p>
      <p>All I can say is good luck.</p>
    </Container>
    <Button title="Let's Start" @click="updateLevel"/>
  </div>
</template>

<script>
import store from '../store'
import Title from '../components/title'
import Button from '../components/button'
import Container from '../components/container'

export default {
  components: { Title, Button, Container },
  methods: {
    updateLevel() {
      store.dispatch('setLevels', { index: 1 })
      this.$router.push({ name: 'Level1' })
    }
  }
}
</script>

<style scoped>
p {
  margin: 25px 0;
}
</style>