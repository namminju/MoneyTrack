<template>
  <div class="default-width flex-center trk-bg-1">
    <div class="login-form-width">

      <div>
        <!-- form-start -->
        <form>
          <div class="text-start">
              <div class="fw-600 trk-text-6">Email</div>
              <input type="text" class="form-control fs-20" v-model="email">
          </div>
          <div class="text-start">
            <span class="fs-15 text-danger">아이디가 일치하지 않습니다.</span>
          </div>

          <div class="clear-10"></div>

          <div class="text-start">
              <div class="fw-600 trk-text-6">Password</div>
              <input type="password" class="form-control fs-20" v-model="pwd">
          </div>
          <div class="text-start">
            <span class="fs-15 text-danger">비밀번호가 일치하지 않습니다.</span>
          </div>

          <div></div>

        </form>
        <!-- form-end -->
      </div>

      <div class="clear-10"></div>

      <button @click="postLogin">로그인</button>

      <div class="d-flex justify-content-around fs-15 text-primary">
        <div>
          <router-link to="/findId">아이디 찾기</router-link>
        </div>
        <div>
          <router-link to="/findPw">비밀번호 찾기</router-link>
        </div>
        <div>
          <router-link to="/join">회원가입</router-link>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
  import '@/css/user/user.css';
  import { ref } from 'vue';

  const email = ref('');
  const pwd = ref('');

  const sha256 = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  //이메일 형식인지 확인
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  //성공실패 값 처리 json
  const returnVal = (code = '000', success = false, message) => {
    const data = {
      code: code,
      success: success,
      message: message
    }
    
    return data;
  }

  //이메일 체크하기
  const checkEmail = (email) => {
    // console.log(!isValidEmail(email));
    if(!isValidEmail(email)) {
      return returnVal('101','' ,'이메일 형식이 올바르지 않습니다.');
    }
    
    return returnVal('', true, '');
  }

  //비밀번호 확인하기
  const checkPwd = (pwd) => {
    if(pwd.length < 8) {
      return returnVal('102', '', '비밀번호는 8자리 이상이어야합니다.'); 
    }

    //특수문자확인
    
    //영어 소문자 확인

    return returnVal('', true, '');
  }



  //로그인 함수
  const postLogin = async () => {
    const emailReturn = checkEmail(email.value);
    console.log(emailReturn);
    
    const hashPwd = await sha256(pwd.value);
    // trkLogin(email.value, hashPwd);
  }


  //로그인
  const trkLogin = (email, pwd) => {
    const data = {
      email: email,
      password: pwd,
    }
    console.log(data);
  }

  
  
  
</script>

<style>
.login-form-width {
  width: 100%;
  max-width: 400px;
}

</style>
