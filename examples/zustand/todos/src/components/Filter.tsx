import { Radio } from 'antd'
import { useStore } from '../store/useStore'

export const Filter = () => {
  const { filter, setFilter } = useStore()
  return (
    <Radio.Group onChange={(e) => setFilter(e.target.value)} value={filter}>
      <Radio value="all">All</Radio>
      <Radio value="completed">Completed</Radio>
      <Radio value="incompleted">Incompleted</Radio>
    </Radio.Group>
  )
}
