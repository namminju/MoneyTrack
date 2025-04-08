import axios from 'axios';
import { resJson } from '@/utils/common.js';
import hash from '@/utils/hash.js';
import dateUtil from '@/utils/date.js';

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
      return resJson('601', '', '잘못된 요청입니다.' + error);
    }
  },

  //회원의 마지막 아이디 구하기 (DB에선 auto increment 써서 필없음)
  async getLastId() {
    try {
      const response = await axios.get('/api/user');

      let maxId = '';
      response.data.forEach(item => {
        if (item.id > maxId) maxId = item.id;
      });

      return maxId;
    }
    catch (error) {
      return resJson('601', '', '잘못된 요청입니다.');
    }
  },

  //신규 회원 정보 만들기
  async createPostUserData(name = '', email = '', pwd = '', join = '', is_data = false) {
    try {

      const lastId = await this.getLastId();
      const nextId = parseInt(lastId) + 1;

      const hashPwd = await hash.sha256(pwd);

      const data = {
        id: nextId,
        name: name,
        email: email,
        password: hashPwd,
        is_data: false,
      }

      if (!join) data.join = dateUtil.formatDate(new Date, 'yyyy-MM-dd');
      return data;
    }
    catch (error) {
      console.log(error);
    }

  },

  //회원 만들기
  async postUser(data) {
    try {
      axios.post('/api/user', data);
      return resJson('000', true, '회원 생성 완료');
    }
    catch (error) {
      return resJson('602', '', '잘못된 요청입니다.' + error);
    }
  }
}

export default userService;