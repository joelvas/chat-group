<script setup>
import { ref } from '@vue/reactivity'
import { useCssModule } from '@vue/runtime-dom'
const style = useCssModule()
const props = defineProps(['newChannel'])
const emit = defineEmits(['closeModal'])
const close = (event) => {
	if (event.target.id === 'modal') {
		emit('closeModal')
	}
}
</script>
<template>
	<teleport to="body">
		<div
			:class="[style.newChannel, !newChannel ? style.newChannelOff : '']"
			id="modal"
			@click="close"
		>
			<slot />
		</div>
	</teleport>
</template>
<style module>
.newChannel {
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	display: flex;
	margin: auto;
	background: rgba(0, 0, 0, 0.356);
	transition: opacity 0.3s ease, transform 0.05s ease;
}
.newChannelOff {
	opacity: 0;
	transform: scale(0.0000001, 0.000001);
	transition: transform 1s ease, opacity 0.2s ease;
}
</style>
