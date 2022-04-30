<script setup></script>

<template>
	<router-view v-slot="{ Component }">
		<component :is="Component"></component>
	</router-view>
</template>

<style>
body {
	font-family: var(--font-family);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	font-size: 0.9rem;
	color: var(--primary-text-color);
  background: var(--secondary-bg-color);
	margin: 0;
}
:root {
	--primary-bg-color: #2f3237;
	--secondary-bg-color: #191a1d;
	--third-bg-color: #2d2e33;
	--primary-text-color: #e6e6e6;
	--secondary-text-color: #b8b8b8;
	--red-dark: #d20d38;
	--blue-dark: #2f80ed;
	--green-dark: #219653;
	--border-color: #3e3f46;
	--outline-color: #5e5f66;
	--navbar-height: 1.6rem;
	--font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
