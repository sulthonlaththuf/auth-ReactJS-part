import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async(event) => {
    try{
      event.preventDefault();
      
      const url = "http://localhost:1337/api/users/login"
      const result = await axios.post(url, this.state)
      
      const {status} = result.data
      if(status === 0) return window.location.reload()

      localStorage.setItem('token', result.data.token)

      this.props.history.push('/item')
    }catch(err){
      console.log(err)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <h2>Login</h2>
          <input type="email" name="email" onChange={this.handleChange} placeholder="email"/>
          <input type="password" name="password" onChange={this.handleChange} placeholder="password"/>
          
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
