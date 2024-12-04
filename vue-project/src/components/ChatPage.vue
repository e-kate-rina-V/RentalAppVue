<template>
  <div>
    <h1>Чат</h1>
    <div v-if="messages.length">
      <ul>
        <li v-for="message in messages" :key="message.id">
          {{ message.content }}
        </li>
      </ul>
    </div>
    <input v-model="newMessage" placeholder="Напишите сообщение..." />
    <button @click="sendMessage">Отправить</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchMessages, sendMessageToChat } from '@/api/api.js';

export default {
  name: 'ChatPage',
  props: ['chatId'],
  setup(props) {
    const messages = ref([]);
    const newMessage = ref('');

    const loadMessages = async () => {
      try {
        const response = await fetchMessages(props.chatId);
        messages.value = response;
      } catch (error) {
        console.error('Ошибка при загрузке сообщений:', error);
      }
    };

    const sendMessage = async () => {
      if (newMessage.value.trim()) {
        try {
          const message = await sendMessageToChat(props.chatId, newMessage.value);
          messages.value.push(message);
          newMessage.value = '';
        } catch (error) {
          console.error('Ошибка при отправке сообщения:', error);
        }
      }
    };

    onMounted(() => {
      loadMessages();
    });

    return {
      messages,
      newMessage,
      sendMessage,
    };
  },
};
</script>