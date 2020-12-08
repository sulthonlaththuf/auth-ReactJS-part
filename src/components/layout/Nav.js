import React, { useContext } from 'react'
import {Link, useHistory, withRouter} from 'react-router-dom'
import {Layout, Header, Navigation} from 'react-mdl'
import UserContext from '../context/UserContext'

export function Nav(props) {
  const { userData, setUserData } = useContext(UserContext)
  const history = useHistory()

  return (
      <div>
        <Layout fixedHeader>
          <Header title={<span><strong>Data Items</strong></span>}>
            {userData.user ? (
              <Navigation>
                <Link to="/">Item</Link>
                <Link to="/" onClick={() => {
                  localStorage.removeItem('token')
                  setUserData({
                    token: undefined,
                    user: undefined
                  })
                  history.push('/')
                }}>Logout</Link>
              </Navigation> 
            ): 
            ( 
              <Navigation>
                <Link to="/">Login</Link>
                <Link to="/register">Register</Link>
              </Navigation>
            )}
          </Header>
          <div style={{margin: '20px'}}>
            {props.page}
          </div>
        </Layout>
      </div>
  )
}

export default withRouter(Nav)

