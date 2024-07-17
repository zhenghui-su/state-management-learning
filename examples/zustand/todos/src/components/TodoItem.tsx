import { CloseOutlined } from '@ant-design/icons'
import { Todo } from '../shared'
import { useStore } from '../store/useStore'

export const TodoItem = ({ item }: { item: Todo }) => {
  const { setTodos } = useStore()
  const { title, completed, id } = item

  const toggleCompleted = () =>
    setTodos((prevTodos) =>
      prevTodos.map((prevItem) =>
        prevItem.id === id ? { ...prevItem, completed: !completed } : prevItem,
      ),
    )

  const remove = () => {
    setTodos((prevTodos) => prevTodos.filter((prevItem) => prevItem.id !== id))
  }

  return (
    <>
      <input type="checkbox" checked={completed} onChange={toggleCompleted} />
      <span style={{ textDecoration: completed ? 'line-through' : '' }}>
        {title}
      </span>
      <CloseOutlined onClick={remove} />
    </>
  )
}
