<script setup>
import { computed, onMounted, provide } from '@vue/runtime-core'
import { io } from 'socket.io-client'
import { useStore } from 'vuex'

const store = useStore()
const token = computed(() => JSON.parse(localStorage.getItem('token')))

onMounted(() => {
	if (!token.value || token === '') return false

	const socket = io(store.state.baseUrl, {
		extraHeaders: { 'x-token': token.value },
	})

	provide('socket', socket)

	//sockets started
	socket.on('channels-list', (payload) => {
		store.commit('setChannelsList', payload)
	})
	socket.on('current-channel', (payload) => {
		store.commit('setCurrentChannel', payload)
	})
	socket.on('current-members', (payload) => {
		store.commit('setCurrentMembers', payload)
	})
	socket.on('current-messages', (payload) => {
		if (payload.length == 0) {
			store.commit('setDefaultMessages')
		} else {
			store.commit('setCurrentMessages', payload)
		}
	})

	//sockets updates
	socket.on('new-channel', (payload) => {
		store.commit('addChannel', payload)
	})
	socket.on('new-member', (payload) => {
		store.commit('addMember', payload)
	})
	socket.on('remove-member', (payload) => {
		store.commit('removeMember', payload)
	})
	socket.on('new-message', (payload) => {
		store.commit('addMessage', payload)
	})
	socket.on('remove-channel', (payload) => {
		const newList = [...store.state.channelsList].filter(
			(ch) => ch._id !== payload._id
		)
		store.commit('setChannelsList', newList)
	})
	socket.on('channel-updated', (payload) => {
		const channelsUpdated = [...store.state.channelsList].map((ch) =>
			ch._id === payload._id ? payload : ch
		)
		store.commit('setChannelsList', channelsUpdated)
		if (store.state.currentChannel._id === payload._id)
			store.commit('setCurrentChannel', payload)
	})

	socket.on('connect', () => {
		console.log('Socket connected')
	})
	socket.on('disconnect', () => {
		console.log('Socket disconnected')
	})
})
</script>

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
