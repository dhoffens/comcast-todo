import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null
}

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
      try {
        const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
          params: {
            _limit: limit,
            _page: page,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue('Error fetching todos');
      }
    }
  );

  const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        completeTodo: (state, action: PayloadAction<number>) => {
          const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
          if (todoIndex >= 0) {
            state.todos[todoIndex].completed = true;
          }
        },
      },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTodos.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
          state.loading = false;
          state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { completeTodo } = todoSlice.actions;
  export default todoSlice.reducer;