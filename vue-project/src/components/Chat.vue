<template>
  <div class="chat-container">
    <div class="chat-title">
      <h2>{{ chatTitle }}</h2>
    </div>

    <div class="messages" ref="messagesContainer">
      <div v-if="messages.length > 0">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="getMessageClass(message)"
        >
          <span class="message-sender">
            {{
              message.user_id === currentUserId.value
                ? "Ви"
                : message.user_name || "Неизвестный пользователь"
            }}
          </span>

          <p class="message-content">{{ message.message }}</p>
        </div>
      </div>
      <div v-else>
        <p>Нет сообщений</p>
      </div>
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
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { fetchMessages, sendMessageAPI } from "@/api/api.js";

export default {
  name: "Chat",
  setup() {
    const route = useRoute();
    const chatId = route.params.chatId;
    const currentUserId = ref(null);
    const messages = ref([]);
    const newMessage = ref("");
    const messagesContainer = ref(null);
    const chatTitle = ref("");

    const scrollToBottom = () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      });
    };

    const getMessages = async () => {
      try {
        const response = await fetchMessages(chatId);
        if (response) {
          currentUserId.value = response.current_user_id;
          chatTitle.value = response.chat_title;
          messages.value = response.messages.map((msg) => ({
            id: msg.id,
            user_id: msg.user_id,
            user_name: msg.user_name,
            message: msg.message,
          }));
        } else {
          console.error("Сообщения не найдены или неправильный формат данных");
        }
        scrollToBottom();
      } catch (error) {
        console.error("Ошибка при загрузке сообщений:", error);
      }
    };

    const sendMessage = async () => {
      if (!newMessage.value.trim()) return;

      try {
        const message = await sendMessageAPI(chatId, newMessage.value);
        messages.value.push({
          id: message.id,
          user_id: currentUserId.value,
          user_name: "Ви",
          message: newMessage.value,
        });
        newMessage.value = "";
        scrollToBottom();
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
      }
    };

    const getMessageClass = (message) => {
      return [
        message.user_id === currentUserId.value ? "message-sent" : "message-received",
        "message",
      ];
    };

    onMounted(() => {
      getMessages();
      setInterval(getMessages, 5000);

      window.Echo.private(`chat.${chatId}`).listen(".message.sent", (event) => {
        messages.value.push({
          id: event.message.id,
          user_id: event.message.user_id,
          user_name: event.message.user_name,
          message: event.message.message,
        });
        scrollToBottom();
      });
    });

    return {
      messages,
      newMessage,
      sendMessage,
      currentUserId,
      messagesContainer,
      getMessageClass,
      chatTitle,
    };
  },
};
</script>
