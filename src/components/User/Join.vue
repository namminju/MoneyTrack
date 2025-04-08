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

          <div class="row">
            <div class="col-sm-2 flex-center fw-600 trk-text-6">
              Gender: 
            </div>
            <div class=" trk-input-group col-sm-9">
              <label class="d-flex trk-btn p-2">
                <input type="radio" class="d-none"  id="male" v-model="state.gender" value="male">
                <div>Male</div>
              </label>
              <label class="d-flex trk-btn p-2">
                <input type="radio" class="d-none" id="female" v-model="state.gender" value="female">
                <div>Female</div>
              </label>
            </div>
          </div>
          <div class="text-start" v-show="state.genderShow">
            <span class="fs-15 text-danger">{{ state.genderText }}</span>
          </div>

          <div class="clear-10"></div>

          <button type="button" class="btn btn-primary" @click="postJoin">회원가입</button>

          <div class="clear-10"></div>
             
          <div></div>

        </form>
        <!-- form-end -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import '@/css/user/user.css';
  import { reactive } from 'vue';
  import userService from '@/utils/userService.js';
  import loginService from '@/utils/loginService.js';

  //모든 값들 reactive 생성
  const valuesArr = [ 'name', 'email', 'pwd', 'pwd2', 'gender']
  const state = reactive({});
  valuesArr.forEach((value) => {
    state[value] = '',
    state[`${value}Show`] = false;
    state[`${value}Text`] = '';
  });

  //회원가입 버튼
  const postJoin = async () => {

    let isPass = true;  //post 할지 결정
    
    valuesArr.forEach( async (val) => {
      //초기화
      state[`${val}Text`] = '';
      state[`${val}Show`] = false;
      
      switch(val) {
        case 'name':
          const nameCheck = loginService.checkName(state.name);
          if(!nameCheck.result) {
            state.nameText = nameCheck.msg;
            state.nameShow = true;
            // isPass = false;
          }
          break;
        
        case 'email':
          //이메일 형식인지 확인
          const emailCheck = loginService.checkEmail(state.email);
          if(!emailCheck.result) {
            state.emailText = emailCheck.msg;
            state.emailShow = true;
            isPass = false;
          }

          //같은 아이디의 회원이 존재하는지 확인
          const userCheck = await userService.getList('',state.email);
          if(userCheck[0]) {
            state.emailText = userCheck.msg;
            state.emailShow = true;
            isPass = false;
          }
          break;

        case 'pwd':
          //비밀번호 조건 체크
          const pwdCheck = loginService.checkPwd(state.pwd);
          if(!pwdCheck.result) {
            state.pwdText = pwdCheck.msg;
            state.pwdShow = true;
            isPass = false;
          }
          break;
        
        case 'pwd2':
          //비밀번호랑 비밀번호 확인이랑 같은지 체크
          if(state.pwd !== state.pwd2) {
            state.pwd2Text = '비밀번호가 일치하지 않습니다';
            state.pwd2Show = true;
            isPass = false;
          }
        
        case 'gender':
          console.log(state.gender);
          if(!state.gender) {
            state.genderText = '성별을 선택해주세요';
            state.genderShow = true;
            isPass = false;
          }
          
          break;

        default:
          break;
      }
    })
    // foreach end
  
    //회원 정보 입력 시작
    if(isPass) {
      const userData = await userService.createPostUserData(state.name, state.email, state.pwd,);
      await userService.postUser(userData);
    }
  }


  
</script>

<style>
/* 임시 스타일 */
.login-form-width {
  width: 100%;
  max-width: 400px;
}

.trk-btn {
  /* border-radius: 1rem; */
  border: 1px solid;
  cursor: pointer;
}

.trk-input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.trk-input-group > :first-child {
  border-radius: 1rem 0 0 1rem;
}

.trk-input-group > :last-child {
  border-radius: 0 1rem 1rem 0;
}
</style>
