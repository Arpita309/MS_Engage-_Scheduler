import React, { useEffect, useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { auth, SignInWithEmailAndPassword, signInWithGoogle } from "../../firebase.js";


import "./login.css";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user=auth.currentUser;
    const location=useLocation();
    const navigate=useNavigate();
    useEffect(() => {
        if(user!==null){
            return navigate('/')
        }
    }, [user]);
  return (
   
    <div className='loginRegister'>
        <div  className="loginRegisterLeft">
            <div  className="loginRegisterLeft-bg1 active"></div>
            <div  className="loginRegisterLeft-bg2"></div>
            <div className="loginRegisterLeft-bg2"></div>
        </div>
            <div  className="loginRegisterRight">
                <div className="heading-appdetail">
                    <p > one last step. </p>
                    <h2 > Build your own version of <span ></span></h2>
                </div>
                <div  className="loginRegisterForm">
                    <div  className="authHeading">
                        <span  className="authHeading-main">Welcome back!</span>
                    </div>
                    <form  name="loginForm" >
                        <ul >
                            <li>
                                <span  className="field-labels">Enter Details</span>
                                <div  className="errorMsgBox"></div>
                                <input type="email" placeholder="Email address" name="email" maxlength="100" pattern="^\w+(?:[\.-]\w+)*@\w+(?:[\.-]\w+)*(?:\.\w{2,3})+$" appautofocus="" required="" id='email'onChange={(e) => setEmail(e.target.value)}/>
                            </li>
                            <li  className="clearfix">
                                <div  className="relativeRow">
                                    <input  placeholder="Password" name="password" maxlength="100" minlength="8" required="" type="password" id='password' onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <span  className="forgotPass">Forgot password?</span>
                            </li>
                            <li>
                                <button  type="submit" className="submitButton" onClick={() => SignInWithEmailAndPassword(email, password)}>
                                    Login
                                </button>
                                <p  className="orAction">Don't have an account? 
                                    <button  type="button" >SignUp</button>
                                </p>
                            </li>
                        </ul>
                    </form>
                    <div  className="socialLogin">
                        <h4><span>or connect using</span></h4>
                        <span  className="socialIcon googleIcon connectg">
                          <em  className="icon-google-plus"  onClick={signInWithGoogle} style={{color:'#dc4e41'}}><i class="fab fa-google-plus-g"></i></em>
                        </span> 
                    </div>
                </div>
            </div>
    </div>
  );
}
export default Login;


