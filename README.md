# 이건뭐지 리액트 공식문서 읽기 5주차 스터디

## ✏️학습목표
5주차 공식문서 내용 복습하기
- State 구조 선택하기
- 컴포넌트 간 State 공유하기<br>

https://ko.react.dev/learn/choosing-the-state-structure

<br>

## 💡질문 목록

### State 구조 선택하기

<br>

> Props를 state에 미러링하지 마세요.
<details>
<summary>prop로 state를 미러링하면 부모가 prop를 변경해도 자식의 state는 반영되지 않게 되니까, 최신값을 유지할 수 있게 prop을 바로 사용하라는 거죠?</summary>
<br/>
  
**→ 네 맞습니다! state는 한번 초기화한 이후에는 독립적으로 관리됩니다. 따라서 첫 번째 렌더링 때만 초기화 값을 사용하므로, 그 이후에 부모가 새로운 props를 전달하여 자식 컴포넌트가 리렌더링되어도 이미 초기화된 state는 변하지 않습니다.**

</details>
<br/>

> state가 중복되었으며 selectedItem을 업데이트하는 것을 잊어버렸기 때문입니다.
<details>
<summary> 왜 예시에서는 즉시 업데이트 되지 않나요? </summary>
<br/>

**→ items와 selectedItem은 모두 item이라는 중복되는 요소를 갖고 있습니다. 이것 때문에 혼동할 수 있는데, items와 selectItem은 서로 다른 state입니다.
따라서 `handleItemChange`에서 items의 요소 값이 변경되어도 selectItem은 변하지 않습니다. 버튼을 클릭하여 selectItem의 `setSelectedState` 함수가 실행되어야 비로소 값이 변하게 됩니다.
useEffect를 사용해서 items가 변경될 때 selectedItem도 업데이트되게 할 수 있지만, 중복을 제거하는 것이 더 간단하고, 필수적인 state만 유지할 수 있습니다.**

<br/>
<br/>

<details>
  <summary>메뉴 목록 컴포넌트에서 중복된 state 제거한 코드</summary>

```javascript
const [items, setItems] = useState(initialItems);
//itemId라는 필수적인 state만 유지
const [selectedId, setSelectedId] = useState(0);

const selectedItem = items.find(item =>
    item.id === selectedId
  );

function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }
```
</details>
</details>
<br/>

> 이들은 state 변수가 아니기 때문에 서로 동기화되지 않을 우려는 없습니다.
<details>
<summary> "애초에 동기화될 필요가 없기 때문에 동기화 문제를 걱정할 필요도 없다" 이 문장이 이해가 잘 안 돼서 여러번 읽어보고 해석해보았는데 이렇게 이해하는게 맞을까요?</summary>
<br/>
  
**→ 이 문제에 대해 다른 분께서 다음과 같이 답변을 달아 주셨는데, 그게 맞습니다.**

<details>
  <summary>다른 스터디원의 답변</summary>
isSending과 isSent는 status의 값을 바탕으로 계산된 상수일 뿐, status가 바뀌면 자동으로 그 값이 바뀌어 다시 계산되니 isSending과 isSent는 status의 상태 변화에 따라 동작하지만, 별도로 상태 관리나 동기화가 필요하지 않다는 의미라고 이해하면 될 거 같아요
</details>

**state 변수는 초기화된 후 독립적으로 관리되기 때문에, state가 아닌 일반 변수 혹은 상수는 재랜더링 시 다시 값이 계산되니 반드시 동기화가 됩니다!**

</details>
<br/>


### 컴포넌트 간 State 공유하기

> 이벤트 핸들러를 prop으로 전달하기를 통해 명시적으로 허용
<details>
<summary> 이벤트 핸들러를 매번 새로 정의하여 자식에게 전달하는 경우, 그럼 불필요한 재렌더링이 발생할 수 있으니까 이때 이런 식으로 useCallback 훅을 사용하는 건가요?? 
<br/>
const [activeIndex, setActiveIndex] = useState(0);
const handleShowPanel1 = useCallback(() => setActiveIndex(0), []); 
const handleShowPanel2 = useCallback(() => setActiveIndex(1), []);
</summary>
<br/>

