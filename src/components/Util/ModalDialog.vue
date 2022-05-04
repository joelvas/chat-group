<script setup>
import { ref } from '@vue/reactivity'
import { useCssModule } from '@vue/runtime-dom'
const style = useCssModule()
const props = defineProps(['modal'])
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
			:class="[style.modal, !modal ? style.modalOff : '']"
			id="modal"
			@click="close"
		>
			<slot v-if="modal" />
		</div>
	</teleport>
</template>
<style module>
.modal {
	position: absolute;
	z-index: 100;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	display: flex;
	margin: auto;
	background: rgba(0, 0, 0, 0.356);
	transition: opacity 0.3s ease, transform 0.05s ease;
}
.modalOff {
	opacity: 0;
	transform: scale(0.0000001, 0.000001);
	transition: transform 1s ease, opacity 0.2s ease;
}
</style>
