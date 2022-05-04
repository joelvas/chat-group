<script setup>
import { inject, ref, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'
const style = useCssModule()
const store = useStore()
const text = ref('')
const socket = inject('socket')
const handleMessage = () => {
	socket.emit('create-message', {
		text: text.value,
		channel: store.state.currentChannel._id,
	})
	text.value = ''
}
</script>

<template>
	<div :class="style.input">
		<input
			type="text"
			placeholder="Type a message here"
			@keyup.enter="handleMessage"
			v-model="text"
		/>
		<span v-if="text !== ''" class="material-icons" @click="handleMessage"
			>send</span
		>
	</div>
</template>

<style module>
.input {
	display: flex;
	margin: 0.5rem 1rem 1rem 1rem;
	padding: 0.5rem;
	background: var(--border-color);
	border-radius: 10px;
	gap: 0.5rem;
}
.input input {
	background: inherit;
	flex-grow: 1;
	border: none;
	padding: 0.3rem 0.4rem;
	font-size: .9rem;
	outline: none;
	color: var(--secondary-text-color);
}
.input span {
	cursor: pointer;
	font-size: 1rem;
	padding: 0.3rem 0.4rem;
	border-radius: 5px;
	background: var(--blue-dark);
}
</style>
