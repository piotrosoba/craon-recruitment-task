import { Avatar, Typography, Dropdown, Menu } from 'antd'
import connect from '../../StateManagement/connect'
import actions from '../../StateManagement/actions'

import './Header.css'

const Header = ({ globalState: { auth }, dispatch }) => {
  return (
    <div className='header_root'>
      <Typography.Text>
        {auth.user.firstName} {auth.user.lastName}
      </Typography.Text>
      <Dropdown
        trigger='click'
        overlay={
          <Menu
            items={[
              {
                key: 'logout',
                label: 'Logout',
                onClick: () => dispatch({ type: actions.AUTH_LOGOUT })
              }
            ]}
          />
        }
        placement='bottomLeft'
      >
        <Avatar src={auth.user.image} style={{ cursor: 'pointer' }} />
      </Dropdown>
    </div>
  )
}

export default connect()(Header)
