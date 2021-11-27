import React,{useState} from 'react'
import './loginIcon.css'
import {logout} from '../../../firebase'
import {Tooltip} from 'reactstrap'
import {Link} from 'react-router-dom'
import {auth } from '../../../firebase'
const user=auth.currentUser;

const Tool= () => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
  
    const toggle = () => setTooltipOpen(!tooltipOpen);
  
    return (
      <div>
        <button type="button" class="  signin" id='Tooltip'  style={{marginLeft:'10px'}}>Sign In</button>
        <Tooltip placement="bottom" isOpen={tooltipOpen} target="Tooltip" toggle={toggle} className='tool' autohide={false}>
            <div class="loginDropdown ol ">
             <i class="fas fa-user-check fa-2x li" style={{color:'#e8505b'}}></i>
             <span className='demo user-txt li'>Already have an account? </span><br/>
            <Link to='/login' className='login user-txt li' >Login</Link>
            <hr/>
            <i class="fas fa-user-plus icon-newregister fa-2x li" style={{color:'#e8505b'}}></i>
            <span className='demo user-txt li'>Don't have an account?</span><br/>
            <Link to='/signup' className='login li' >Register</Link>
            </div>
        </Tooltip>
      </div>
    );
  }
class LoginIcon extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        
            isOpen: false,
            mobNavigation:false,
            user:{}
    };
    this.togglePopUp = this.togglePopUp.bind(this);
    this.handleClickOutside=this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
        
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
    
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
    
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({isOpen:false})
    }
  }
      
  closeMobNavigation=()=>{
    this.setState({mobNavigation:false})
  }

  
  togglePopUp() {
    this.setState({
      isOpen: !this.state.isOpen,mobNavigation:true
    });
  }
      
  render(){
     
    return (
      <div>
        <div className='mobuserLogin' >
          <em onClick={this.togglePopUp}  ><i className="far fa-user " style={{color:'white',top:'-100px'}}></i></em>
        </div>
        {user!==null?
          <div className={`mobNavigation ${this.state.mobNavigation?'active':''}`}>
            <div className="mobOverlay"></div>
            <div className="menuBox">
              <div className="closeNav" onClick={this.closeMobNavigation}><em className="icon-close">X</em></div>
              <div>
                <div className="welcomeUser"> Hello, <strong>{user.displayName}</strong></div>
                <ul className="mobile-loginscreen">
                  
                  <li>
                    <span className="userLogout" ><em className="icon-logout-1"></em><button onClick={() => logout()}>  Log Out</button></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>:
          <div className={`commonPopUp ${this.state.isOpen?'active':''}`} >
            <div class="popOverlay"></div>
            <div class="popHolder loginoverlayPopup" ref={this.setWrapperRef}>
              <div class="main">
                <div class="login-list">
                  <p class="login_txt"> Already have an account? </p>
                  <button class="login_btn pink" > Login </button>
                </div>
                <div class="login-list">
                  <p class="login_txt"> Don’t have an account? </p>
                  <button class="login_btn"> Register </button>
                </div>
              </div>
            </div>
        </div>}
        {user!==null?'':<div className="loginPanel" >
                <Tool/>
         </div>}  
                
      </div>

  )}

}
export default LoginIcon;