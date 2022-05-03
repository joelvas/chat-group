<script setup>
import { ref } from '@vue/reactivity'
import { computed, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'

const style = useCssModule()
const store = useStore()
const members = computed(() => store.state.currentMembers)
const getRandomProfileImg = (name) => {
	return (
		'https://ui-avatars.com/api/?background=random&name=' + name.split(' ')[0]
	)
}

const firstToUpperCase = (text) => {
	return text
		.split(' ')
		.map((word) => {
			return word
				.split('')
				.map((letter, i) => (i == 0 ? letter.toUpperCase() : letter))
				.join('')
		})
		.join(' ')
}
</script>

<template>
	<div :class="style.membersPanel">
		<div>{{ store.state.currentChannel.name.toUpperCase() }}</div>
		<p :class="style.channelDescription">
			{{ store.state.currentChannel.description }}
		</p>
		<div>ACTIVE MEMBERS</div>
		<ul :class="style.membersList">
			<li v-for="(member, i) in members" :key="i">
				<img
					:src="member.img ? member.img : getRandomProfileImg(member.name)"
					alt=""
				/>
				<span>{{ firstToUpperCase(member.name) }}</span>
			</li>
		</ul>
	</div>
</template>

<style module>
.membersPanel {
	padding: 1rem 0.5rem 0rem 1rem;
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
	background: var(--primary-bg-color);
	display: flex;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
}
.membersPanel div {
	font-weight: bold;
}
</style>
