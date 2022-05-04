<script setup>
import SideMenu from '../components/SideMenu.vue'
import ChatBox from '../components/ChatBox.vue'
import { ref, useCssModule } from '@vue/runtime-dom'

const style = useCssModule()
const sideMenu = ref(true)

document.title = 'Home | Chat Group'

let touchStart
document.addEventListener('touchstart', (e) => {
	const { clientX, clientY } = e.targetTouches[0]
	touchStart = { clientX, clientY }
})
document.addEventListener('touchend', (e) => {
	const { clientX, clientY } = e.changedTouches[0]
	if (
		clientX - touchStart.clientX < -100 &&
		clientY - touchStart.clientY > -50 &&
		clientY - touchStart.clientY < 50
	) {
		sideMenu.value = false
	} else if (
		clientX - touchStart.clientX > 100 &&
		clientY - touchStart.clientY < 50 &&
		clientY - touchStart.clientY > -50
	) {
		sideMenu.value = true
	}
})
</script>

<template>
	<div :class="style.chatContainer">
		<side-menu
			@toggleSideMenu="sideMenu = !sideMenu"
			:side-menu="sideMenu"
			:class="[sideMenu ? style.sideMenuOn : style.sideMenu]"
		/>
		<chat-box
			@toggleSideMenu="sideMenu = !sideMenu"
			:side-menu="sideMenu"
			:class="style.chatBox"
		/>
	</div>
</template>

<style module>
.chatContainer {
	display: grid;
	background: var(--primary-bg-color);
}
.sideMenu {
	position: absolute;
	left: 0;
	top: 0;
	max-width: 18rem;
	opacity: 0;
	transform: translateX(-22rem);
	transition: transform 0.3s ease, opacity 0.3s;
}
.sideMenuOn {
	position: absolute;
	width: 18rem;
	transform: translateX(0rem);
	transition: transform 0.3s ease, opacity 0.3s;
}
@media (min-width: 850px) {
	.chatContainer {
		display: flex;
	}
	.sideMenuOn {
		position: relative;
		width: 18rem;
		transform: translateX(0rem);
		transition: transform 0.3s ease, opacity 0.3s;
	}
	.chatBox {
		flex-grow: 1;
	}
}
</style>
