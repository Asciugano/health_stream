<template>
  <div>
    <input v-model.number="user_id" type="number" placeholder="User ID" />
    <button @click="fetchMetrics">Mostra Metriche</button>

    <table v-if="metrics.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Heart Rate</th>
          <th>Sleep Hours</th>
          <th>Stress Level</th>
          <th>Data Creazione</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="metric in metrics" :key="metric.id">
          <td>{{ metric.id }}</td>
          <td>{{ metric.heart_rate }}</td>
          <td>{{ metric.sleep_hours }}</td>
          <td>{{ metric.stress_level }}</td>
          <td>{{ formatDate(metric.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Nessuna metrica trovata</p>
  </div>
</template>

<script>
  import { ref } from "vue";
  import { getHealthData } from "../services/api.js";
  export default {
    setup() {
      const user_id = ref(1);
      const metrics = ref([]);

      const fetchMetrics = async () => {
        try {
          const res = await getHealthData(user_id.value);
          metrics.value = res.data;
        } catch(e) {
          console.error(e);
          metrics.value = [];
        }
      };

      const formatDate = (dateString) => {
        const d = new Date(dateString);
        return d.toLocaleString();
      };

      return { user_id, metrics, fetchMetrics, formDate };
    },
  };
</script>
