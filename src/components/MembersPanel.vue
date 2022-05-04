<script setup>
import { ref } from '@vue/reactivity'
import { computed, useCssModule } from '@vue/runtime-dom'
import EditChannel from '../components/EditChannel.vue'
import ModalDialog from '../components/Util/ModalDialog.vue'
import { useStore } from 'vuex'

const style = useCssModule()
const store = useStore()
const emit = defineEmits(['closePanel'])
const members = computed(() => store.state.currentMembers)
const currentChannel = computed(() => store.state.currentChannel)
const editChannel = ref(false)

const getRandomProfileImg = (name) => {
	return (
		'https://ui-avatars.com/api/?background=random&name=' + name.split(' ')[0]
	)
}
const getRandomChannelImg = (name) => {
	const arrName = name.split(' ')
	const defaultImg =
		arrName.length < 2 ? arrName[0] : arrName[0] + '+' + arrName[1]
	return 'https://ui-avatars.com/api/?background=random&name=' + defaultImg
}
const closeAll = () => {
	editChannel.value = false
	emit('closePanel')
}
</script>

<template>
	<div :class="style.membersPanel">
		<div>
			<img :src="getRandomChannelImg(currentChannel.name)" alt="" />
			<span>{{ currentChannel.name }}</span>
			<span class="material-icons" @click="editChannel = true">edit</span>
			<modal-dialog :modal="editChannel" @closeModal="editChannel = false">
				<edit-channel
					@closeModal="editChannel = false"
					@closeAll="closeAll"
				></edit-channel>
			</modal-dialog>
		</div>
		<p :class="style.channelDescription">
			{{ currentChannel.description }}
		</p>
		<div>Active Members</div>
		<ul :class="style.membersList">
			<li v-for="(member, i) in members" :key="i">
				<img
					:src="member.img ? member.img : getRandomProfileImg(member.name)"
					alt=""
				/>
				<span>{{ member.name }}</span>
			</li>
		</ul>
	</div>
</template>

<style module>
.membersPanel {
	padding: 1rem 1rem 0rem 1rem;
	flex-grow: 1;
	text-align: left;
	display: flex;
	flex-flow: column;
	overflow-y: auto;
	align-items: stretch;
}
.channelDescription {
	font-size: 0.9rem;
	word-wrap: break-word;
	word-break: break-all;
	color: var(--secondary-text-color);
	font-size: 0.9rem;
}
.membersList {
	display: flex;
	flex-flow: column;
	gap: 1rem;
	padding: 0 1rem;
	padding: 0;
	flex-grow: 1;
	overflow-y: auto;
	transition: opacity 0.5s;
}
.membersList::-webkit-scrollbar {
	width: 0.4rem;
}
.membersList::-webkit-scrollbar-track {
	background-color: inherit;
	border-radius: 100px;
}
.membersList::-webkit-scrollbar-thumb {
	border-radius: 100px;
	border: 6px solid transparent;
	border-left: 0;
	border-right: 0;
	background-color: var(--outline-color);
}
.membersList::-webkit-scrollbar-thumb:hover {
	background-color: var(--border-color);
}
.membersList li {
	cursor: default;
	display: flex;
	align-items: center;
	color: var(--secondary-text-color);
	gap: 0.5rem;
}
.membersList li img:nth-child(1) {
	width: 2rem;
	height: 2rem;
	object-fit: cover;
	background: var(--primary-bg-color);
	display: flex;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
}
.membersPanel > div {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
		'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.membersPanel > div img {
	width: 2rem;
}
.membersPanel > div span:nth-child(2) {
	font-weight: bold;
	text-transform: capitalize;
	flex-grow: 1;
	font-size: 1rem;
	padding-left: 0.5rem;
}
.membersPanel > div span:nth-child(3) {
	cursor: pointer;
	font-size: 1.2rem;
	color: var(--primary-text-color);
	padding: 0.4rem 0.4rem;
	border-radius: 5px;
	margin-right: 0.1rem;
}
.membersPanel > div span:nth-child(3):hover {
	background: var(--primary-bg-color);
}
</style>
