<script setup>
import { computed, onUpdated, ref, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'
const style = useCssModule()
const store = useStore()
const msgs = computed(() => store.state.currentMessages)
const getRandomProfileImg = (name) => {
	return (
		'https://ui-avatars.com/api/?background=random&name=' + name.split(' ')[0]
	)
}
const milisecToString = (date) => {
	const newDate = new Date(Number(date)).toString()
	const moment = newDate.substring(16, 18) > 11 ? 'PM' : 'AM'
	const string =
		newDate.substring(4, 10) + ' at ' + newDate.substring(16, 21) + ' ' + moment
	return string
}
const scrollToBottom = (query, smooth) => {
	const element = document.querySelector(query)
	if (smooth) {
		element.style.scrollBehavior = 'smooth'
	} else {
		element.style.scrollBehavior = 'initial'
	}
	element.scrollTop = element.scrollHeight
}
onUpdated(() => {
	scrollToBottom('#chatboxHistory', true)
})
</script>

<template>
	<ul :class="style.chatboxHistory" id="chatboxHistory">
		<li v-for="(msg, i) in msgs" :key="i">
			<img
				:src="msg.user.img ? msg.user.img : getRandomProfileImg(msg.user.name)"
				:class="style.msgImage"
				alt="user_img"
			/>
			<div :class="style.msgContent">
				<div :class="style.msgInfo">
					<span v-if="msg.user.name === store.state.user.name">You</span>
					<span v-else>{{ msg.user.name }}</span>
					<span>{{ milisecToString(msg.created_at) }}</span>
				</div>
				<span>{{ msg.text }}</span>
			</div>
		</li>
	</ul>
</template>

<style module>
.chatboxHistory {
	display: flex;
	flex-flow: column-reverse;
	padding: 1.5rem 1rem;
	margin: 0 0rem 0 0;
	height: 100%;
	overflow-y: auto;
	flex-grow: 1;
	gap: 2rem;
}
.chatboxHistory::-webkit-scrollbar {
	width: 0.6rem;
}
.chatboxHistory::-webkit-scrollbar-track {
	background-color: inherit;
	border-radius: 100px;
}
.chatboxHistory::-webkit-scrollbar-thumb {
	border-radius: 100px;
	border: 6px solid transparent;
	border-left: 0;
	border-right: 0;
	background-color: var(--outline-color);
}
.chatboxHistory::-webkit-scrollbar-thumb:hover {
	background-color: var(--border-color);
}
.chatboxHistory li {
	list-style: none;
	display: flex;
	align-items: center;
	gap: 0.8rem;
}
.msgIcon {
	font-size: 2.5rem;
}
.msgImage {
	width: 2.1rem;
  height: 2.1rem;
  object-fit: cover;
	padding: 0.2rem;
	border-radius: 50%;
}
.msgContent {
	display: flex;
	flex-flow: column wrap;
	align-items: flex-start;
	gap: 0.5rem;
}
.msgContent > span {
	text-align: left;
  max-width: 100%;
  word-break: break-all;
}
.msgInfo {
	color: var(--secondary-text-color);
	display: flex;
}
.msgInfo span:nth-child(1) {
	font-size: 0.85rem;
}
.msgInfo span:nth-child(2) {
	font-size: 0.72rem;
	margin-left: 0.75rem;
	margin-top: auto;
	margin-bottom: auto;
}
</style>
