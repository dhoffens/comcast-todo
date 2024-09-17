import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Comcast Todo Exercise</h1>
      <TodoList/>
    </div>
  );
}

export default App;
