<script setup>
import { inject, ref, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'

const style = useCssModule()
const store = useStore()
const socket = inject('socket')
const emit = defineEmits(['closeModal', 'goToMembers'])

const name = ref('')
const description = ref('')

const handleNewRoom = () => {
	const errors = validateFields()
	if (errors.length > 0) {
		console.log(JSON.stringify(errors))
		return false
	}

	const channel = { name: name.value, description: description.value }
	socket.emit('create-channel', channel, (payload) => {
		store.commit('setCurrentChannel', payload)
		store.commit('setCurrentMembers', [store.state.user])
		store.commit('setDefaultMessages')
		name.value = ''
		description.value = ''
		emit('goToMembers')
		emit('closeModal')
	})
}
const validateFields = () => {
	let errors = []
	const inputs = [name.value, description.value]
	if (inputs.includes('')) {
		errors.push('All fields required.')
	}
	return errors
}
</script>

<template>
	<div :class="style.newChannelForm">
		<span>NEW CHANNEL</span>
		<input type="text" v-model="name" placeholder="Enter a name" />
		<textarea
			v-model="description"
			cols="30"
			rows="5"
			placeholder="Enter a description"
			@keydown.enter="handleNewRoom"
		></textarea>
		<div>
			<button type="button" @click="handleNewRoom">Save</button>
		</div>
	</div>
</template>

<style module>
.newChannelForm {
	background: var(--secondary-bg-color);
	width: 21rem;
	border-radius: 10px;
	padding: 1rem 1rem;
	margin: 1rem;
	margin: auto;
	display: flex;
	flex-flow: column;
	gap: 1rem;
}
.newChannelForm input {
	border: none;
	border-radius: 5px;
	outline: none;
	padding: 0.6rem 1rem;
	background: var(--primary-bg-color);
	font-size: 0.9rem;
	color: white;
}
.newChannelForm textarea {
	border: none;
	border-radius: 5px;
	outline: none;
	padding: 0.6rem 1rem;
	background: var(--primary-bg-color);
	font-size: 0.9rem;
	font-family: var(--font-family);
	color: white;
	resize: none;
}
.newChannelForm div {
	display: flex;
	justify-content: right;
}
.newChannelForm div button {
	padding: 0.5rem 1.5rem;
	border: none;
	border-radius: 5px;
	background: var(--blue-dark);
	color: white;
	cursor: pointer;
}
.newChannelForm span {
	font-size: 1rem;
	font-weight: bold;
	text-align: left;
}
</style>
