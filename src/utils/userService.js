import axios from 'axios';
import { resJson } from '@/utils/common.js';

const userService = {
  //회원 정보 가져오기
  async getList(name = '', email = '', password = '') {
    try {
      //파라미터만들기
      const params = {};
      if (name) params.name = name;
      if (email) params.email = email;
      if (password) params.password = password;

      //회원 정보 요청
      const response = await axios.get('api/user', {
        params: params
      });

      //회원이 존재하면
      if (response.data[0]) {
        return response.data;
      }
      else {
        return resJson('601', '', '존재하지 않는 회원입니다.');
      }
    }
    catch (error) {
      return resJson('601', '', '잘못된 요청입니다.');
    }
  },

  //회원의 마지막 아이디 구하기 (DB에선 auto increment 써서 필없음)
  async getLastId() {
    try {
      const response = await axios.get('/api/user');

      const maxId = response.data.reduce((max, user) => {
        return user.id > max.id ? user : max;
      });

      return response.data;
    }
    catch (error) {
      return resJson('601', '', '잘못된 요청입니다.');
    }
  }
}

export default userService;