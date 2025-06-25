import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import { Todo } from "@/types";

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch todos for a specific user
 */
export const fetchUserTodos = createAsyncThunk(
  "todos/fetchUserTodos",
  async (userId: number) => {
    const response = await api.get(`/users/${userId}/todos`);
    return response.data;
  }
);

/**
 * Async thunk to toggle a todo's completed status
 */
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }: { id: number; completed: boolean }) => {
    const response = await api.patch(`/todos/${id}`, { completed });
    return response.data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodos: (state) => {
      state.todos = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserTodos
      .addCase(fetchUserTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load todos";
      })
      // toggleTodo
      .addCase(toggleTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo: Todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update todo";
      });
  },
});

export const { clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
