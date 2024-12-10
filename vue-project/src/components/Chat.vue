<template>
  <div class="chat-container">
    <div class="messages" ref="messagesContainer">
      <div v-if="messages.length > 0">
        <div v-for="message in messages" :key="message.id" class="message">
          <div
            :class="
              message.sender_id === currentUserId ? 'message-sent' : 'message-received'
            "
          >
            <span class="message-sender">{{ message.user_id }}</span>
            <p class="message-content">{{ message.message }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Нет сообщений</p>
      </div>

      <div class="chat-input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Введите сообщение..."
        />
        <button @click="sendMessage">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { fetchMessages, sendMessageAPI } from "@/api/api.js";

export default {
  name: "Chat",
  setup() {
    const route = useRoute();
    const chatId = route.params.chatId;
    const currentUserId = 1;
    const messages = ref([]);
    const newMessage = ref("");

    const getMessages = async () => {
      try {
        const response = await fetchMessages(chatId);
        console.log("API Response:", response);

        if (response && Array.isArray(response.messages)) {
          messages.value = response.messages;
        } else {
          console.error("Сообщения не найдены или неправильный формат данных");
          messages.value = [];
        }

        nextTick(() => {
          const messagesContainer = document.querySelector(".messages");
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        });
      } catch (error) {
        console.error("Ошибка при загрузке сообщений:", error);
        messages.value = [];
      }
    };

    const sendMessage = async () => {
      if (!newMessage.value.trim()) return;

      try {
        await sendMessageAPI(chatId, newMessage.value, currentUserId);
        newMessage.value = "";
        await getMessages();
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
      }
    };

    onMounted(() => {
      getMessages();
      setInterval(getMessages, 5000);
    });

    return {
      messages,
      newMessage,
      sendMessage,
      currentUserId,
    };
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f4f4f4;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  max-height: 500px;
}

.message {
  margin-bottom: 15px;
}

.message-sent {
  text-align: right;
}

.message-received {
  text-align: left;
}

.message-sender {
  font-weight: bold;
}

.message-content {
  background-color: #e0e0e0;
  padding: 8px;
  border-radius: 5px;
  display: inline-block;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;
}

.chat-input input {
  flex-grow: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.chat-input button {
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.chat-input button:hover {
  background-color: #45a049;
}
</style>
