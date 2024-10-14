/* eslint-disable react/prop-types */
//Todo.jsx

// 문제 1.
// TodoHeader의 색상이 올바르게 업데이트되도록 수정해주세요.
// 힌트: 필요 없는 state는 제거하세요.
export default function TodoHeader({ color }) {
  return (
    <div>
      <h1 style={{ color: color, textAlign: "center" }}>Todo List</h1>
    </div>
  );
}
