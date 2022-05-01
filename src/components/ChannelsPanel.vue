<script setup>
import { ref } from '@vue/reactivity'
import { computed, inject, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'

const style = useCssModule()
const store = useStore()
const socket = inject('socket')
const channels = computed(() => store.state.channelsList)
const emit = defineEmits(['goToMembers'])

const handleGoChannel = (channel) => {
	emit('goToMembers')
	socket.emit('join-channel', channel)
	store.commit('setCurrentMembers', [])
	store.commit('setCurrentMessages', [])
	store.commit('setCurrentChannel', channel)
}
const getAbrev = (name) => {
	const abrev = name
		.toUpperCase()
		.split(' ')
		.slice(0, 2)
		.map((word) => word.substring(0, 1))
		.join('')
	return abrev
}
</script>

<template>
	<div :class="style.channelsPanel">
		<div :class="style.searchInput">
			<span class="material-icons">search</span>
			<input type="text" placeholder="Search" />
		</div>
		<ul :class="style.channelsList">
			<li
				v-for="(channel, i) in channels"
				:key="i"
				@click="handleGoChannel(channel)"
			>
				<span>{{ getAbrev(channel.name) }}</span>
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
	width: 100%;
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
}
.channelsList li span:nth-child(1) {
	width: 1.5rem;
	height: 1.5rem;
	background: var(--primary-bg-color);
	padding: 0.3rem;
	display: flex;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
}
</style>
