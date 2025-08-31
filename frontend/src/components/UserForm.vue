<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="username" type="text" placeholder="Username" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Crea utente</button>
    <p v-if="message">{{ message }}</p>
  </form>
</template>

<script>
  import { ref } from "vue";
  import { createUser } from "../services/api.js"

  export default {
    setup() {
      const email = ref("");
      const username = ref("");
      const password = ref("");

      const message = ref("");

      const handleSubmit = async () => {
        try {
          const res = await createUser({ email: email.value, username: username.value, password: password.value });
          message.value = `Utente creato con ID: ${res.data.id}`;
        } catch(e) {
          message.value = "Errore: " + e.response.data.detail || e.message;
        }
      };

      return { email, username, password, handleSubmit, message };
    },
  };
</script>
