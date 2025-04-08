import { resJson } from '@/utils/common.js';

const loginService = {
  //이메일 형식인지 확인
  isEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  },

  //이메일 체크하기
  checkEmail(email) {
    if (!this.isEmail(email)) {
      return resJson('101', '', '이메일 형식이 올바르지 않습니다.');
    }

    return resJson('', true, '');
  },

  //비밀번호 확인하기
  checkPwd(pwd) {
    if (pwd.length < 4) {
      return resJson('102', '', '비밀번호는 4자리 이상이어야합니다.');
    }

    //특수문자확인

    //영어 소문자 확인

    return resJson('', true, '');
  },

  //이름 확인하기
  checkName(name) {
    if (name.length < 2) {
      return resJson('103', '', '이름은 한글자 이상이어야합니다.');
    }

    return resJson('000', true, '');
  }

}

export default loginService;