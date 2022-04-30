<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
	<div>Profile</div>
	<button @click="router.push({ name: 'home' })">return</button>
</template>

<style></style>
