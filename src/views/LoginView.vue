<script setup>
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import LoginWithSocials from '../components/LoginWithSocials.vue'
import { inject, ref } from '@vue/runtime-core'
import { useCssModule } from '@vue/runtime-dom'

const gAuth = inject('gAuth')
const style = useCssModule()
const isLoginForm = ref(true)
</script>
<template>
	<div :class="style.loginCard">
		<login-form v-if="isLoginForm" />
		<register-form v-if="!isLoginForm" />
		<login-with-socials
			:isLoginForm="isLoginForm"
			@changeForm="isLoginForm = !isLoginForm"
		/>
	</div>
</template>

<style module>
.loginCard {
	border-radius: 5px;
	background: var(--secondary-bg-color);
	max-width: 20rem;
	margin: 4rem auto 0 auto;
	padding: 0.5rem 0;
}
@media (min-width: 500px) {
	.loginCard {
		border: 1px solid var(--outline-color);
	}
}
</style>
