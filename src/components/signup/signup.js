import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword,signInWithGoogle} from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "../login/login.css";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }  
  }, [user, loading]);
  return (
    <div className='loginRegister'>
        <div className='loginRegisterLeft'>
            <div className="loginRegisterLeft-bg2 active"></div>
        </div>
        <div className='loginRegisterRight'>
            <div  className="heading-appdetail">
                <p> one last step. </p>
                <h2> Build your own version of <span></span></h2>
            </div>
            <div className='loginBox active'>
                <div className='loginRegisterForm'>
                    <form name='registerForm'>
                        <ul >
                            <li>
                                <span  className="field-labels">Sign up to scheduler</span>
                                <div  className="errorMsgBox"></div>
                                <div  className="input-container">
                                    <input  type="text" placeholder="Email Address" maxLength="100" email="" autoComplete="off" name="email"  id='email' onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                            </li>
                            <li >
                                <input  name="name" type="text" pattern="[a-zA-Z ]*" maxLength="100" placeholder="Enter Name (ex. John Smith)" id='name' onChange={(e) => setName(e.target.value)}></input>
                            </li>
                            <li>
                                <div  className="relativeRow"><input  placeholder="Password" name="password" maxLength="100" minLength="8"  type="password" onChange={(e)=>setPassword(e.target.value)} id='password'></input></div>
                            </li>
                            <li>
                                <button  type="submit" className="submitButton" onClick={() => registerWithEmailAndPassword(name,email, password)}><span  className="icon-right"></span> Register </button>
                            </li>
                            <div  className="backtoSigninMob"> Already have an account? <span><Link to='/login' style={{color:'#0071e4'}}>Sign in</Link></span></div>
                        </ul>
                    </form>
                    <div>
                        <div  className="socialLogin">
                           <h4><span>or connect using</span></h4>
                            <span  className="socialIcon googleIcon">
                                <em  className="icon-google-plus" onClick={signInWithGoogle}  style={{color:'#dc4e41'}}><i class="fab fa-google-plus-g"></i></em>
                             </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
  );
}
export default SignUp;