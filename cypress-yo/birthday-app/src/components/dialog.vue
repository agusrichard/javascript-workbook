<template>
  <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="dialog">
        <v-card-text class="dialog-text">
          {{ text }} 
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            @click="$emit('close')"
          >
            Try Again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['text', 'dialog'],
}
</script>

<style scoped>
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