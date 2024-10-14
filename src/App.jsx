import { useState, useEffect } from 'react';
import TodoHeader from './TodoHeader';
import TodoContent from './TodoContent';
import TodoAccordion from './TodoAccordion';

export default function App() {
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        오늘은? {' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="red">🚨빨간불</option>
          <option value="yellow">⚠️노란불</option>
          <option value="green">🍀초록불</option>
        </select>
      </p>
      {/* 1. Header의 색상 올바르게 업데이트하기 */}
      <TodoHeader color={color} />
      {/* 2. TodoItem의 hover, focus 올바르게 적용하기 */}
      {/* 3. TodoContent의 카운터 올바르게 업데이트하기 */}
      <TodoContent />
      {/* 4. TodoContent가 한 번에 하나의 패널만 열리게 변경 */}
      <TodoAccordion />
    </div>
  );
}