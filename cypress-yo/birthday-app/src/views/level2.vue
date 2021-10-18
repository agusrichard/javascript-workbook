<template>
  <div>
    <Title>Level 2</Title>
    <Container>
      <p class="desc">On this level you have to answer my question as a form of text. If your sentence includes a keyword I set as the answer then you'll pass this level. The twist is the question is encrypted with Affine Cipher (coefficient A = 21 and B = 9). You can look up on the internet to solve this case. <span>Hope</span> you can do it!</p>
      <p class="question">Question: Sap jwxdpc vx mcpsst xvbmgp. Trn qnxs ajip sr dcvsp trnc armpx vw rwp gvwp. Sap jwxdpc vx ejxvzjggt trncx. Kppg kcpp sr dcvsp jwtsavwf trn gvlp. Sap lptdrcu davza bnxs ep vwzgnupu dvsavw trnc jwxdpc vx mgjzpu rw sap upxzcvmsvrw, grrl krc xrbpsavwf uvkkpcpws sapcp!</p>
      <v-text-field
        v-model="answer"
        label="Your Answer"
      ></v-text-field>
    </Container>
    <Button title="Move on" @click="submit" />
    <Dialog text="Pay attention to the description and the question!" :dialog="dialog" @close="dialog = false" />
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
  data() {
    return {
      dialog: false,
      answer: ''
    }
  },
  methods: {
    submit() {
      if (this.answer.toLowerCase().includes('hope')) {
        store.dispatch('setLevels', { index: 3 })
        store.dispatch('setHope', { hope: this.answer })
        this.$router.push({ name: 'Level3' })
      } else {
        this.dialog = true
        this.answer = ''
      }
    }
  }
}
</script>

<style scoped>
p.desc {
  font-size: 20px;
}

p.question {
  font-size: 16px;
  color: #999;
}

span {
  font-weight: bold;
  font-size: 22px;
  color: var(--glaucous);
}
</style>