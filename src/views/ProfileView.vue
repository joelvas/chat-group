<script setup>
import { useRouter } from 'vue-router'
import ProfileInfo from '../components/ProfileInfo.vue'
import ChangeInfoForm from '../components/ChangeInfoForm.vue'
import NavigationBar from '../components/NavigationBar.vue'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import axios from 'axios'
import { useCssModule } from '@vue/runtime-dom'

const router = useRouter()
const style = useCssModule()
const store = useStore()
const profileInfo = ref(true)
const headers = {
	'x-token': store.state.token,
}
const updateInfo = async (data) => {
	const res = await axios
		.put(store.state.baseUrl + '/api/users/' + store.state.user._id, data, {
			headers,
		})
		.catch((err) => {
			if (err.response) console.log(err.response.data)
		})
	if (res && res.status === 200) {
		store.dispatch('updateUser', res.data)
		profileInfo.value = true
	}
}
const updateImage = async (image) => {
  
}
</script>
<template>
	<navigation-bar />
	<main :class="style.mainContainer">
		<div :class="style.backButtonContainer" v-if="!profileInfo">
			<button @click="profileInfo = true">
				<span class="material-icons"> chevron_left </span>
				Back
			</button>
		</div>
		<profile-info v-if="profileInfo" @openEditPanel="profileInfo = false" />
		<change-info-form
			v-else
			@updateInfo="updateInfo"
			@openInfoPanel="profileInfo = true"
		/>
	</main>
</template>

<style module>
.backButtonContainer {
	display: flex;
}
.backButtonContainer > button {
	display: flex;
	align-items: center;
	cursor: pointer;
	background: inherit;
	color: var(--blue-dark);
	border: none;
}
.mainContainer {
	max-width: 50rem;
	margin: auto;
	display: flex;
	flex-flow: column;
}
</style>
