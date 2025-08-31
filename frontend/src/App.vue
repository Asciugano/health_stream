<script setup>
  import { ref, onMounted } from "vue";

  const message = ref([]);

  onMounted(async () => {
    const res = await fetch("http://localhost:8000/health/1");
    data.value = await res.json();
  });
</script>

<template>
  <div>
    <h1>Health Data</h1>
    <pre>{{ data }}</pre>
  </div>
</template>
