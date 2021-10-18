<template>
  <div>
    <Title>Level 1</Title>
    <Container>
      <p class="desc">This level is about how much you know me. So you better know me well to go further on this game. But the questions are particularly easy, no need to worry!</p>
      <div v-for="(question, index) in questions" :key="question.title">
        <p class="question">{{ question.title }}</p>
        <v-radio-group v-model="radioGroup[index]" class="radio">
          <v-radio
            v-for="option in question.options"
            :key="option"
            :label="option"
            :value="option"
          ></v-radio>
        </v-radio-group>
      </div>
    </Container>
    <Button title="You sure?" @click="submit" />
    <Dialog text="I am dissapointed. I thought you know me!" :dialog="dialog" @close="dialog = false"/>
  </div>
</template>

<script>
import store from '../store'
import Title from '../components/title'
import Button from '../components/button'
import Dialog from '../components/dialog'
import Container from '../components/container'

export default {
  components: { Title, Container, Button, Dialog },
  methods: {
    submit() {
      console.log('this.radioGroup', this.radioGroup)
      if (this.radioGroup.every((item, index) => item === this.answers[index])) {
        store.dispatch('setLevels', { index: 2 })
        this.$router.push({ name: 'Level2' })
      } else {
        this.radioGroup = [null, null, null, null, null, null, null]
        this.dialog = !this.dialog
      }
    }
  },
  data () {
    return {
      dialog: false,
      radioGroup: [null, null, null, null, null, null, null],
      answers: ['The Beatles', 'Natasha Rizki', 'Let it be', 'Interstellar', 'Sir Arthur Conan Doyle', 'Liverpool', 'Switzerland'],
      questions: [
        {
          title: '1. Whcih one is my favorite band?',
          options: ['The Beatles', 'Queen', 'Oasis']
        },
        {
          title: '2. Who is my crush?',
          options: ['Melody JKT48', 'Natasha Rizki', 'Enzy Storia']
        },
        {
          title: '3. From these options, which song I love the most?',
          options: ['Take me home', 'Let it be', 'Bohemian Rhapsody']
        },
        {
          title: '4. Which one is my favourite movie?',
          options: ['Green Mile', 'The Shawshank Redemption', 'Interstellar']
        },
        {
          title: '5. Which one is my favourite author?',
          options: ['Sir Arthur Conan Doyle', 'Stephen King', 'Dan Brown']
        },
        {
          title: '6. Which one is my favourite football club?',
          options: ['Liverpool', 'Manchester United', 'Real Madrid']
        },
        {
          title: '7. Which one is my favourite country?',
          options: ['New Zealand', 'Switzerland', 'Germany']
        },
      ]
    }
  },
}
</script>

<style scoped>
p.desc {
  font-size: 20px;
}

p.question {
  font-size: 16px;
}

.dialog-text {
  text-align: center;
  font-size: 32px;
  font-family: var(--font);
  padding: 50px;
  color: var(--dark-slate-blue);
}

.dialog {
  height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>