<script setup>
import { computed, inject, ref, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'

const style = useCssModule()
const store = useStore()
const socket = inject('socket')
const emit = defineEmits(['closeModal', 'closeAll'])
const currentChannel = computed(() => store.state.currentChannel)
const advancedOptions = ref(false)

const passwordInput = ref(false)

const handleEditRoom = (event) => {
	const { name, description, password } = event.target.elements
	let data = {
		name: name.value,
		description: description.value,
	}
	if (password) if (password.value !== '') data.password = password.value
	const errors = validateFields(data)
	if (errors.length > 0) {
		console.log(JSON.stringify(errors))
		return false
	}
	data._id = currentChannel.value._id
	socket.emit('edit-channel', data, (payload) => {
		if (payload) emit('closeModal')
	})
}
const validateFields = (data) => {
	let errors = []
	const inputs = Object.values(data)
	if (inputs.includes('')) {
		errors.push('All fields required.')
	}
	return errors
}
const onClickDeleteChannel = () => {
	socket.emit('delete-channel', currentChannel.value, (payload) => {
		if (payload) {
			store.commit('setDefaultChannel')
			store.commit('setDefaultMessages')
			emit('closeAll')
		}
	})
}
</script>

<template>
	<form :class="style.editChannelForm" @submit.prevent="handleEditRoom">
		<span>EDIT CHANNEL</span>
		<label>
			<span>Name:</span>
			<input
				type="text"
				name="name"
				:value="currentChannel.name"
				placeholder="Enter a name"
			/>
		</label>
		<label>
			<span>Description:</span>
			<textarea
				name="description"
				cols="30"
				rows="5"
				:value="currentChannel.description"
				placeholder="Enter a description"
				@keydown.enter="handleNewRoom"
			></textarea>
		</label>
		<div
			:class="style.advancedOptions"
			@click="advancedOptions = !advancedOptions"
		>
			<span>Advanced options</span>
			<span
				class="material-icons"
				:class="advancedOptions ? style.expandLess : style.expandMore"
				>expand_more</span
			>
		</div>
		<div :class="style.advancedOptionsContainer" v-if="advancedOptions">
			<input
				v-if="!passwordInput"
				@click="passwordInput = true"
				:class="style.passwordButton"
				type="button"
				:value="!passwordInput ? 'Set Password' : 'Change Password'"
			/>
			<label v-if="passwordInput">
				<span>Password:</span>
				<input
					type="text"
					name="password"
					placeholder="Enter a password"
					:value="currentChannel.password"
				/>
			</label>
			<input
				@click="onClickDeleteChannel"
				:class="style.deleteChannelButton"
				type="button"
				value="Delete Channel"
			/>
		</div>

		<button type="submit" :class="style.submitButton">Save</button>
	</form>
</template>

<style module>
.editChannelForm {
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
.editChannelForm span {
	font-size: 1rem;
	font-weight: bold;
	text-align: left;
}
.editChannelForm label {
	display: flex;
	flex-flow: column;
	gap: 0.1rem;
	font-size: 0.9rem;
	color: white;
}
.editChannelForm label span {
	font-size: 0.8rem;
}
.editChannelForm label input {
	border: none;
	padding: 0.6rem 0.8rem;
	border-radius: 5px;
	background: var(--primary-bg-color);
	color: white;
	outline: none;
}
.editChannelForm textarea {
	border: none;
	outline: none;
	padding: 0.6rem 0.8rem;
	border-radius: 5px;
	background: var(--primary-bg-color);
	font-family: var(--font-family);
	color: white;
	word-break: break-all;
	resize: none;
}
.submitButton {
	padding: 0.5rem 1.5rem;
	border: none;
	margin-left: auto;
	max-width: 5rem;
	border-radius: 5px;
	background: var(--blue-dark);
	color: white;
	cursor: pointer;
}
.advancedOptionsContainer {
	display: flex;
	flex-flow: column;
	gap: 0.5rem;
}
.passwordButton {
	cursor: pointer;
	border: 1px solid var(--border-color);
	border-radius: 5px;
	padding: 0.5rem 0;
	background: inherit;
	color: var(--primary-text-color);
}
.passwordButton:hover {
	background: var(--border-color);
}
.deleteChannelButton {
	cursor: pointer;
	border: 1px solid var(--red-dark);
	border-radius: 5px;
	background: inherit;
	color: var(--red-dark);
	padding: 0.5rem 0;
}
.deleteChannelButton:hover {
	background: var(--red-dark);
	color: var(--primary-text-color);
}
.advancedOptions {
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	cursor: pointer;
	padding: 0.3rem 0;
}
.advancedOptions:hover span:nth-child(1) {
	text-decoration: underline;
}
.advancedOptions span:nth-child(1) {
	font-size: 0.9rem;
	font-weight: initial;
}
.expandMore {
	transition: transform 0.5s;
}
.expandLess {
	transform: rotate(180deg);
	transition: transform 0.5s;
}
</style>
