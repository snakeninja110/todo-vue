import * as types from './mutation-types'
import { addTodo, toggleTodo, deleteFromTodo, saveTodo, toggleAll, clearCompleted } from '../common/todo/todo'

export const addNewTodo = ({commit, state}, todo) => {
  commit(types.SET_TODOS, addTodo(state.todos, todo))
}

export const toggleATodo = ({commit, state}, todo) => {
  commit(types.SET_TODOS, toggleTodo(state.todos, todo))
}

export const removeATodo = ({commit, state}, todo) => {
  commit(types.SET_TODOS, deleteFromTodo(state.todos, todo))
}

export const saveATodo = ({commit, state}, {todo, text}) => {
  // action 只能接受2个参数，所以多参数的话把第2个参数作为对象传递
  commit(types.SET_TODOS, saveTodo(state.todos, todo, text))
}

export const toggleAllTodo = ({commit, state}, isChecked) => {
  commit(types.SET_TODOS, toggleAll(state.todos, isChecked))
}

export const clearAllCompleted = ({commit, state}) => {
  commit(types.SET_TODOS, clearCompleted(state.todos))
}

export const setVisibilityFilter = ({commit}, filter) => {
  commit(types.SET_VISIBILITYFILTER, filter)
}
