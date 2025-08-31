<template>
  <div>
    <h1>Gestione Utenti e metriche</h1>
    <UserForm />
    <HealthForm />
    <HealthList />
  </div>
</template>

<script>
  import UserForm from "./components/UserForm.vue"
  import HealthForm from "./components/HealthForm.vue"
  import HealthList from "./components/HealthList.vue"

  export default {
    components: { UserForm, HealthForm, HealthList },
  };
</script>
