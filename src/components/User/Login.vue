<template>
  <div class="login-container flex-center min-h-50">
    <div class="login-container__form trk-small-width">

      <div>
        <!-- form-start -->
        <form>
          <div class="text-start">
              <div class="fw-600 trk-text-6">이메일</div>
              <div class="clear-5"></div>
              <input type="text" class="trk-input-yellow fs-20" v-model="email">
          </div>
          <div class="text-start" v-show="emailShow">
            <span class="fs-15 text-danger">{{ emailText }}</span>
          </div>

          <div class="clear-10"></div>

          <div class="text-start">
              <div class="fw-600 trk-text-6">Password</div>
              <div class="clear-5"></div>
              <input type="password" class="trk-input-yellow fs-20" v-model="pwd">
          </div>
          <div class="text-start" v-show="pwdShow">
            <span class="fs-15 text-danger">{{ pwdText }}</span>
          </div>

          <div></div>

        </form>
        <!-- form-end -->
      </div>

      <div class="clear-20"></div>

      <button @click="postLogin" class="trk-btn-confirm fs-20">로그인</button>

      <div class="clear-15"></div>

      <div class="d-flex justify-content-around fs-15 text-primary">
        <div class="cursor-pointer">
          <router-link to="/findId">아이디 찾기</router-link>
        </div>
        <div class="cursor-pointer">
          <router-link to="/findPw">비밀번호 찾기</router-link>
        </div>
        <div class="cursor-pointer">
          <router-link to="/join">회원가입</router-link>
        </div>
      </div>

      <div class="clear-10"></div>

    </div>
  </div>
</template>

<script setup>
  import '@/css/user/login.css';
  import { ref } from 'vue';
  import hash from '@/utils/hash.js';
  import session from '@/utils/session.js';
  import loginService from '@/utils/loginService.js';
  import router from '@/router';
  import userService from '@/utils/userService.js';
  
  //로그인 되어있으면 홈으로
  if(userService.checkIsLogin()) {
    router.push('/redirect');
  }

  //기본값
  const email = ref('');
  const pwd = ref('');

  //이메일 경고문구
  const emailShow = ref(false);
  const emailText = ref('');

  //비번 경고문구
  const pwdShow = ref(false);
  const pwdText = ref('');

  //로그인 함수
  const postLogin = async () => {
    const emailReturn = loginService.checkEmail(email.value);
    const pwdReturn = loginService.checkPwd(pwd.value);

    //이메일 조건 만족 실패
    if(!emailReturn.result) {
      emailShow.value = true;
      emailText.value = emailReturn.msg;
      return;
    }
    else {
      emailShow.value = false;
    }

    //비밀번호 조건 만족 실패
    if(!pwdReturn.result)  {
      pwdShow.value = true;
      pwdText.value = pwdReturn.msg;
      return;
    }
    else {
      pwdShow.value = false;
    }

    //비번 암호화
    const hashPwd = await hash.sha256(pwd.value);

    //회원정보데이터요청
    const response = await userService.getList('',email.value, hashPwd);
    if(response[0]) {
      session.create(response[0]);
      userService.checkIsLogin();
      router.push('/redirect');
    }
    else {
      //미정
      alert(response.msg);
    }
  }  
  
  
</script>