import React from 'react'
import '../Navbar/loginIcon/loginIcon.css'
import {db} from '../../firebase'
import {Link} from 'react-router-dom'
import './createForm.css'
import formImg from'./formImg.png'
import { collection, getDocs,query,where ,addDoc} from 'firebase/firestore';

class CreateForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        
          isOpen: false,
          mobNavigation:false,
          email:'',
          name:'',
          sub:'',
          date:'',
          time:'',
          maxS:'',
          que:'',
          Criteria:''
        
        };
        this.togglePopUp = this.togglePopUp.bind(this);
        this.handleClickOutside=this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
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
      handleChange=(e)=>{
        if(e.target.name === 'date')
        {
          var today = new Date();
          var nextWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));

          
          if (nextWeek < Date.parse(e.target.value) || Date.parse(e.target.value)<today){
              alert("Classes can be Created for next seven days only."); 
          } 
          else this.setState({[e.target.name]: e.target.value });                     
        }
        else this.setState({[e.target.name]: e.target.value })
    }
    
    handleSubmit = async (e) => {
      e.preventDefault();
     
    const subRef=collection(db,"subjects");
    const qu=query(subRef,where("time","==",this.state.time ),where( "date","==", this.state.date) );

        const q = await getDocs(qu);
        if(q.docs.length !==0){
          alert("Already a class Exist");
        }
        const sameSub=query(subRef,where("subject","==",this.state.sub ),where( "date","==", this.state.date) );

        const sameSubject = await getDocs(sameSub);
        if(sameSubject.docs.length !==0){
          alert("Already subject for today exist");
        }
        if((sameSubject.docs.length===0 )|| (q.docs.length===0)){
          await addDoc(collection(db,"subjects"),{
            email: this.state.email,
            maxSeats:this.state.maxS,
            date:this.state.date,
            time:this.state.time,
            name:this.state.name,
            subject:this.state.sub,
            left:this.state.maxS,
            Criteria:this.state.Criteria
          });
        }
}
  
    render(){
     return (
      <div>
           <div>
           <em onClick={this.togglePopUp}  className='createBtn'>Create Form</em> <Link to='/chooseForms'   className='createBtn' style={{marginTop:'10px',display:'flex'}}>Go to forms</Link></div>
          <div className={`commonPopUp ${this.state.isOpen?'active':''}`} >
               <div class="popOverlay"></div>
               <div class="popHolder loginoverlay" ref={this.setWrapperRef}>
                   <div class="main">
                       
                       <form name='registerForm' onSubmit={this.handleSubmit}>
                   <ul >
                       <li className='login-list'>
                       <img  style={{width:'71px', height:'56px'}}src={formImg}/>
                           <span  className="field-labels">Create a  scheduler</span>
                           <div  className="errorMsgBox"></div>
                           <div  className="input-container">
                               <input  type="text" placeholder="Email Address" maxLength="100" email="" autoComplete="off" name="email"  id='email'   onChange={(e)=>this.handleChange(e)}></input>
                           </div>

                       </li>
                       
                       <li className='login-list'>
                           <input  name="name" type="text" pattern="[a-zA-Z ]*" maxLength="100" placeholder="Enter Name (ex. John Smith)" id='name' onChange={(e)=>this.handleChange(e)}></input>
                       </li>
                       
                       <li className='login-list'>
                           <input  name="sub" type="text" pattern="[a-zA-Z ]*" maxLength="100" placeholder="Enter Subject" id='sub' onChange={(e)=>this.handleChange(e)}></input>
                       </li>
                       <li className='login-list'>
                           <input  name="date" type="date"   placeholder="Date" id='date' onChange={(e)=>this.handleChange(e)}></input>
                       </li>
                       <li className='login-list'>
                           <input  name="time" type="time"   placeholder="time" id='time' onChange={(e)=>this.handleChange(e)}></input>
                       </li>
                       <li className='login-list'>
                           <input  name="maxS" type="number"   placeholder="Enter maximum seats" id='maxS' onChange={(e)=>this.handleChange(e)}></input>
                       </li>
                       <div  id="criteria">
                       <p style={{marginLeft:'-670px'}}> Select criteria for students to attend Physically : </p>
                      
                          <input  className='radio' type="radio" value='2' name="Criteria"  onChange={(e)=>this.handleChange(e)}  style={{marginLeft:'-600px'}}/>Fully Vaccinated
                        
                          <input  className='radio' type="radio" value='1' name="Criteria"  onChange={(e)=>this.handleChange(e)} style={{marginLeft:'50px'}}/>Partially Vaccinated
                      
                          <input className='radio' type="radio" value='0' name="Criteria"  onChange={(e)=>this.handleChange(e)} style={{marginLeft:'50px'}}/>None
                       </div>
                       <li className='login-list'>
                           <button  type="submit" className="submitButton" ><span  className="icon-right" ></span> Create </button>
                           
                       </li>
                       
                   </ul>

               </form>
                   </div>
               </div>
           </div>
           
       </div>

     
     )}
}
export default CreateForm;