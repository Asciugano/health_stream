<script setup>
  import { ref, onMounted } from "vue";

  const message = ref("Loading...");

  onMounted(async () => {
    const res = await fetch("http://127.0.0.1:8000/");
    const data await res.json();
    message.value = data.message;
  });
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">HealthStram Frontend</h1>
    <p>{{ message }}</p>
  </div>
</template>
