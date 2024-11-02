<script setup>
  import { useAxios } from '@/api/useAxios.js'

  const { getData } = useAxios()
</script>

<template>
  <div>Test</div>
  <button @click="getData">GET</button>
</template>

<style scoped></style>
