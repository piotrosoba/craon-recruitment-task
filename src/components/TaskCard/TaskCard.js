import { Card, Typography, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import connect from '../../StateManagement/connect'
import actions from '../../StateManagement/actions'

import './TaskCard.css'
import { useCallback } from 'react'

const TaskCard = ({ task, dispatch }) => {
  const toggleTask = useCallback(() => {
    dispatch({ type: actions.TOGGLE_TASK, task })
  }, [dispatch, task])

  const deleteTask = useCallback(() => {
    dispatch({ type: actions.DELETE_TASK, task })
  }, [dispatch, task])

  return (
    <Card onClick={toggleTask} style={{ backgroundColor: task.completed ? '#a3ffb6' : '#ffffff', cursor: 'pointer' }}>
      <div className='task_card_root'>
        <Typography.Text className='task_card_text'>{task.todo}</Typography.Text>
        <Button onClick={deleteTask} type='text' icon={<DeleteOutlined />} />
      </div>
    </Card>
  )
}

export default connect([actions.TASKS_UPDATE])(TaskCard)
