<script setup>
import { inject, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'

const style = useCssModule()
const gAuth = inject('gAuth')
const store = useStore()
const props = defineProps(['isLoginForm'])
const emit = defineEmits(['changeForm'])

const handleGoogleLogin = async () => {
	const googleUser = await gAuth.signIn().catch((err) => {
		if (err.response) {
			console.log(err.response.data)
		}
	})
	if (googleUser) {
		const id_token = googleUser.wc
			? googleUser.wc.id_token
			: googleUser.xc.id_token
		await store.dispatch('loginWithGoogle', { id_token })
	}
}
</script>
<template>
	<div :class="style.container">
		<div :class="style.title">Or continue with this social porfile</div>
		<div :class="style.socialButtonsContainer">
			<img
				:class="style.socialButton"
				src="../assets/google-icon.svg"
				alt="google-icon"
				@click="handleGoogleLogin"
			/>
			<img
				:class="style.socialButton"
				src="../assets/facebook-icon.svg"
				alt="facebook-icon"
			/>
		</div>
		<div :class="style.goLogin" v-if="isLoginForm">
			<p>Don't you have an account?</p>
			<p @click="emit('changeForm')">Register</p>
		</div>
		<div :class="style.goLogin" v-if="!isLoginForm">
			<p>Already a member?</p>
			<p @click="emit('changeForm')">Login</p>
		</div>
	</div>
</template>

<style module>
.container {
	max-width: 16rem;
	margin: auto;
	padding: 0 1rem 1rem 1rem;
	display: flex;
	flex-flow: column wrap;
	gap: 0.6rem;
}
.title {
	font-size: 0.75rem;
	color: var(--outline-color);
}
.socialButtonsContainer {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
}
.socialButton {
	cursor: pointer;
	border-radius: 50%;
	border: 1px solid var(--outline-color);
	padding: 0.2rem;
	margin: 0.5rem;
}
.goLogin {
	display: flex;
	justify-content: center;
	gap: 0.3rem;
}
.goLogin p {
	font-size: 0.75rem;
	margin: 0;
}
.goLogin p:nth-child(1) {
	color: var(--outline-color);
}
.goLogin p:nth-child(2) {
	cursor: pointer;
	color: var(--blue-dark);
}
.goLogin p:nth-child(2):hover {
	text-decoration: underline;
}
</style>
