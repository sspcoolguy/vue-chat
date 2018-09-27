<template>
  <div class="chat container">
    <h2 class="center teal-text">UmigwanChat
    <img src="https://i.ytimg.com/vi/mo-ZSY0THEU/maxresdefault.jpg">
    </h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="pink-text">{{ message.name }}</span>
            <p><span class="grey-text text-darken-3">{{ message.content }}</span></p>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default{
  name: 'Chat',
  props: ['name'],
  components: {
    NewMessage
  },
  data(){
    return {
      messages: []
    }
  },
  created(){
    let ref = db.collection('messages').orderBy('timestamp')

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll')
          })
        }
      })
    })
  }
}
</script>

<style>
.chat h2{
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span{
  font-size: 1.4em;
}
.chat .time{
  display: block;
  font-size: 0.8em;
}
.chat p{
  position: relative;
  display: inline-block;
  background: linear-gradient(#145f93 50%, #12364f 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

.messages{
  max-height: 300px;
  overflow: auto;
}

.messages::-webkit-scrollbar{
  width: 3px;
}

.messages::-webkit-scrollbar-track {
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb{
  background: #aaa;
}

</style>
