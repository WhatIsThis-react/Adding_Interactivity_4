# 이건뭐지 리액트 공식문서 읽기 5주차 스터디

## ✏️학습목표
5주차 공식문서 내용 복습하기
- State 구조 선택하기
- 컴포넌트 간 State 공유하기

## 📋과제 설명
**TodoHeader.jsx, TodoContent.jsx, TodoAccordion.jsx 파일을 올바르게 수정해주세요.**
<img src="https://github.com/user-attachments/assets/075320b1-ebae-4e3d-975d-4620d4ffa603" width="500">
<hr>

### 문제 1
<img width="403" alt="image" src="https://github.com/user-attachments/assets/f02d3496-8999-43f9-a732-97b51a27059f"> <br>
TodoHeader의 색상이 올바르게 업데이트되도록 수정해주세요. <br>
💡힌트: 필요 없는 state는 제거하세요. <br>
<hr>

### 문제 2
<img width="384" alt="image" src="https://github.com/user-attachments/assets/94b3d0e1-124d-4fa7-bc5c-22b3313a4512"> <br>
TodoItem의 별 버튼 클릭 시, 해당 TodoItem의 highlight 상태가 잠시 적용되지 않아요. 클릭 시에도 highlight 상태가 적용되도록 수정해주세요! <br>
💡힌트: 중복되는 state를 제거하고, 해당 state를 id로 관리하세요. <br>
💡힌트2: TodoList, TodoItem 컴포넌트 둘 다 수정하세요. <br>
<hr>

### 문제 3
<img width="352" alt="image" src="https://github.com/user-attachments/assets/128effb9-4a34-4528-8b79-a09aefa47cb6"> <br>
todo를 삭제했을 때 total과 doneCount가 올바르게 업데이트되지 않아요. total, doneCount가 올바르게 업데이트되도록 수정해주세요! <br>
💡힌트: 필요 없는 state는 제거하고, 필요한 값은 바로 사용하세요.<br>
<hr>

### 문제 4
<img width="360" alt="image" src="https://github.com/user-attachments/assets/c8184187-7f55-4ba6-98bc-43df2462a40f"> <br>
TodoPanel이 한번에 하나만 열리도록 수정해주세요. <br>
💡힌트 : 다음 단계들을 거쳐 수정할 수 있어요. <br>
1. TodoPanel 컴포넌트의 state를 제거합니다. <br>
2. 상위 컴포넌트에서 열린 패널의 인덱스를 useState로 관리합니다. <br>
3. 상위 컴포넌트에서 정의한 이벤트 핸들러와 활성 여부를 TodoPanel 컴포넌트로 전달합니다. <br>
<hr>
