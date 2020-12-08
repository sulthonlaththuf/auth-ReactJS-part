import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Item from './components/page/Item'
import Nav from './components/layout/Nav'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserContext from './components/context/UserContext'

export function App () {
  const [userData, setUserData] = useState({
    token : undefined,
    user : undefined
  })

  useEffect(() => {
    const checkLoggedIn = async() => {
      let token = localStorage.token 
      if(!token === null) {
        localStorage.setItem('token', '')
        token = ''
      } 
      const urlValidToken = 'http://localhost:1337/api/users/tokenIsValid'
      const tokenRes = await axios.post(urlValidToken, null, {
        headers : {'x-auth-token' : token}
      })
      if(tokenRes.data){
        const urlUser = 'http://localhost:1337/api/users'
        const userRes = await axios.get(urlUser, {
          headers : {'x-auth-token' : token}
        })
        if(userRes){
          setUserData({
            token,
            user: userRes.data
          })
        }
      }
    }

    checkLoggedIn()
  }, [])

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Nav page={
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/item" exact component={Item}/>
              <Route path="/register" exact component={Register}/>
              {/* <Route path="/register" /> */}
            </Switch>
          } />
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default App