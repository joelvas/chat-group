<script setup>
import { computed, useCssModule } from '@vue/runtime-dom'
import ImageUploader from '../components/Util/ImageUploader.vue'
import { useStore } from 'vuex'

const style = useCssModule()
const store = useStore()
const emit = defineEmits(['updateInfo'])
const profile = computed(() => store.state.user)
const defaultProfileImg = computed(() => store.state.defaultProfileImg)

let formData = new FormData()
const handleImage = (img) => {
	formData.append('image', img)
}
const handleForm = (event) => {
	const { name, bio, phone } = event.target.elements
	const data = {
		name: name.value,
		bio: bio.value,
		phone: phone.value,
	}
	const errors = validateFields(data)
	if (errors.length > 0) console.log(JSON.stringify(errors))
	else {
		formData.append('name', data.name)
		formData.append('bio', data.bio)
		formData.append('phone', data.phone)
		emit('updateInfo', formData)
	}
}
const validateFields = (data) => {
	let errors = []
	if (data.name == '') errors.push('Name is required')
	if (data.phone.length !== 9 && data.phone.length !== 0)
		errors.push('Phone must have 9 characters.')
	return errors
}
</script>
<template>
	<form
		name="changeInfoForm"
		@submit.prevent="handleForm"
		:class="style.changeInfoForm"
	>
		<span>Change Info</span>
		<span>Changes will be reflected to every services</span>
		<image-uploader
			@handleImage="handleImage"
			:profile-image="profile.img ? profile.img : defaultProfileImg"
		/>
		<label>
			Name
			<input
				type="text"
				name="name"
				:value="profile.name"
				placeholder="Enter your name.."
			/>
		</label>
		<label>
			Bio
			<textarea
				id=""
				cols="30"
				rows="10"
				name="bio"
				:value="profile.bio"
				placeholder="Enter your bio.."
			></textarea>
		</label>
		<label>
			Phone
			<input
				type="number"
				:value="profile.phone"
				name="phone"
				placeholder="Enter your phone..."
			/>
		</label>
		<button type="submit">Save</button>
	</form>
</template>
<style module>
.changeInfoForm {
	display: flex;
	flex-flow: column;
	margin: 0.5rem;
	padding: 1.5rem 0rem;
}
.changeInfoForm > span {
	text-align: left;
	padding: 0 1rem;
}
.changeInfoForm > span:nth-child(1) {
	font-weight: lighter;
	font-size: 1.3rem;
}
.changeInfoForm > span:nth-child(2) {
	font-size: 0.8rem;
	color: var(--secondary-text-color);
}
.changeInfoForm > label {
	display: flex;
	flex-flow: column;
	text-align: left;
	gap: 0.3rem;
	padding: 0 1rem;
	margin: 0.5rem 0;
}
.changeInfoForm label > input {
	background: inherit;
	color: var(--primary-text-color);
	border: 1px solid var(--border-color);
	border-radius: 5px;
	padding: 0.5rem 1rem;
	outline: none;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type='number'] {
	-moz-appearance: textfield;
}
.changeInfoForm label > textarea {
	font-family: var(--font-family);
	color: var(--primary-text-color);
	background: inherit;
	border: 1px solid var(--border-color);
	border-radius: 5px;
	padding: 0.5rem 1rem;
	outline: none;
	resize: none;
}
.changeInfoForm > button {
	cursor: pointer;
	margin-left: auto;
	padding: 0.3rem 1rem;
	margin-right: 1rem;
	margin-top: 1rem;
	border-radius: 5px;
	max-width: 5rem;
	background: var(--blue-dark);
	border: none;
	color: var(--primary-text-color);
}
@media (min-width: 500px) {
	.changeInfoForm {
		border: 1px solid var(--border-color);
		border-radius: 5px;
	}
}
</style>
