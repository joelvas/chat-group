<script setup>
import { ref } from '@vue/reactivity'
import { computed, useCssModule } from '@vue/runtime-dom'
import { useStore } from 'vuex'
import UserOptionsPanel from './UserOptionsPanel.vue'
const style = useCssModule()
const store = useStore()
const expandOptions = ref(false)
const userName = computed(() => store.state.user.name)
const userImg = computed(() => store.state.user.img)
const defaultProfileImg = computed(() => store.state.defaultProfileImg)
</script>

<template>
	<footer :class="style.footer">
		<img :src="userImg ? userImg : defaultProfileImg" alt="user_img" />
		<span :class="style.userName">{{ userName }}</span>
		<user-options-panel
			v-if="expandOptions"
			@closeOptions="expandOptions = false"
		/>
		<span
			class="material-icons"
			id="expandOptions"
			@click="expandOptions = !expandOptions"
			:class="[
				!expandOptions ? style.optionsButton : style.optionsButtonExpanded,
			]"
		>
			expand_less
		</span>
	</footer>
</template>

<style module>
.footer {
	position: relative;
	background: black;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	color: var(--secondary-text-color);
	padding: 0.5rem 1.5rem;
}
.footer .userName {
	flex-grow: 1;
	text-align: left;
	overflow: hidden;
}
.footer > img {
	width: 1.4rem;
	height: 1.4rem;
  object-fit: cover;
	border-radius: 50%;
}
.optionsButton {
	cursor: pointer;
	transition: all 0.5s;
}
.optionsButtonExpanded {
	transition: all 0.5s;
	cursor: pointer;
	transform: rotate(180deg);
}
</style>