**→ 네 맞습니다! 부모 컴포넌트가 리렌더링 될 때마다 자식에게 전달하는 이벤트 핸들러 함수가 새로 생성되므로, 자식 컴포넌트의 불필요한 리렌더링을 막기 위해 `useCallback` 을 사용하여 이벤트 핸들러를 메모이제이션 할 수 있어요!
대신 위 코드대로 작성하면 Panel 컴포넌트의 개수마다 useCallback 훅을 사용해야 하니까, 다음처럼 사용할 수 있겠네요!**

<details>
  <summary>Accordian 컴포넌트에서 useCallback 훅 사용한 코드</summary>

```javascript
function Accordian() {
	const [activeIndex, setActiveIndex] = useState(0);
	
	// 인자로 index를 받아 처리 (인라인 함수 최적화)
	// 컴포넌트가 처음 렌더링 될 때 한 번만 생성되는 useCallback 함수
	const handleShowPanel = useCallback((index) => () => {
		setActiveIndex(index);
	}, []);
	
	return (
		<>
			<Panel
				isActive={activeIndex === 0}
				onShow={handleShowPanel(0)}
			>
				...
			</Panel>
			<Panel
				isActive={activeIndex === 1}
				onShow={handleShowPanel(1)}
			>
				...
			</Panel>
		</>
	);
}
```

</details>
</details>
<br/>

> 클라이언트 측 라우팅 라이브러리도 현재 경로를 React state로 저장하고 props로 전달하도록 구현되어 있습니다
<details>
<summary>라우팅 라이브러리는 앱의 상단에 더 가깝게 생존하는 예시인게 맞나요?</summary>
<br/>

**→ 네 맞습니다! 리액트에서 Root Component(최상위 컴포넌트)는 App 컴포넌트이고, 라우팅 라이브러리는 보통 App 안에 구현되어 있습니다. 
클라이언트 애플리케이션의 모든 하위 컴포넌트들이 경로 state에 접근할 수 있어야 하기 때문에, 라우팅 라이브러리는 앱의 최상단에 위치합니다.**

</details>
<br/>


<br>

## 📋과제 설명
**TodoHeader.jsx, TodoContent.jsx, TodoAccordion.jsx 파일을 올바르게 수정해주세요.**
<img src="https://github.com/user-attachments/assets/075320b1-ebae-4e3d-975d-4620d4ffa603" width="500">
<hr>

### 문제 1
<img width="403" alt="image" src="https://github.com/user-attachments/assets/f02d3496-8999-43f9-a732-97b51a27059f"> <br>
TodoHeader의 색상이 올바르게 업데이트되도록 수정해주세요. <br>
💡힌트: 필요 없는 state는 제거하세요. <br>
<hr>

<details>
  <summary>과거 문제 2</summary>
<img width="384" alt="image" src="https://github.com/user-attachments/assets/94b3d0e1-124d-4fa7-bc5c-22b3313a4512"> <br>
TodoItem의 별 버튼 클릭 시, 해당 TodoItem의 highlight 상태가 잠시 적용되지 않아요. 클릭 시에도 highlight 상태가 적용되도록 수정해주세요! <br>
💡힌트: 중복되는 state를 제거하고, 해당 state를 id로 관리하세요. <br>
💡힌트2: TodoList, TodoItem 컴포넌트 둘 다 수정하세요. <br>
<hr>
</details>


### 문제 2
<img width="352" alt="image" src="https://github.com/user-attachments/assets/128effb9-4a34-4528-8b79-a09aefa47cb6"> <br>
todo를 삭제했을 때 total과 doneCount가 올바르게 업데이트되지 않아요. total, doneCount가 올바르게 업데이트되도록 수정해주세요! <br>
💡힌트: 필요 없는 state는 제거하고, 필요한 값은 바로 사용하세요.<br>
<hr>

### 문제 3
<img width="360" alt="image" src="https://github.com/user-attachments/assets/c8184187-7f55-4ba6-98bc-43df2462a40f"> <br>
TodoPanel이 한번에 하나만 열리도록 수정해주세요. <br>
💡힌트 : 다음 단계들을 거쳐 수정할 수 있어요. <br>
1. TodoPanel 컴포넌트의 state를 제거합니다. <br>
2. 상위 컴포넌트에서 열린 패널의 인덱스를 useState로 관리합니다. <br>
3. 상위 컴포넌트에서 정의한 이벤트 핸들러와 활성 여부를 TodoPanel 컴포넌트로 전달합니다. <br>
<hr>
