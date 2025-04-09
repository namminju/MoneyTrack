const session = {
  //세션만들기 user = 단일 arr타입
  create(user) {
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    sessionStorage.setItem('user', JSON.stringify(data));
    console.log('세션 작성 완료');
  },
  get() {
    const data = sessionStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  },
};

export default session;
