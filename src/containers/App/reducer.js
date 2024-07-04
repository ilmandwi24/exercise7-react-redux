import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

import {
  SET_LOCAL,
  SET_THEME,
  SET_POPUP,
  SET_LOADING,
  SET_DATA,
  SET_TODO,
  DEL_TODO,
  CHECKED_TODO,
  CLEAR_COMPLETED_TODO,
  SET_FILTER,
} from '@containers/App/constants';

export const initialState = {
  locale: 'en',
  theme: 'dark',
  popup: {
    open: false,
    title: '',
    message: '',
  },
  data: [],
  todos: [],
  filter: 'ALL',
  loading: false,
};

export const storedKey = ['locale', 'theme'];

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCAL:
        draft.locale = action.locale;
        break;
      case SET_THEME:
        draft.theme = action.theme;
        break;
      case SET_POPUP:
        draft.popup = action.popup;
        break;
      case SET_LOADING:
        draft.loading = action.loading;
        break;
      case SET_DATA:
        draft.data = action.data;
        break;
      case SET_TODO:
        draft.todos = [...draft.todos, { id: uuidv4(), todo: action.todo, checked: false }];
        break;
      case DEL_TODO:
        draft.todos = draft.todos.filter((item) => item.id !== action.id);
        break;
      case CHECKED_TODO:
        // draft.todos = [];
        draft.todos = draft.todos.map((item) => (item.id === action.id ? { ...item, checked: !item.checked } : item));
        break;
      case CLEAR_COMPLETED_TODO:
        // draft.todos = [];
        draft.todos = draft.todos.filter((todo) => !todo.checked);
        break;
      case SET_FILTER:
        // draft.todos = [];
        draft.filter = action.filter;
        break;
    }
  });

export default appReducer;
