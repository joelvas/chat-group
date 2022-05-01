<script setup>
import { useCssModule } from '@vue/runtime-dom'

const style = useCssModule()
</script>
<template>
	<div :class="style.loaderContainer">
		<div :class="style.loader"></div>
	</div>
</template>
<style module>
.loaderContainer{
  display: flex;
  justify-content: center;
  flex-grow: 1;
}
.loader {
  margin-top: 3rem;
	width: 1.2rem;
	height: 1.2rem;
	border-top: 4px solid var(--blue-dark);
	border-bottom: 4px solid var(--blue-dark);
	border-left: 4px solid transparent;
	border-right: 4px solid transparent;
	border-radius: 50%;
	animation: spinner 1s linear infinite;
}
@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
