<script setup>
import { computed, useCssModule } from '@vue/runtime-dom'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const style = useCssModule()
const emit = defineEmits(['closeOptions'])
const userImg = computed(() => store.state.user.img)
const defaultProfileImg = computed(() => store.state.defaultProfileImg)
document.addEventListener('click', (event) => {
	if (
		event.target.id !== 'userOptions' &&
		event.target.id !== 'expandOptions'
	) {
		emit('closeOptions')
	}
})
</script>

<template>
	<div :class="style.userOptionsPanel" id="userOptions">
		<ul :class="style.userOptionsList">
			<li @click="router.push({ name: 'profile' })">
				<img
					:class="style.userImg"
					:src="userImg ? userImg : defaultProfileImg"
					alt="user_img"
				/>
				<span :class="style.userProfile">My profile</span>
			</li>
		</ul>
		<div :class="style.logout" @click="store.dispatch('logout')">
			<span class="material-icons">logout</span>
			<span>Logout</span>
		</div>
	</div>
</template>

<style module>
.userOptionsPanel {
	position: absolute;
	bottom: 2rem;
	right: 1.5rem;
	background: var(--third-bg-color);
	display: flex;
	flex-flow: column;
	width: 9rem;
	padding: 0.8rem;
	gap: 0.8rem;
	color: var(--primary-text-color);
	border: 1px solid var(--border-color);
	border-radius: 10px;
}
.userOptionsList {
	padding: 0;
	margin: 0;
	display: flex;
	flex-flow: column;
	list-style: none;
}
.userOptionsList li {
	cursor: pointer;
	margin: 0;
	padding: 0.5rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: 10px;
}
.userOptionsList li:hover {
	background: var(--border-color);
}
.userOptionsList li span:nth-child(1) {
	font-size: 1.2rem;
}
.userImg {
	width: 1.2rem;
	border-radius: 50%;
}
.userProfile {
	font-size: 0.8rem;
}
.logout {
	cursor: pointer;
	display: flex;
	padding: 0.5rem;
	align-items: center;
	gap: 0.5rem;
	border-radius: 10px;
	color: rgb(241, 55, 55);
}
.logout:hover {
	background: var(--border-color);
}
.logout span:nth-child(1) {
	font-size: 1.2rem;
}
.logout span:nth-child(2) {
	font-size: 0.8rem;
}
</style>
