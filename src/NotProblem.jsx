import { useState } from 'react';

export const initialTodos = [
  { id: 0, title: '세븐틴 콘서트보러 고양가기', isDone: false, isStarred: false },
  { id: 1, title: '프로그래머스 고득점 Kit 1문제 풀기', isDone: false, isStarred: false },
  { id: 2, title: '이건뭐지 스터디 5주차 공식문서 읽기', isDone: false, isStarred: false },
  { id: 3, title: 'Recoder 과제 전시 서비스 기획하기', isDone: false, isStarred: false },
];

export function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <input
        placeholder="할 일 입력하기"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>+</button>
    </div>
  )
}

export const initialContent = [
  {
    title: "2024.10.12.토",
    content: "1. 리코더 스터디 React-SNS 리팩토링\n2. 프로그래머스 고득점 Kit 1문제 풀기"
  },
  {
    title: "2024.10.13.일",
    content: "1. LG U+ 하반기 신입사원 공채 지원\n2. 프로그래머스 고득점 Kit 1문제 풀기"
  }
];