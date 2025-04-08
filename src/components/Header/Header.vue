<template>
	<div class="header py-3">
		<div class="header__main px-4 py-2 rounded-pill shadow-sm">
			<!-- 로고 영역 -->
			<div
				class="header__logo d-flex align-items-center"
				@click="goHome"
				style="cursor: pointer"
			>
				<img
					src="@/images/logo_rabbit.png"
					alt="logo"
					class="me-3"
					width="35"
					height="35"
				/>
				<span class="header__title trk-text-3 fw-bold">Money Track</span>
			</div>

			<!-- 네비게이션 메뉴 -->
			<nav class="header__nav">
				<button
					v-for="item in menuItems"
					:key="item.label"
					class="btn header__btn-menu rounded-pill fw-bold"
					:class="isCurrent(item.path) ? 'trk-bg-55 trk-text-1' : 'trk-text-55'"
					@click="navigateTo(item.path)"
				>
					{{ item.label }}
				</button>
			</nav>

			<!-- 로그인 버튼 -->
			<button
				class="btn header__btn-login rounded-pill trk-bg-55 trk-text-1 fw-bold"
				@click="goLogin"
			>
				로그인
			</button>
		</div>
	</div>
</template>

<script setup>
import "@/css/header/header.css";
import "@/css/common/common.css";

import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const menuItems = [
	{ label: "홈", path: "/home" },
	{ label: "달력", path: "/expense" },
	{ label: "통계", path: "/statistics" },
];

const isCurrent = (path) => route.path === path;

const navigateTo = (path) => {
	if (route.path !== path) {
		router.push(path);
	}
};

const goHome = () => {
	router.push("/home");
};

const goLogin = () => {
	router.push("/login");
};
</script>

<style scoped></style>
