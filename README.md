## Default Settings

2024-04-05
- reset.css (index.html)
- bootstrap5.css (index.html)
- additionClasses.css (index.html)
- fontawesome (index.html)

## Design
- [Figma](https://www.figma.com/design/7F2LSx8KUJSE2viQ1X8A8m/MoneyTrack?node-id=0-1&p=f&t=s2Iu4bcDRGA3LiyN-0)


## DB Setting

@/db 안에 createDB.js 라는 파일을 

```sh
node createDB.js
```
이렇게 입력하여 사용하면 됨. 새로운 사용자를 추가하거나 추가 데이터가 필요할 경우 사용하면 좋음 자세한건 파일 열어서 확인

만약 어떤 추가 컬럼이 필요하다면 expense.json 과 createDB.js 를 잘 수정 하면 됨

만약 콘솔을 막 두개 띄우기 귀찮으면 npm pm2 깔아서 이용하는것도 추천드리고 그래도 불편하면 온라인 서버를 제공하겠음

물론 json-server 용이고 당연히 json-server를 사용할땐

```sh
json-server db/db.json.js
```
이렇게 입력하면 됨


## Default Rules

아래 내용들은 모두 앞에 '가급적', '최대한' 등의 단어가 생략되어있다고 생각하면 좋습니다.  
ex) css를 지정할땐 class를 사용한다. -> 가급적 css를 지정할땐 class를 사용한다.

즉 정해진건 없고, 본인이 생각하기에 이렇게 하면 다같이 편할 수 있겠다 싶은 사항이 있으면 언제든지 공유하시면 좋을 것 같습니다.

**1. CSS**  
- css를 지정할땐 class 사용 & 케밥 스타일
```html
<div class="cate-box"></div>
```

- 자식들을 지정할땐 언더바 2개 이용
```html
<div class="cate-box">
  <div class="cate-box__item">아이템</div>
</div>
```

- #id or <style scoped> 는 다른걸 덮어 씌울때 사용  
재사용이 어렵기 때문에 사용 빈도가 많으면 안됨

- px 대신 rem 사용. rem이 반응형에 더 좋기 때문  
다만 img 등 최소 고정값이 존재하고, felx-wrap 등이 적용되어야한다면 px 사용
```css
  .cate-box {
    font-size: 1.8rem;
  }
```
우리 프로젝트에서는 html 이 10px 고정, body 가 1.6rem 으로 디폴트값으로 세팅되므로 고려해서 만들면 됨  
ex) 1.4rem == 14px

**2. ID**  
- css는 class 사용 추천 & input 은 v-model 사용 추천  
bootstrap 이나 label 등에서 id가 필연적으로 쓰이는 곳이 있음. 이런 경우 사용함
```html
  <label for="cate-option">선택하기</label>
  <input type="checkbox" id="cate-option"/>
```

**3. DB**  
-DB의 컬럼값은 스네이크 형식
```javascript
  const data = {
    cate_id: cateId;
  }
```
왼쪽은 DB의 값이고 오른쪽은 자바스크립트에서 생성된 변수라는것을 구분할 수 있다.

-axios 사용시 delete 는 사용하지 않음, 대신 각 항목에 is_delete 값을 추가하여 0 <-> 1 을 왔다갔다 하게 함
```javascript
//카테고리 삭제
  const data = {
    ...
    is_delete : 1
  }
  axios.put(url,data);
```

-json 에 숫자를 입력시 무조건 숫자타입으로 한다.
```javascript
  //안좋은 예
  const data = {
    id: "1"
  }

  //좋은 예
  const data = {
    id: 1
  }

  //그냥 이렇게 해도 됨
  const data = {
    id: parseInt(id)
  }
```

**5. 선언**  
이 항목은 프로젝트 진행도에 따라 계속 추가되거나 변경될 수 있음.

- 상수 = 대분자로 한다. 안써도 무관 우리 프로젝트에선 쓸일도 별로 없을듯
```javascript
  MAX_USER = 10;
```

- 배열은 뒤에 Arr을 붙이면 좋다.
```javascript
  const cateArr = [1,3,4,1,2];
```

**6. GIT**
- merge 방식은 항상 유동적으로 해야합니다.  
1. 가장 기본적인 공통파일들은 팀장인 관리  
ex) images/common, css/common, utils/common 등 재사용 빈도수가 높은 파일들

2. 본인이 만든 파일들은 직접 merge 하시면 됩니다.  
ex) css/login 등 특정 페이지만을 위한 css

3. 본인이 만들었어도, 여러곳에서 쓰이는 재사용이 자주 일어나는 파일들은 팀장이 merge 합니다.  
ex) pagination, button, input 등 기본적인 테마 관련  

- branch 든 fork 든 본인 편한 방법대로 하시면 됩니다. 큰 차이 없음. 이럴 때 이것도 해보고 저것도 해봐야지  

- commit 메모 작성방법  
이건 GPT가 알려준건데 괜찮은 것들 있으면 추후 수정 or 추가 요청  
----------------------------------------------------  
feat: 새로운 기능 추가  
예: feat: add user authentication  

fix: 버그 수정  
예: fix: resolve login issue  

docs: 문서 관련 변경  
예: docs: update README with setup instructions  

style: 코드 스타일 변경 (포맷, 세미콜론 추가 등)  
예: style: format code with prettier  

refactor: 코드 리팩토링 (기능 변경 없이 코드 구조 개선)  
예: refactor: simplify user service logic  

perf: 성능 개선  
예: perf: improve query performance  

test: 테스트 코드 추가 또는 수정  
예: test: add unit tests for user service  

chore: 기타 변경사항 (빌드 프로세스, 패키지 매니저 설정 등)  
예: chore: update npm dependencies  

build: 빌드 관련 변경  
예: build: update webpack configuration  

ci: CI 설정 변경  
예: ci: update GitHub Actions workflow  
----------------------------------------------------  