import { act, fireEvent, render } from '@testing-library/react'
import { create } from 'zustand'

type FilterType = 'all' | 'completed' | 'incompleted'

type Todo = {
  id: number
  title: string
  completed: boolean
}

type State = {
  todos: Array<Todo>
  filter: FilterType
}

type Actions = {
  setFilter: (filter: FilterType) => void
  setTodos: (fn: (todos: Array<Todo>) => Array<Todo>) => void
  reset: () => void
}

const INITIAL_STATE: State = {
  filter: 'all',
  todos: [{ title: '吃饭', completed: false, id: 0 }],
}

const useStore = create<State & Actions>((set) => ({
  ...INITIAL_STATE,
  setFilter(filter) {
    set({ filter })
  },
  setTodos(fn) {
    set((prev) => ({ todos: fn(prev.todos) }))
  },
  reset() {
    set(INITIAL_STATE)
  },
}))

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  ;(console.warn as jest.Mock).mockRestore()
  useStore.getState().reset()
})

describe('测试re-render', () => {
  it('不加selector', async () => {
    let renderCount = 0

    const Display = () => {
      renderCount++ // 每次re-render就会增加1
      const { todos } = useStore()
      return (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>title: {todo.title}</div>
          ))}
        </div>
      )
    }

    const Control = () => {
      const { setFilter } = useStore()
      return <button onClick={() => setFilter('completed')}>dispatch</button>
    }

    const App = () => (
      <>
        <Display />
        <Control />
      </>
    )
    const { getByText } = render(<App />)
    act(() => {
      fireEvent.click(getByText('dispatch'))
    })
    expect(renderCount).toBe(2)
  })
  it('加selector', async () => {
    let renderCount = 0

    const Display = () => {
      renderCount++ // 每次re-render就会增加1
      const todos = useStore((state) => state.todos)
      return (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>title: {todo.title}</div>
          ))}
        </div>
      )
    }

    const Control = () => {
      const { setFilter } = useStore()
      return <button onClick={() => setFilter('completed')}>dispatch</button>
    }

    const App = () => (
      <>
        <Display />
        <Control />
      </>
    )
    const { getByText } = render(<App />)
    act(() => {
      fireEvent.click(getByText('dispatch'))
    })
    expect(renderCount).toBe(1)
  })
})
