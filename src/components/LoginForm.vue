<script setup>
import { ref } from '@vue/reactivity'
import { useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'
import validate from '../helpers/validate-fields'

const store = useStore()
const style = useCssModule()
const email = ref('')
const password = ref('')
const handleLogin = () => {
	const errors = validateFields()
	if (errors.length > 0) {
		console.log(JSON.stringify(errors))
		return false
	}
	store.dispatch('loginWithLocal', {
		email: email.value,
		password: password.value,
	})
}
const validateFields = () => {
	let errors = []
	const inputs = [email.value, password.value]

	if (inputs.includes('')) {
		errors.push('All fields are required.')
	}
	if (!validate.email(email.value)) {
		errors.push('Invalid email.')
	}
	return errors
}
</script>
<template>
	<form :class="style.loginForm">
		<div :class="style.logo">{ joel.vas }</div>
		<div :class="style.title">Login</div>
		<label :class="style.inputLabel">
			<span class="material-icons">email</span>
			<input type="text" v-model="email" placeholder="Enter your email" />
		</label>
		<label :class="style.inputLabel">
			<span class="material-icons">lock</span>
			<input
				type="password"
				@keyup.enter="handleLogin"
				v-model="password"
				placeholder="Enter your password"
			/>
		</label>
		<button type="button" :class="style.submitButton" @click="handleLogin">
			Login
		</button>
	</form>
</template>
<style module>
.logo {
	font-size: 0.8rem;
	text-align: left;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.loginForm {
	background: inherit;
	color: var(--primary-text-color);
	max-width: 16rem;
	padding: 1rem;
	margin: auto;
	display: flex;
	flex-flow: column wrap;
	gap: 1.1rem;
}
.title {
	text-align: left;
	line-height: 1.2rem;
}
.title {
	font-size: 1.2rem;
	text-align: left;
}
.inputLabel {
	display: flex;
	flex-flow: row wrap;
	border: 1px solid var(--border-color);
	border-radius: 5px;
	background: var(--primary-bg-color);
	padding: 0.4rem;
	gap: 0.2rem;
}
.inputLabel input {
	flex-grow: 1;
	outline: none;
	border: none;
	background: inherit;
	color: var(--primary-text-color);
}
.inputLabel span {
	margin: auto;
	color: var(--outline-color);
}
.submitButton {
	cursor: pointer;
	border: none;
	border-radius: 5px;
	padding: 0.4rem 0.5rem;
	background: var(--blue-dark);
	color: var(--primary-text-color);
}
</style>
