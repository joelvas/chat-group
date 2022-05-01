<script setup>
import { computed, useCssModule } from '@vue/runtime-dom'
import ChatBoxHistory from '../components/ChatBoxHistory.vue'
import ChatBoxEntry from '../components/ChatBoxEntry.vue'
import SpinnerLoader from '../components/Util/SpinnerLoader.vue'

import { useStore } from 'vuex'
const style = useCssModule()
const store = useStore()
const currentChannel = computed(() => store.state.currentChannel)
const props = defineProps(['sideMenu'])
const emit = defineEmits(['toggleSideMenu'])
const hasMessages = computed(() => {
	return store.state.currentMessages.length > 0 ? true : false
})
</script>

<template>
	<section :class="style.chatboxContainer">
		<nav :class="style.chatboxNavbar">
			<span
				class="material-icons"
				@click="emit('toggleSideMenu')"
				:class="style.openSideBarButton"
				v-if="!sideMenu"
			>
				menu
			</span>
			<span
				class="material-icons"
				:class="sideMenu ? style.closeSideBarButton : style.openSideBarButton"
				@click="emit('toggleSideMenu')"
				v-if="sideMenu"
			>
				close
			</span>
			<span :class="style.channelName">
				{{ currentChannel.name.toUpperCase() }}
			</span>
		</nav>
		<chat-box-history v-if="hasMessages" />
		<spinner-loader v-if="!hasMessages" />
		<chat-box-entry />
	</section>
</template>

<style module>
.chatboxContainer {
	height: 100vh;
	display: flex;
	flex-grow: 1;
	flex-flow: column;
}
.chatboxNavbar {
	display: flex;
	flex-flow: row;
	gap: 2rem;
	align-items: center;
	padding: 0.8rem 1.5rem;
	box-shadow: 0 0 4px black;
	height: var(--navbar-height);
}
.channelName {
	font-weight: bold;
}
.openSideBarButton {
	cursor: pointer;
	padding: 0.2rem 0.3rem;
	border-radius: 5px;
}
.closeSideBarButton {
	cursor: pointer;
	padding: 0.2rem 0.3rem;
	border-radius: 5px;
	background: var(--secondary-bg-color);
}
</style>
