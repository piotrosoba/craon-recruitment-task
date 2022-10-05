import connect from '../../StateManagement/connect'
import actions from '../../StateManagement/actions'
import { Button, Input } from 'antd'
import './AddTaskForm.css'
import { useCallback, useState } from 'react'

const AddTaskForm = ({ dispatch, globalState }) => {
  const [text, setText] = useState('')
  const addTask = useCallback(() => {
    setText(text => {
      const task = {
        id: window.crypto.randomUUID(),
        completed: false,
        todo: text,
        userId: globalState.auth.user.id
      }
      dispatch({ type: actions.ADD_TASK, task })
      return ''
    })
  }, [dispatch, globalState])

  return (
    <div className='add_task_form_root'>
      <Input onPressEnter={addTask} value={text} onChange={evt => setText(evt.target.value)} />
      <Button onClick={addTask} type='primary'>
        Add
      </Button>
    </div>
  )
}

export default connect()(AddTaskForm)
