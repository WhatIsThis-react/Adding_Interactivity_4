//TodoAccordion.jsx
import { useState } from 'react';
import { initialContent } from './NotProblem';

// 문제 4.
// TodoPanel이 한번에 하나만 열리도록 수정해주세요.
// 힌트 : 다음 단계들을 거쳐 수정할 수 있어요.
// 1. TodoPanel 컴포넌트의 state와 이벤트 핸들러를 제거합니다.
// 2. 상위 컴포넌트에서 열린 패널의 인덱스를 useState로 관리합니다.
// 3. 상위 컴포넌트에서 정의한 이벤트 핸들러와 활성 여부를 TodoPanel 컴포넌트로 전달합니다.

export default function TodoAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div style={{ marginTop: "50px"}}>
      <h2 style={{ textAlign: "center" }}>이전 Todo List</h2>
      {
        initialContent.map((content, index) => (
          <TodoPanel 
            key={index} 
            title={content.title}
            isOpen={activeIndex === index}
            onShow={() => setActiveIndex(index)}
          >
            {content.content}
          </TodoPanel>
        ))
      }
    </div>
  )
}

function TodoPanel({title, children, isOpen, onShow}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isOpen ? (
        <p>{children}</p>
      ): (
        <button onClick={onShow}>열기</button>
      )}
      </section>
  )
}