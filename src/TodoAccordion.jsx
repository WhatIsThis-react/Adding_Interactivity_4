/* eslint-disable react/prop-types */
//TodoAccordion.jsx
import { useState } from "react";
import { initialContent } from "./NotProblem";

// 문제 3.
// TodoPanel이 한번에 하나만 열리도록 수정해주세요.
// 힌트 : 다음 단계들을 거쳐 수정할 수 있어요.
// 1. TodoPanel 컴포넌트의 state를 제거합니다.
// 2. 상위 컴포넌트에서 열린 패널의 인덱스를 useState로 관리합니다.
// 3. 상위 컴포넌트에서 정의한 이벤트 핸들러와 활성 여부를 TodoPanel 컴포넌트로 전달합니다.

export default function TodoAccordion() {
  const [openIndex, setIsOpenIndex] = useState(0);
  console.log("init", initialContent);
  return (
    <div style={{ marginTop: "50px" }}>
      <h2 style={{ textAlign: "center" }}>이전 Todo List</h2>
      {initialContent.map((content, index) => (
        <TodoPanel
          setIsOpenIndex={setIsOpenIndex}
          openIndex={openIndex}
          key={index}
          idx={index}
          title={content.title}
        >
          {content.content}
        </TodoPanel>
      ))}
    </div>
  );
}

function TodoPanel({ idx, title, children, openIndex, setIsOpenIndex }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {openIndex === idx ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsOpenIndex(idx)}>열기</button>
      )}
    </section>
  );
}
