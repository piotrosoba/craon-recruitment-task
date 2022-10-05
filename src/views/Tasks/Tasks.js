import { useCallback, useEffect, useState } from 'react'
import { Spin, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import connect from '../../StateManagement/connect'
import actions from '../../StateManagement/actions'

import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import TaskCard from '../../components/TaskCard/TaskCard'

import './Tasks.css'

const Tasks = ({ dispatch, globalState: { tasks } }) => {
  useEffect(() => {
    dispatch({ type: actions.GET_TASKS })
  }, [dispatch])

  const [search, setSearch] = useState('')
  const searchUpdate = useCallback(value => {
    setSearch(value)
  }, [])

  const dataToShow = tasks.data.filter(task => task.todo.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='tasks_root'>
      <div className='tasks_actions'>
        <AddTaskForm />
        <Input
          value={search}
          onChange={evt => searchUpdate(evt.target.value)}
          addonBefore={<SearchOutlined />}
          style={{ maxWidth: 200 }}
        />
      </div>
      {dataToShow.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
      {tasks.loading && <Spin size='large' style={{ alignSelf: 'center' }} />}
    </div>
  )
}

export default connect([actions.TASKS_UPDATE])(Tasks)
