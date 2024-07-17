import { create } from 'zustand'
import { Todo, Store, FilterType } from '../shared'

export const useStore = create<Store>((set) => ({
  filter: 'all',
  todos: [],
  setFilter(filter: FilterType) {
    set({ filter })
  },
  setTodos(fn: (todos: Array<Todo>) => Array<Todo>) {
    set((prev) => ({ todos: fn(prev.todos) }))
  },
}))
