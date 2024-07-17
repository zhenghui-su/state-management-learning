import { FormEvent } from 'react'
import { useStore } from './store/useStore'
import { Filter } from './components/Filter'
import { Filtered } from './components/Filtered'

let keyCount = 0

const App = () => {
  const { setTodos } = useStore()
  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = e.currentTarget.inputTitle.value
    e.currentTarget.inputTitle.value = ''
    setTodos((prevTodos) => [
      ...prevTodos,
      { title, completed: false, id: keyCount++ },
    ])
  }

  return (
    <form onSubmit={add}>
      <Filter />
      <input name="inputTitle" placeholder="Type ..." />
      <Filtered />
    </form>
  )
}

export default App
