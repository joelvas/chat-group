<script setup>
import { onMounted, ref, useCssModule } from 'vue'
const style = useCssModule()
const emit = defineEmits(['handleImage'])
const img = ref()
const props = defineProps(['profileImage'])

onMounted(() => {
	if (props.profileImage) {
		document.querySelector(
			'#imagePreview'
		).style.backgroundImage = `url('${props.profileImage}')`
	}
})

const onSelectFile = (event) => {
	const reader = new FileReader()
	reader.onload = () => {
		document.querySelector(
			'#imagePreview'
		).style.backgroundImage = `url('${reader.result}')`
	}
	reader.readAsDataURL(event.target.files[0])
	emit('handleImage', event.target.files[0])
}
</script>

<template>
	<div :class="style.container">
		<label id="imagePreview">
			<span class="material-icons">photo_camera</span>
			<input type="file" @change="onSelectFile" />
		</label>
		<label>
			<span>CHANGE PHOTO</span>
			<input type="file" @change="onSelectFile" />
		</label>
	</div>
</template>

<style module>
.container {
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	margin: 1rem 1rem 0.5rem 1rem;
}
.container label {
	cursor: pointer;
}
.container label input {
	display: none;
}
.container label:nth-child(1) {
	width: 4rem;
	height: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background-color: #efece8;
	background-image: url('https://res.cloudinary.com/jsonvas/image/upload/v1651526837/chat-group/qs1uwwdffi3wgmrhrsfk_u73rns.png');
	background-size: cover;
	background-repeat: no-repeat;
}
.container label:nth-child(1) span {
	font-size: 1.2rem;
}
.container label:nth-child(2) {
	flex-grow: 1;
	display: flex;
	align-items: center;
	padding: 0 1.5rem;
}
.container label:nth-child(2) span {
	font-size: 0.8rem;
	font-weight: lighter;
	color: var(--primary-text-color);
}
</style>
