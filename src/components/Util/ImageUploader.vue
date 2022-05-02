<script setup>
import { ref, useCssModule } from 'vue'
const style = useCssModule()
const onSelectFile = (event) => {
	toggle.value = false
	const files = event.target.files
	emit('handleImage', files[0])
}
</script>

<template>
	<div :class="style.container">
		<label>
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
.container:hover {
	background: rgba(128, 128, 128, 0.11);
	border-radius: 10px;
}
.container label {
	cursor: pointer;
}
.container label input {
	display: none;
}
.container label:nth-child(1) {
	width: 3.5rem;
	height: 3.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background-image: url('https://res.cloudinary.com/jsonvas/image/upload/v1651456565/utils/blank-profile-picture-973460__340_u8n7kk.webp');
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
