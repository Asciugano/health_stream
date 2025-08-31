<template>
  <form @submit.prevent="handleSubmit">
    <input v-model.number="user_id" type="number" placeholder="User ID" required />
    <input v-model.number="heart_rate" type="number" step="0.1" placeholder="Heart Rate" required />
    <input v-model.number="sleep_hours" type="number" step="0.1" placeholder="Sleep Hours" required />
    <input v-model.number="stress_level" type="number" step="0.1" placeholder="Stress Level" required />
    <button type="submit">Aggiungi metrica</button>
    <p v-if="message">{{ message }}</p>
  </form>
</template>

<script>
  import { ref } from "vue";
  import { createHealthData } from "../services/api.js"

  export default {
    setup() {
      const user_id = ref(1);
      const heart_rate = ref(0);
      const sleep_hours = ref(0);
      const stress_level = ref(0);

      const message = ref("");

      const handleSubmit = async () => {
        try {
          const res = await createHealthData({ user_id: user_id.value, heart_rate: heart_rate.value, sleep_hours: sleep_hours.value, stress_level: stress_level.value });
          message.value = `Metrica creata con ID: ${res.data.id}`;
        } catch(e) {
          message.value = "Errore: " + e.response.data.detail || e.message
        }
      };
      
      return { user_id, heart_rate, sleep_hours, stress_level, handleSubmit, message };
    },
  };
</script>
