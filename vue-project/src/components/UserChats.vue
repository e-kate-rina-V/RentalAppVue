<template>
  <div class="user-chats">
    <h1>Мої чати</h1>
    <ul>
      <li v-for="chat in chats" :key="chat.id">
        <router-link :to="`/chat/${chat.id}`" id="chat-router">
          Чат з {{ getParticipantName(chat) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchUserChats } from "@/api/api.js";

export default {
  name: "UserChats",
  setup() {
    const chats = ref([]);
    const currentUserId = ref(null);

    const loadChats = async () => {
      try {
        const response = await fetchUserChats();
        chats.value = response.chats;
        currentUserId.value = response.current_user_id;
      } catch (error) {
        console.error("Ошибка при загрузке чатов:", error);
      }
    };

    const getParticipantName = (chat) => {
      const otherUser = chat.user1_id === currentUserId.value ? chat.user2 : chat.user1;
      return otherUser.name || `Пользователь ${otherUser.id}`;
    };

    onMounted(() => {
      loadChats();
    });

    return { chats, getParticipantName };
  },
};
</script>
