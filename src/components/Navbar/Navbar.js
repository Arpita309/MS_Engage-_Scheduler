import React from 'react'
import {Link} from 'react-router-dom'

import User from './loggedInUser/loggedInUser'
import LoginIcon from './loginIcon/loginIcon'
import './Navbar.css'
import {auth} from '../../firebase'
const user=auth.currentUser;
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        mobNavigation:false
    }}

    closeNavigation=()=>{
      this.setState({mobNavigation:false})
    }
    mobNavigation=()=>{
      this.setState({
        mobNavigation:true
      });
    }
    render() {
      return (
          <nav id='header'>
            <div className='container-fluid'>
              <div className="logo">
                <img width="107" height="107" alt="" className="mainLogo" src="https://microsoft.acehacker.com/fte2021/img/demo-content/images/scheduler.png"></img>
                <LoginIcon/>
                {user!==null?<User/>:''}
              </div>
             </div>
                
           </nav>
           
  )}
  
}