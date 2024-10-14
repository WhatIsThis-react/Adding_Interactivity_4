//TodoList.jsx
import { useState } from 'react';
import { initialTodos, AddTodo } from './NotProblem';

// 문제 2.
// TodoItem의 별 버튼 클릭 시, 해당 TodoItem의 highlight 상태가 잠시 적용되지 않아요.
// 클릭 시에도 highlight 상태가 적용되도록 수정해주세요!
// 힌트: 중복되는 state를 제거하고, 해당 state를 id로 관리하세요.
// 힌트2: TodoList, TodoItem 컴포넌트 둘 다 수정하세요.
function TodoList({
  todos,
  setTodos,
  onChangeTodo,
  onDeleteTodo
}) {
  const [highlightedTodoId, setHighlightedTodoId] = useState(null);

  function handleHover(todoId) {
    setHighlightedTodoId(todoId);
  }

  function handleStar(starredTodoId) {
    setTodos(todos.map(prevTodo => {
      if (prevTodo.id === starredTodoId) {
        return {
          ...prevTodo,
          isStarred: !prevTodo.isStarred
        }
      }
      return prevTodo;
    }))
  } 

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onChangeTodo={onChangeTodo}
          onDeleteTodo={onDeleteTodo}
          isHighlighted={highlightedTodoId === todo.id}
          onHover={handleHover}
          onToggleStar={handleStar}
        />
      ))}
    </ul>
  );
}

function TodoItem({todo, isHighlighted, onHover, onToggleStar, onChangeTodo, onDeleteTodo}) {
  return (
    <li 
      key={todo.id}
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {onHover(todo.id)}}
      onPointerMove={() => {onHover(todo.id)}}
      >
    <label>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={e => {
          onChangeTodo({
            ...todo,
            isDone: e.target.checked
          });
        }}
      />
      {' '}
      {todo.title}
    </label>
    <button onClick={() => onToggleStar(todo.id)}> 
      {todo.isStarred ? '★' : '☆'}
    </button>
    <button onClick={() => onDeleteTodo(todo.id)}>
      X
    </button>
  </li>
  )
}

// 문제 3.
// todo를 삭제했을 때 total과 doneCount가 올바르게 업데이트되지 않아요.
// total, doneCount가 올바르게 업데이트되도록 수정해주세요!
// 힌트: 필요 없는 state는 제거하고, 필요한 값은 바로 사용하세요.
export default function TodoContent() {
  const [todos, setTodos] = useState(initialTodos);
  
  const total = todos.length;
  const doneCount = todos.filter(todo => todo.isDone).length;

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      { id: initialTodos.length++, title: title, isDone: false }
    ]);
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(prevTodo => (
      prevTodo.id === nextTodo.id ? nextTodo : prevTodo
    )));
  }

  function handleDeleteTodo(todoId) {
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