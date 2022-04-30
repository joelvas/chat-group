<script setup>
import { ref } from '@vue/reactivity'
import { computed, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'

const style = useCssModule()
const store = useStore()
const members = computed(() => store.state.currentMembers)

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
		<div>MEMBERS</div>
		<ul :class="style.membersList">
			<li v-for="(member, i) in members" :key="i">
				<span class="material-icons">account_circle</span>
				<!--<img src="" alt="" v-if="member.img" />-->
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
.membersList li span:nth-child(1) {
	width: 1.5rem;
	height: 1.5rem;
	background: var(--primary-bg-color);
	padding: 0.3rem;
	display: flex;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
}
.membersPanel div {
	font-weight: bold;
}
</style>
