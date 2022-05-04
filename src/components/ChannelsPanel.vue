<script setup>
import { ref } from '@vue/reactivity'
import { computed, inject, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'
import ConfirmPassword from '../components/Util/ConfirmPassword.vue'
import ModalDialog from '../components/Util/ModalDialog.vue'

const style = useCssModule()
const store = useStore()
const socket = inject('socket')
const channels = computed(() => store.state.channelsList)
const emit = defineEmits(['goToMembers'])
const password = ref('')
const channelSelected = ref({})
const confirmPassword = ref(false)
const currentChannel = computed(() => store.state.currentChannel)
const handleGoChannel = (channel) => {
	if (channel._id === currentChannel._id) {
		emit('goToMembers')
		return false
	} else {
		if (channel.private && password.value !== '') {
			channel.password = password.value
			socket.emit('join-channel', channel, (payload) => {
				if (payload) {
					store.commit('setCurrentChannel', channel)
					emit('goToMembers')
				}
			})
		} else {
			store.commit('setCurrentMembers', [])
			store.commit('setLoadingMembers')
			emit('goToMembers')
			store.commit('setCurrentMessages', [])
			socket.emit('join-channel', channel, (payload) => {
				if (payload) {
					store.commit('setCurrentChannel', channel)
				}
			})
		}
	}
}
const openConfirmPassword = (channel) => {
	channelSelected.value = channel
	if (channel.private) confirmPassword.value = true
	else handleGoChannel(channel)
}
const setPassword = (pass) => {
	password.value = pass
	confirmPassword.value = false
	handleGoChannel(channelSelected.value)
}
const getRandomChannelImg = (name) => {
	const arrName = name.split(' ')
	const defaultImg =
		arrName.length < 2 ? arrName[0] : arrName[0] + '+' + arrName[1]
	return 'https://ui-avatars.com/api/?background=random&name=' + defaultImg
}
const onChangeSearchInput = (e) => {
	socket.emit('search-channel', e.target.value, (payload) => {
		store.commit('setChannelsList', payload)
	})
}
</script>

<template>
	<div :class="style.channelsPanel">
		<div :class="style.searchInput">
			<span class="material-icons">search</span>
			<input type="text" placeholder="Search" @input="onChangeSearchInput" />
		</div>
		<modal-dialog
			:modal="confirmPassword"
			@closeModal="confirmPassword = false"
		>
			<confirm-password @setPassword="setPassword" />
		</modal-dialog>
		<ul :class="style.channelsList">
			<li
				v-for="(channel, i) in channels"
				:key="i"
				@click="openConfirmPassword(channel)"
			>
				<img :src="getRandomChannelImg(channel.name)" :alt="channel.name" />
				<span>{{ channel.name.toUpperCase() }}</span>
			</li>
		</ul>
	</div>
</template>

<style module>
.channelsPanel {
	padding: 0rem 0.5rem 0rem 0rem;
	flex-grow: 1;
	display: flex;
	flex-flow: column;
	overflow-y: auto;
	align-items: stretch;
	max-width: 100%;
}
.searchInput {
	display: flex;
	color: var(--primary-text-color);
	background: var(--primary-bg-color);
	padding: 0.5rem;
	margin: 1rem 1rem 0 1rem;
	border-radius: 10px;
}
.searchInput input {
	border: none;
	outline: none;
	background: inherit;
	color: inherit;
	font-size: 1rem;
	flex-grow: 1;
	width: 100%;
}
.channelsList {
	display: flex;
	flex-flow: column;
	gap: 1rem;
	padding: 0 1rem;
	margin-right: 0.5rem;
	flex-grow: 1;
	overflow-y: auto;
	transition: opacity 0.5s;
}

.channelsList::-webkit-scrollbar {
	width: 0.4rem;
}
.channelsList::-webkit-scrollbar-track {
	background-color: inherit;
	border-radius: 100px;
}
.channelsList::-webkit-scrollbar-thumb {
	border-radius: 100px;
	border: 6px solid transparent;
	border-left: 0;
	border-right: 0;
	background-color: var(--outline-color);
}
.channelsList::-webkit-scrollbar-thumb:hover {
	background-color: var(--border-color);
}
.channelsList li {
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.3rem;
	border-radius: 5px;
}
.channelsList li:hover {
	background: var(--primary-bg-color);
}
.channelsList li img:nth-child(1) {
	width: 2rem;
	background: var(--primary-bg-color);
	display: flex;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
}
</style>
