<template>
  <div class="new-message">
    <form @keypress.shift.enter.prevent='addMessage'>
      <label for="new-message">새 메시지 (Enter 키로 전송):</label>
      <pre><textarea name="new-message" v-model="newMessage"></textarea></pre>
      <p class="red-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default{
  name: 'NewMessage',
  props: ['name'],
  data(){
    return {
      newMessage: null,
      feedback: null
    }
  },
  methods: {
    addMessage(){
      if(this.newMessage){
        db.collection('messages').add({
          content: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        })
        this.newMessage = ""
        this.feedback = null
      } else{
        this.feedback = "뭐라도 치세요"
      }
    }
  }
}
</script>
