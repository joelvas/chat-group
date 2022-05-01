<script setup>
import { useCssModule } from '@vue/runtime-dom'
import { useRouter } from 'vue-router'

const style = useCssModule()
const router = useRouter()
</script>
<template>
	<nav :class="style.navbar">
		<button
			:class="style.homeButton"
			type="button"
			@click="router.push({ name: 'home' })"
		>
			Home
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
	border: 1px solid var(--border-color);
	border-radius: 5px;
	background: inherit;
	color: var(--primary-text-color);
	margin: 0.2rem;
}
.homeButton:hover {
	background: var(--border-color);
}
</style>
