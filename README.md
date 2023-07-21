<div align='center'>

# `원티드 프리온보딩 4주차 개인과제 윤선용`

</div>

# ⚙️ 설치 및 실행
**server**는 [assignment-api](https://github.com/walking-sunset/assignment-api)에 의존하고 있습니다. clone 을 하고 http://localhost:4000 으로 배포해 주시길 바랍니다.

**client**
### 깃 레파지토리 클론
    git clone https://github.com/eastsunyong/pre-onboarding-11th-4week
### 설치 경로로 이동
    cd pre-onboarding-11th-4week
### 설치
    npm install

## 의존성
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=white" /> 

<img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=Eslint&logoColor=white" /> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white" /> <img src="https://img.shields.io/badge/Husky-00C65E?style=for-the-badge&logo=Husky&logoColor=white" /> 

<br />

# 📌 코드 컨벤션

### git commit message 컨벤션

| 커밋 유형 | 의미                                                         |
| --------- | ------------------------------------------------------------ |
| Feat      | 새로운 기능 추가                                             |
| Fix       | 버그, 기능 수정                                              |
| Docs      | 문서 수정                                                    |
| Style     | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| Refactor  | 코드 리팩토링                                                |
| Test      | 테스트 코드, 리팩토링 테스트 코드 추가                       |
| Chore     | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore           |
| Design    | CSS 등 사용자 UI 디자인 변경                                 |
| Comment   | 필요한 주석 추가 및 변경                                     |
| Rename    | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우          |
| Remove    | 파일을 삭제하는 작업만 수행한 경우                           |
| !HOTFIX   | 급하게 치명적인 버그를 고쳐야 하는 경우                      |
| ReadMe    | 리드미파일 추가, 수정, 삭제                                  |

<br />

# 🎯 과제목표

###  ✅질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

###  ✅API 호출별로 로컬 캐싱 구현
   - API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

###  ✅입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

### ✅키보드만으로 추천 검색어들로 이동 가능하도록 구현

<br />

# 구현 기능

## API 캐싱

브라우저에 있는 cacheStorage 를 사용해 중복 api 호출을 방지했습니다
- api 요청을 할 경우 그 값을 cacheStorage 에 추가 한 후 추후에 같은 요청일 경우 네트워크 통신이 아닌 cacheStorage에 저장돼 있던 값을 불러오게 하였습니다

`api/client`

```javascript
import axios from 'axios';

const getData = async (keyword: string) => {
  if ('caches' in window) {
    const cacheStorage = await caches.open('sick');
    const cachedResponse = await cacheStorage.match(keyword);
    console.log(!cachedResponse);
    
    if (!cachedResponse) {
      try {
        const response = await axios.get(`http://localhost:4000/sick?q=${keyword}`);
        console.info('calling api');
        const store = response.data;
        cacheStorage.put(keyword, new Response(JSON.stringify(store)));
        return store;
      } catch (err) {
        return console.log(err);
      }
    }
    const cached = await cachedResponse?.json();

    return cached;
  }
  return [];
};
export default getData;
````

## 호출 최적화 전략

-   유저가 키보드를 입력할때마다 api 요청이 진행된다면 서버에 부담이 됨으로써 setTimeout() 함수를 사용함으로써 useDebounce.tsx hook 을 만들어 api 호출을 제어하는 작업을 수행하였습니다

`hooks/useDebounce.tsx`

```javascript
import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay = 600) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debounceValue };
};

```
`hooks/useEventHandler.tsx`

```javascript
  useEffect(() => {
    if (!debounceValue) {
      setSickItem([]);
      setIndex(-1);
    } else {
      getData(debounceValue).then((res) => {
        setSickItem(res.slice(0, 10));
      });
    }
  }, [debounceValue]);
````


## 키보드만으로 추천 검색어들로 이동

-   사용자의 특정 키 입력(`ArrowDown`, `ArrowUp`, `Escape`) 이벤트를 추적해 지정된 인덱스의 값을 변경하는 방식으로 키보드 탐색을 구현하였습니다. 

`hook/useEventHandler.tsx`

```javascript
 const usekeyboardChange = (e: React.KeyboardEvent) => {
  const [sickItem, setSickItem] = useState([]);
  const [index, setIndex] = useState<number>(-1);
  const autoRef = useRef<HTMLUListElement>(null);

    if (sickItem.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          setIndex(index + 1);
          if (autoRef.current?.childElementCount === index + 1) {
            setIndex(0);
          }
          break;
        case 'ArrowUp':
          setIndex(index - 1);
          if (index <= 0) {
            setIndex(-1);
          }
          break;
        case 'Escape':
          setSickItem([]);
          setIndex(-1);
          break;
      }
    }
    return { sickItem, setSickItem, index, autoRef, usekeyboardChange };
  };
```
