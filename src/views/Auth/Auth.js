import { useCallback } from 'react'
import { Card, Form, Input, Button, Alert } from 'antd'
import connect from '../../StateManagement/connect'
import actions from '../../StateManagement/actions'

import './Auth.css'

const Auth = ({ dispatch, globalState: { auth } }) => {
  const onFinish = useCallback(
    formValues => {
      localStorage.setItem('username', formValues.username)

      dispatch({ type: actions.LOG_IN_REQUEST, username: formValues.username, password: formValues.password })
    },
    [dispatch]
  )

  return (
    <div className='auth_root'>
      <Card>
        <Form
          onFinish={onFinish}
          className='auth_form'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ password: '', username: localStorage.getItem('username') || '' }}
        >
          <Form.Item label='Login' name='username'>
            <Input disabled={auth.loading} />
          </Form.Item>
          <Form.Item label='Passowrd' name='password'>
            <Input type='password' disabled={auth.loading} />
          </Form.Item>
          {auth.errorMessage && <Alert className='auth_alert' type='error' message={auth.errorMessage} />}

          <Button htmlType='submit' type='primary' block loading={auth.loading}>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default connect([actions.AUTH_UPDATE])(Auth)
