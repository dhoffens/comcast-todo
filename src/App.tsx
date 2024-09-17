import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import store from './store';
import TodoList from './components/TodoList';
import theme from './theme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <TodoList />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
