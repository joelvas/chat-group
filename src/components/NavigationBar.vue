<script setup>
import { useCssModule } from '@vue/runtime-dom'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const style = useCssModule()
const router = useRouter()
const store = useStore()
const returnChat = () => {
	router.push({ name: 'home' })
}
</script>
<template>
	<nav :class="style.navbar">
		<button :class="style.homeButton" type="button" @click="returnChat">
			Return to Chat
		</button>
	</nav>
</template>
<style module>
.navbar {
	display: flex;
	justify-content: right;
}
.homeButton {
	cursor: pointer;
	border: none;
	border-radius: 5px;
	background: inherit;
	padding: 0.2rem 0.5rem;
	color: var(--primary-text-color);
	margin: 0.2rem;
}
.homeButton:hover {
	background: var(--border-color);
}
</style>
