<template>
  <div>
    <Title>Level 3</Title>
    <Container>
      <p class="desc">There is no question on this level. So, there is no right or wrong. This level is about contemplation. I am pretty sure that this day is kinda special to you.</p>
      <p class="desc">Let's spend some of your time to think about the past, present and future. What was your past? Was it good? or bad? I am pretty sure it does not matter now. Past is the past and nothing we can do to change it.</p>
      <p class="desc">How about your present? Are you working on something to achive your goal? Are you enjoying your life? I guess the present is about enjoying and working at the same time.</p>
      <p class="desc">Future? Seemed to be so scary sometimes, but we can't dodge it, we have to face it for sure.</p>
      <p class="desc">You can pause this game to contemplate for a while. Think about it... After that you can continue the game. You know? Sometimes we have to pause for a while because life can be so disheartening.</p>
    </Container>
    <Button title="Continue" @click="submit" />
  </div>
</template>

<script>
import store from '../store'
import Title from '../components/title'
import Button from '../components/button'
import Container from '../components/container'

export default {
  components: { Title, Container, Button },
  methods: {
    submit() {
      store.dispatch('setLevels', { index: 4 })
      this.$router.push({ name: 'Congratulation' })
    }
  }
}
</script>

<style scoped>
p.desc {
  font-size: 20px;
}
</style>