<template>
  <div class="default-width flex-center trk-bg-1">
    <div class="login-form-width">

      <div>
        <!-- form-start -->
        <form>
          <div class="text-start">
              <div class="fw-600 trk-text-6">이름</div>
              <input type="text" class="form-control fs-20" v-model="state.name">
          </div>
          <div class="text-start" v-show="state.nameShow">
            <span class="fs-15 text-danger">{{ state.nameText }}</span>
          </div>

          <div class="clear-10"></div>

          <div class="text-start">
              <div class="fw-600 trk-text-6">Email</div>
              <input type="text" class="form-control fs-20" v-model="state.email">
          </div>
          <div class="text-start" v-show="state.emailShow">
            <span class="fs-15 text-danger">{{ state.emailText }}</span>
          </div>

          <div class="clear-10"></div>

          <div class="text-start">
              <div class="fw-600 trk-text-6">Password</div>
              <input type="password" class="form-control fs-20" v-model="state.pwd">
          </div>
          <div class="text-start" v-show="state.pwdShow">
            <span class="fs-15 text-danger">{{ state.pwdText }}</span>
          </div>

          <div class="clear-10"></div>

          <div class="text-start">
              <div class="fw-600 trk-text-6">Password Confirm</div>
              <input type="password" class="form-control fs-20" v-model="state.pwd2">
          </div>
          <div class="text-start" v-show="state.pwd2Show">
            <span class="fs-15 text-danger">{{ state.pwd2Text }}</span>
          </div>

          <div class="clear-10"></div>

          <button type="button" class="btn btn-primary" @click="postJoin">회원가입</button>

             
          <div></div>

        </form>
        <!-- form-end -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import '@/css/user/user.css';
  import { ref, reactive } from 'vue';
  import hash from '@/utils/hash.js';
  import session from '@/utils/session.js';
  import userService from '@/utils/userService.js';
  import loginService from '@/utils/loginService.js';

  //모든 값들 reactive 생성
  const valuesArr = [ 'name', 'email', 'pwd', 'pwd2', ]
  const state = reactive({});
  valuesArr.forEach((value) => {
    state[value] = '',
    state[`${value}Show`] = false;
    state[`${value}Text`] = '';
  });

  //회원가입 버튼
  const postJoin = () => {
    let comment = '';
    let isError = false;

    valuesArr.forEach((val) => {
      state[`${val}Text`] = '';
      state[`${val}Show`] = false;
      isError = false;

      switch(val) {
        case 'name':
          console.log(val);
          if(state.name.length <2) {
            comment = '이름은 한글자 이상이어야합니다.';
            isError = true;
          }
          break;
        
        case 'email':
          if(state.email.length < 3) {
            comment = '이메일은 두글자 이상이어야합니다.';
            isError = true;
          }
          break;

      }

      if(isError) {
        state[`${val}Text`] = comment;
        state[`${val}Show`] = true;
        return;
      }
    })
  }

  
</script>

<style>
.login-form-width {
  width: 100%;
  max-width: 400px;
}

</style>
