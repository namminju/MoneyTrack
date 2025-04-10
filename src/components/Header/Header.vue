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
      <nav class="header__nav" v-if="menuItems.length">
        <button
          v-for="item in menuItems"
          :key="item.id"
          class="btn header__btn-menu rounded-pill fw-bold"
          :class="isCurrent(item.path) ? 'trk-bg-5 trk-text-1' : 'trk-text-5'"
          @click="navigateTo(item.path)"
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- 사용자 이름 (마이페이지 이동) -->
      <div
        v-if="isLoggedIn"
        class="header__user cursor-pointer trk-text-5 fw-bold"
        @click="goMyPage"
      >
        {{ userName }}님
      </div>

      <!-- 로그아웃 버튼 -->
      <button
        v-if="isLoggedIn"
        class="btn header__btn-login rounded-pill trk-text-5 fw-bold"
        @click="goLogout"
      >
        로그아웃
      </button>
      <!-- 로그인 버튼 -->
      <button
        v-else
        class="btn header__btn-login rounded-pill trk-bg-5 trk-text-1 fw-bold"
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

      <!-- 사용자 이름 (마이페이지 이동) -->
      <div
        v-if="isLoggedIn"
        class="header__user cursor-pointer me-3 trk-text-5 fw-bold"
        @click="goMyPage"
      >
        {{ userName }}님
      </div>

      <!-- 로그아웃 버튼 -->
      <button
        v-if="isLoggedIn"
        class="btn header__btn-login rounded-pill trk-bg-5 trk-text-1 fw-bold"
        @click="goLogout"
      >
        로그아웃
      </button>
      <!-- 로그인 버튼 -->
      <button
        v-else
        class="btn header__btn-login rounded-pill trk-bg-5 trk-text-1 fw-bold"
        @click="goLogin"
      >
        로그인
      </button>
    </div>

    <!-- 모바일 하단 탭 메뉴 -->
    <nav class="header__mobile-nav d-md-none" v-if="menuItems.length">
      <div class="header__nav-container rounded-pill px-3 py-2">
        <button
          v-for="item in menuItems"
          :key="item.id"
          class="btn header__mobile-btn-menu rounded-pill fw-bold"
          :class="isCurrent(item.path) ? 'trk-bg-5 trk-text-1' : 'trk-text-5'"
          @click="navigateTo(item.path)"
        >
          {{ item.label }}
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import "@/css/header/header.css";
import { useRoute, useRouter } from "vue-router";
import { computed, inject, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import userService from "@/utils/userService.js";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);

onMounted(() => {
  userService.checkIsLogin();
});

const menuItems = computed(() =>
  isLoggedIn.value
    ? [
        { label: "홈", path: "/home", id: 1 },
        { label: "달력", path: "/expense", id: 2 },
        { label: "통계", path: "/statistics", id: 3 },
      ]
    : []
);

const isCurrent = (path) => route.path === path;

const userName = computed(() => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return user.name;
});

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

const alert = inject("useAlert");
const confirm = inject("useConfirm");

const goLogout = () => {
  confirm("로그아웃 하시겠습니까?")
    .then(() => {
      userStore.logout();
      sessionStorage["user"] = "";
      alert.success("로그아웃 되었습니다.");
      router.push("/home");
    })
    .catch(() => {
      return;
    });
};

const goMyPage = () => {
  router.push("/mypage");
};
</script>

<style scoped></style>
