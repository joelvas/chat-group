<script setup>
import { computed, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'

const style = useCssModule()
const store = useStore()
const emit = defineEmits(['openEditPanel'])
const profile = computed(() => store.state.user)
const defaultProfileImg = computed(() => store.state.defaultProfileImg)
const customDate = (date) => {
	const custom = new Date(Number(date)).toString()
	return custom.substring(4, 15)
}
const handleEditButton = () => {
	emit('openEditPanel')
}
</script>
<template>
	<div :class="style.profileContainer">
		<h2>Personal Info</h2>
		<div :class="style.profileInfo">
			<div :class="style.profileEdit">
				<div>
					<span>Profile</span>
					<span>Some info may be visible to other people</span>
				</div>
				<div>
					<button type="button" @click="handleEditButton">Edit</button>
				</div>
			</div>
			<div>
				<span>PHOTO</span>
				<img
					:class="style.profileImage"
					v-if="!profile.img"
					:src="defaultProfileImg"
				/>
				<img
					:class="style.profileImage"
					v-if="profile.img"
					:src="profile.img"
					:alt="profile.name"
				/>
			</div>
			<div>
				<span>NAME</span>
				<span>{{ profile.name }}</span>
			</div>
			<div>
				<span>BIO</span>
				<span>{{ profile.bio }}</span>
			</div>
			<div>
				<span>JOINING DATE</span>
				<span>{{ customDate(profile.created_at) }}</span>
			</div>
			<div>
				<span>EMAIL</span>
				<span>{{ profile.email }}</span>
			</div>
		</div>
	</div>
</template>
<style module>
.profileContainer {
	display: flex;
	flex-flow: column;
	margin: 0.5rem;
}
.profileInfo {
	display: flex;
	flex-flow: column;
}
.profileInfo > div {
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	padding: 1rem 1rem;
	text-align: left;
	align-items: center;
	border-bottom: 1px solid var(--border-color);
}
.profileInfo > div:nth-child(1) {
	border-bottom: 1px solid var(--border-color);
	justify-content: space-between;
}
.profileInfo > div:last-child {
	border: none;
}

.profileImage {
	width: 2.5rem;
	height: 2.5rem;
  object-fit: cover;
}

.profileEdit > div:nth-child(1) {
	display: flex;
	flex-flow: column;
}
.profileEdit div:nth-child(1) span:nth-child(1) {
	font-size: 1.3rem;
	font-weight: lighter;
}
.profileEdit div:nth-child(1) span:nth-child(2) {
	font-size: 0.8rem;
	color: var(--secondary-text-color);
	font-weight: lighter;
}

.profileEdit > div:nth-child(2) {
	display: flex;
	flex-flow: column;
	justify-content: center;
}
.profileEdit > div:nth-child(2) button {
	cursor: pointer;
	border: 1px solid var(--border-color);
	border-radius: 7px;
	padding: 0.4rem 1rem;
	background: inherit;
	color: var(--secondary-text-color);
}
.profileEdit > div:nth-child(2) button:hover {
	background: var(--border-color);
}

.profileInfo > div:not(:nth-child(1)) span:nth-child(1) {
	color: var(--secondary-text-color);
	font-size: 0.75rem;
	width: 35%;
}
.profileInfo > div:not(:nth-child(1)) span:not(:nth-child(1)) {
	word-wrap: break-word;
	font-weight: bold;
	max-width: 65%;
}
@media (min-width: 550px) {
	.profileInfo {
		display: flex;
		flex-flow: column;
		border: 1px solid var(--border-color);
		border-radius: 5px;
	}
	.profileInfo > div {
		justify-content: start;
		padding: 1.5rem;
	}
}
</style>
