/*
  개발목적: 멀티캠퍼스 미니 스켈레톤 프로젝트 온라인 가계부 - 머니트랙 의 데이터제공용

  1. 기존 db.json 이 존재할 경우 그대로 읽어와서, 데이터가 없는 경우 만들어줌
  2. db.json 이 없는경우 임의의 홍길동 아이디를 생성하여 데이터를 만들어즘
  3. 만약 새로운 유저가 회원가입을 했다면 그 회원의 데이터도 만들어줌
      이 경우 기존 회원의 데이터는 유지되며 새로운 회원의 데이터만 생김
  4. json-server로 실행한다는 것을 가정으로 만들었음
*/

import { access, constants, readFile, writeFile } from 'fs/promises';
import dateUtil from '../src/utils/date.js';

//시간재는용
const startTime = new Date();

//expense 정보 가져오기
const expense = JSON.parse(
  await readFile(
    new URL('./expense.json', import.meta.url)
  )
);

//유저가 없을경우 기본값
const basicUser = {
  id: 1,
  name: '홍길동',
  email: "hong@gmail.com",
  // 비밀번호: 1111
  password: "0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c",
  join: "2025-04-03",
  is_data: false
}

let newUsers = [];
let dbJson;
//db.json에서 유저 가져오기
try {
  await access(new URL('./db.json', import.meta.url), constants.F_OK);

  dbJson = JSON.parse(
    await readFile(
      new URL('./db.json', import.meta.url)
    )
  )
  // console.log(dbJson['user']);

  newUsers = dbJson['user'].filter(item => item.is_data === false);
}
//없으면 새로 만들어주기
catch {
  dbJson = { user: [], Expense: [], Category: [expense.expenseCategory] };
  dbJson.user.push(basicUser);

  newUsers.push(basicUser);
  // console.log(newUsers);
}

//하루 최대 생성 갯수
const maxExpenseCountPerDay = expense.maxExpenseCountPerDay;

//지출 타입
const expenseType = expense.expenseType;

//지출 비용
const expenseAmount = expense.expenseAmount;

//카테고리
const cateArr = expense.expenseCategory;

//월급날
const happyDate = expense.happyDate;

//유저
// const expenseUser = expense.user;

//시작 ~ 끝 날짜
const startDate = new Date(expense.expenseDate["start_date"]);
const endDate = new Date(expense.expenseDate["end_date"]);
let currentDate = new Date(startDate.getTime());  //현재날짜

//이름
const preFixArr = expense.expenseNamePrefix['name'];
const suffixArr = expense.expenseNameSuffix;

//랜덤값구하기
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//카테고리 이름 가져오기
const getCateName = (cate_id) => {
  const cate = cateArr.find(item => item.cate_id === cate_id);
  // console.log(cate);
  return cate['name'];
}

//카테고리 icon 가져오기
const getCateIcon = (cate_id) => {
  const cate = cateArr.find((item) => item.cate_id === cate_id);
  // console.log(cate);
  return cate['icon'];
};

//랜덤 suffix
const getRandomSuffix = () => {
  const randNum = getRandom(0, suffixArr.length - 1);
  const suffix = suffixArr[randNum];
  return suffix;
}

//랜덤 카테고리
const getRandomCate = () => {
  const preFixNum = getRandom(0, preFixArr.length - 1);
  const preFix = preFixArr[preFixNum];

  const suffix = getRandomSuffix();
  if (suffix) {
    // console.log('suffix:' + suffix['cate_id']);
    const expenseName = preFix + suffix['name'];
    const cateId = suffix['cate_id'];

    return { expenseName, cateId };
  }
  else {
    console.log(suffix);
  }
}

//타입 정하기
const getRandomType = () => {
  const randNum = getRandom(0, 9);
  if (randNum < 4) {
    return 1;
  }
  else {
    return 2;
  }
}

//타입 이름 구하기
const getTypeName = (type_id) => {
  const typeName = expenseType.find(item => item.type_id === type_id);
  // console.log(typeName['name']);
  if (typeName) {
    return typeName['name'];
  }
  else {
    throw new Error('Cannot find proper type_id');
  }
}

//금액 정하기
const getRandomAmount = () => {
  const randNum = getRandom(expenseAmount.start_amount, expenseAmount.end_amount);
  const amount = Math.floor(randNum);
  return amount;
}

//배열 작성
const createData = (id, user_id, currentDate, is_salary = 0, is_hide = 0, is_delete = 0) => {

  let amount = '';
  let cateId = '';
  let cateName = '';
  let name = '';
  let cateIcon = '';

  //월급날인 경우
  if (is_salary == 1) {
    amount = expense.expenseIncome.income;
    const cate = cateArr.find(item => item.cate_id === 99);
    cateId = cate.cate_id;
    cateName = cate.name;
    cateIcon = cate.icon;

    name = cateName;
  }
  //기본일 경우
  else {
    amount = getRandomAmount();

    const cate = getRandomCate();
    // console.log('cate: ' + cate);
    cateId = cate['cateId'];
    name = cate['expenseName'];
    cateIcon = getCateIcon(cateId);
    // console.log('cateId: ' + cateId);
    cateName = getCateName(cateId);
  }

  //천의 자리 반올림
  amount = Math.round(amount / 1000) * 1000;

  //타입
  const typeId = getRandomType();
  const typeName = getTypeName(typeId);

  //날짜 포멧 변경
  const formatDate = dateUtil.formatDate(currentDate, 'yyyy-MM-dd');

  //데이터 세팅
  const data = {
    id: id.toString(),
    user_id: user_id,
    type: typeId,
    type_name: typeName,
    name: name,
    amount: amount,
    date: formatDate,
    cate_id: cateId,
    cate_name: cateName,
    cate_icon: cateIcon,
    is_salary: is_salary,
    is_hide: is_hide,
    is_delete: is_delete,
  }

  return data;
}


//작성 시작
const expenseArr = [];
let id = 1;
let data = {};
let i = 0;
let maxCount = 0;

//유저별로
newUsers.forEach((user, index) => {

  //날짜별 하나씩
  while (currentDate.getTime() <= endDate.getTime()) {

    //월급날
    if (currentDate.getDate() == happyDate) {
      data = createData(id, user.id, currentDate, 1);
      id++;
      expenseArr.push(data);
    }

    //평소
    maxCount = getRandom(0, maxExpenseCountPerDay);  //하루 데이터 발급량
    for (i = 0; i < maxCount; i++) {
      data = createData(id, user.id, currentDate);
      id++;
      expenseArr.push(data);
    }

    // currentDate를 하루 증가
    currentDate.setDate(currentDate.getDate() + 1);
  }
  //end while currentDate

  //날짜 초기화
  currentDate = startDate;

  //데이터 생성 완료
  user.is_data = true;
})
//end foreach user


//db.json 생성하기
async function exportFile() {
  try {

    //기존 데이터에 push하기
    dbJson.Expense.push(...expenseArr);
    // console.log(dbJson);

    //파일 생성
    await writeFile('db/db.json', JSON.stringify(dbJson, null, 2), 'utf-8');
    console.log('파일 생성 완료');

    const endTime = new Date();
    const diff = (endTime - startTime) / 1000;
    console.log(`${diff} 초의 시간이 걸렸음`);
    //만약 오래걸렸다면 똥컴이니 바꾸십쇼
    process.exit(0);
  }
  catch (error) {
    console.log('파일 생성 안됨');
    console.log(error);
    process.exit(1);
  }
}

exportFile();