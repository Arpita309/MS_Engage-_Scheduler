import React from 'react'
import './loggedInUser.css'
import { logout } from '../../../firebase'
import {auth} from '../../../firebase'
const loggedIn=auth.currentUser;
class User extends React.Component{
    constructor(props){
        super(props)
        this.state={
            active:false
        }
    }
    setActive=()=>{
        this.setState({active:!this.state.active})
        
    }
   
    render(){
        return(
            <div className="userPanel">
                <h3> Hello <strong onClick={()=>this.setState({active:!this.state.active})}>{loggedIn?loggedIn.displayName.split(" ")[0] :''}</strong></h3>
                <div className={`userDropdown ${this.state.active?'active':''}`} style={{zIndex:'2'}}>
                    <ul>
                        <li><button onClick={() => logout()}>  Log Out</button></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default User;