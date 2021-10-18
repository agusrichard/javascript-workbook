<template>
  <div>
    <Title>Congratulation</Title>
    <Container>
      <h3>You finished the game awesome</h3>
      <h3>Happy Birthday!!!</h3>
      <div class="content">
        <h6>This one is your wishes!</h6>
        <p>{{ hope }}</p>
      </div>
      <div class="content">
        <h6>This one is mine for you</h6>
        <p>Happy birthday to you! Wish for good health for you all the time, whatever you seek may you find, whatever you wish may it be fulfilled.</p>
        <p>May every single day of yourlife become something of a value to yourself and others.</p>
        <p>I wish for your wishes to come true.</p>
      </div>
    </Container>
    <Button title="Click this if you to play again" @click="reset" />
  </div>
</template>

<script>
import store from '../store'
import Title from '../components/title'
import Button from '../components/button'
import Container from '../components/container'

export default {
  components: { Title, Container, Button },
  computed: {
    hope() {
      return store.state.hope
    }
  },
  methods: {
    reset() {
      store.dispatch('reset')
      this.$router.push({ name: 'Welcome' })
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}

h6 {
  text-align: center;
  display: inline-block;
  color: var(--granny-smith-apple);
  font-size: 24px;
  border-bottom: 1px solid #fff;
  margin-bottom: 20px;
}

div.content {
  margin: 10px 0;
  background: var(--glaucous);
  color: white;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

div.content p {
  text-align: justify;
}
</style>