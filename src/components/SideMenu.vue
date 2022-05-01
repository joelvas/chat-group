<script setup>
import { ref } from '@vue/reactivity'
import { computed, useCssModule } from '@vue/runtime-dom'
import ChannelsPanel from './ChannelsPanel.vue'
import MembersPanel from './MembersPanel.vue'
import NewChannel from '../components/NewChannel.vue'
import SideMenuFooter from '../components/SideMenuFooter.vue'
import ModalDialog from '../components/Util/ModalDialog.vue'
import SpinnerLoader from '../components/Util/SpinnerLoader.vue'
import { useStore } from 'vuex'

const style = useCssModule()
const store = useStore()
const emit = defineEmits(['toggleSideMenu'])
const props = defineProps(['sideMenu'])

const channelsPanel = ref(true)
const expandOptions = ref(false)
const newChannel = ref(false)

const hasChannels = computed(() => {
	return store.state.channelsList.length > 0 ? true : false
})
const hasMembers = computed(() => {
	return store.state.currentMembers.length > 0 ? true : false
})
</script>

<template>
	<aside :class="style.sideMenu">
		<nav :class="channelsPanel ? style.channelsNavbar : style.membersNavbar">
			<span
				v-if="!channelsPanel"
				:class="style.backButton"
				class="material-icons"
				@click="channelsPanel = true"
			>
				chevron_left
			</span>
			<div v-if="!channelsPanel">All Channels</div>
			<div v-if="channelsPanel">Channels</div>
			<span
				v-if="channelsPanel"
				:class="style.addChannelButton"
				@click="newChannel = true"
			>
				+
			</span>
			<span
				class="material-icons"
				:class="style.closeSideBarButton"
				@click="emit('toggleSideMenu')"
			>
				close
			</span>
		</nav>
		<modal-dialog :new-channel="newChannel" @closeModal="newChannel = false">
			<new-channel @closeModal="newChannel = false" />
		</modal-dialog>
		<spinner-loader
			v-if="(!hasChannels && channelsPanel) || (!hasMembers && !channelsPanel)"
		/>
		<channels-panel
			v-if="channelsPanel && hasChannels"
			key="channels"
			@goToMembers="channelsPanel = false"
		/>
		<members-panel v-if="!channelsPanel && hasMembers" key="members" />
		<side-menu-footer />
	</aside>
</template>

<style module>
.sideMenu {
	background: var(--secondary-bg-color);
	height: calc(100vh);
	display: flex;
	flex-flow: column;
}
.channelsNavbar {
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	align-items: center;
	padding: 0.8rem 1.5rem;
	box-shadow: 0 0 4px black;
	height: var(--navbar-height);
}
.channelsNavbar div {
	font-size: 1.1rem;
	padding: 0.15rem 0;
	font-weight: bold;
}
.channelsMembers div {
	font-size: 1rem;
	font-weight: bold;
}
.membersNavbar {
	display: flex;
	flex-flow: row;
	justify-content: left;
	align-items: center;
	padding: 0.85rem 1rem;
	box-shadow: 0 0 4px black;
	height: var(--navbar-height);
}
.addChannelButton {
	cursor: pointer;
	border: none;
	background: var(--primary-bg-color);
	color: var(--primary-text-color);
	padding: 0.1rem 0.4rem;
	border-radius: 5px;
}
.backButton {
	cursor: pointer;
	padding-left: 0;
	padding-left: 0;
}
.closeSideBarButton {
	display: none;
}
@media (max-width: 849px) {
	.closeSideBarButton {
		display: initial;
		cursor: pointer;
		padding: 0.2rem 0.3rem;
		border-radius: 5px;
		background: var(--secondary-bg-color);
		position: absolute;
		right: -3rem;
	}
}
</style>
