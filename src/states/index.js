import { combineReducers } from 'redux';

import { reduce as CustomTaskListReducer } from './CustomTaskListState';
import { reduce as TodoListReducer } from './TodoListState';

// Register your redux store under a unique namespace
export const namespace = 'getting-started';

// Combine the reducers
export default combineReducers({
  customTaskList: CustomTaskListReducer,
  todoList: TodoListReducer,
});
