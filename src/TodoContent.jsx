//TodoList.jsx
import { useState } from 'react';
import { initialTodos, AddTodo, TodoList } from './NotProblem';

// 문제 2.
// todo를 삭제했을 때 total과 doneCount가 올바르게 업데이트되지 않아요.
// total, doneCount가 올바르게 업데이트되도록 수정해주세요!
// 힌트: 필요 없는 state는 제거하고, 필요한 값은 바로 사용하세요.
export default function TodoContent() {
  const [todos, setTodos] = useState(initialTodos);
  const [total, setTotal] = useState(initialTodos.length);
  const [doneCount, setDoneCount] = useState(0);

  function handleAddTodo(title) {
    setTotal(total + 1);
    setTodos([
      ...todos,
      { id: initialTodos.length++, title: title, isDone: false }
    ]);
  }

  function handleChangeTodo(nextTodo) {
    if (nextTodo.isDone) {
      setDoneCount(doneCount + 1);
    } else {
      setDoneCount(doneCount - 1);
    }
    setTodos(todos.map(prevTodo => (
      prevTodo.id === nextTodo.id ? nextTodo : prevTodo
    )));
  }

  function handleDeleteTodo(todoId) {
    setTotal(total - 1);
    setTodos(todos.filter(prevTodo => prevTodo.id !== todoId));
  }

  return (
    <div>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList todos={todos} setTodos={setTodos} onChangeTodo={handleChangeTodo} onDeleteTodo={handleDeleteTodo} />
      <p> 완료한 일: {doneCount}/{total}</p>
      <hr />
    </div>
  )
}