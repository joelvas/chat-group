<script setup>
import { ref, useCssModule } from '@vue/runtime-dom'

const style = useCssModule()
const emit = defineEmits(['setPassword'])

const password = ref('')
const handleConfirmPassword = () => {
	if (password.value === '') {
		console.log('Enter a password!')
		return false
	}
	emit('setPassword', password.value)
}
</script>

<template>
	<div :class="style.confirmPassword">
		<span>CONFIRM PASSWORD</span>
		<input type="text" v-model="password" placeholder="Enter password" />
		<div>
			<button type="button" @click="handleConfirmPassword">Confirm</button>
		</div>
	</div>
</template>

<style module>
.confirmPassword {
	background: var(--secondary-bg-color);
	width: 21rem;
	border-radius: 10px;
	padding: 1rem 1rem;
	margin: 1rem;
	margin: auto;
	display: flex;
	flex-flow: column;
	gap: 1rem;
}
.confirmPassword input {
	border: none;
	border-radius: 5px;
	outline: none;
	padding: 0.6rem 1rem;
	background: var(--primary-bg-color);
	font-size: 0.9rem;
	color: white;
}
.confirmPassword div {
	display: flex;
	justify-content: right;
}
.confirmPassword div button {
	padding: 0.5rem 1.5rem;
	border: none;
	border-radius: 5px;
	background: var(--blue-dark);
	color: white;
	cursor: pointer;
}
.confirmPassword span {
	font-size: 1rem;
	font-weight: bold;
	text-align: left;
}
</style>
