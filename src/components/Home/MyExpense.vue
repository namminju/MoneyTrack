<template>
  <div class="home-card">
    <div class="position-relative w-100">
      <div class="fw-600 fs-20 trk-text-6">지난주보다 이만큼 아꼈어요!</div>
      <div class="home-card__income">
        <span class="fs-30 home-card__income__span">
          <slot></slot> 원
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .home-card__income {
    display: flex;
    justify-content: end;
    width: 100%;
    height: 100%;
  }
  .home-card__income__span {
    position: absolute;
    bottom: 0px;
  }
</style>