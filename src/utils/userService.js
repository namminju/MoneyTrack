import axios from 'axios';
import { resJson } from '@/utils/common.js';
import hash from '@/utils/hash.js';
import dateUtil from '@/utils/date.js';

const userService = {
  //회원 정보 가져오기
  async getList(name = '', email = '', password = '', id = '') {
    try {
      //파라미터만들기
      const params = {};
      if (name) params.name = name;
      if (email) params.email = email;
      if (password) params.password = password;
      if (id) params.id = id;

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
  async createPostUserData(name = '', email = '', pwd = '', join = '', is_data = false, gender = 1) {
    try {

      const lastId = await this.getLastId();
      const nextId = parseInt(lastId) + 1;

      const hashPwd = await hash.sha256(pwd);

      const data = {
        id: nextId.toString(),
        name: name,
        email: email,
        password: hashPwd,
        gender: gender,
        is_data: false,
      }

      if (!join) data.join = dateUtil.formatDate(new Date, 'yyyy-MM-dd');
      return data;
    }
    catch (error) {
      console.log(error);
    }

  },

  // 회원정보 만들기 업데이트 및 기타용
  async createUserData(id = '', name = '', email = '', pwd = '', gender = '') {
    try {

      const userData = await this.getList('', '', '', id)
      if (!userData[0]) return resJson('605', '', '회원 정보가 존재하지 않습니다.');

      const hashPwd = await hash.sha256(pwd);

      // 원랜 이렇게 필요한 정보만 DB에 업데이트하는게 맞음 근데 json-server 이렇게하면
      // 데이터 그지같이 나옴
      // const data = {};
      // if (id) data.id = id;
      // if (email) data.email = email;
      // if (pwd) data.pwd = hashPwd;
      // if (gender) {
      //   //1 = 남자, 2 = 여자
      //   const change = gender === 'male' ? 1 : 2;
      //   data.gender = change;
      // }

      //josn-server 는 무조건 모든 정보 재조립
      if (!id) return resJson('604', '', '잘못된 요청입니다.');
      const data = { id: id };
      if (!name) { data.name = userData[0].name; }
      data.name = !name ? userData[0].name : name;
      data.email = !email ? userData[0].email : email;
      data.pwd = !pwd ? userData[0].pwd : hashPwd;
      data.gender = !gender ? userData[0].gender : gender;
      data.join = userData[0].join;
      data.is_data = userData[0].is_data;

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
  },

  //회원정보 수정
  async putData(data) {
    try {
      const response = axios.put(`/api/user/${data.id}`, data);

      return resJson('000', true, '회원정보 업데이트 완료');
      // if (response) {
      //   console.log(response);
      // }
      // else {
      //   console.log
      // }
      // return resJson('000', true, '회원정보 업데이트 완료');
    }
    catch (error) {
      return resJson('603', '', '잘못된 요청입니다.' + error);
    }
  }
}

export default userService;