<template>
	<div class="header py-3">
		<!-- PC/태블릿 -->
		<div class="header__main px-4 py-2 rounded-pill shadow-sm d-none d-md-flex">
			<!-- 로고 영역 -->
			<div
				class="header__logo d-flex align-items-center cursor-pointer"
				@click="goHome"
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
			<div class="header__nav">
				<button
					v-for="item in menuItems"
					:key="item.id"
					class="btn header__btn-menu rounded-pill fw-bold"
					:class="isCurrent(item.path) ? 'trk-bg-55 trk-text-1' : 'trk-text-55'"
					@click="navigateTo(item.path)"
				>
					{{ item.label }}
				</button>
			</div>

			<!-- 로그인 버튼 -->
			<button
				class="btn header__btn-login rounded-pill trk-bg-55 trk-text-1 fw-bold"
				@click="goLogin"
			>
				로그인
			</button>
		</div>

		<!-- 모바일 상단 헤더 -->
		<div
			class="justify-content-between align-items-center px-3 d-flex d-md-none"
		>
			<div class="d-flex align-items-center cursor-pointer" @click="goHome">
				<img
					src="@/images/logo_rabbit.png"
					alt="logo"
					class="me-2"
					width="20"
					height="20"
				/>
				<span class="trk-text-3 fw-bold">Money Track</span>
			</div>
			<!-- 로그인 버튼 -->
			<button
				class="btn header__btn-login rounded-pill trk-bg-55 trk-text-1 fw-bold"
				@click="goLogin"
			>
				로그인
			</button>
		</div>

		<!-- 모바일 하단 탭 메뉴 -->
		<div class="header__mobile-nav d-md-none">
			<div class="header__nav-container rounded-pill px-3 py-2">
				<button
					v-for="item in menuItems"
					:key="item.id"
					class="btn header__mobile-btn-menu rounded-pill fw-bold"
					:class="isCurrent(item.path) ? 'trk-bg-55 trk-text-1' : 'trk-text-55'"
					@click="navigateTo(item.path)"
				>
					{{ item.label }}
				</button>
			</div>
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
	{ label: "홈", path: "/home", id: 1 },
	{ label: "달력", path: "/expense", id: 2 },
	{ label: "통계", path: "/statistics", id: 3 },
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
