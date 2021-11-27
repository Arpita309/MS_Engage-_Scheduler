
import React from 'react'
import './submitList.css'
import cardImg from './cardImg.png'
import choose from './choose.png'
import Navbar from '../Navbar/Navbar'
import generatePDF from '../generatePdf/generatePdf'
import {db} from '../../firebase'
import {getDocs,getDoc,query,where,collection,deleteDoc,onSnapshot,doc,updateDoc,addDoc} from 'firebase/firestore'


class SubmitList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            active:false,
            form:[],
            mode:'',
            email:'',
            name:'',
            students:[],
            subject:{},
            criteria:'',
            vaccinationStatus:'',
            fulfillsCriteria:false
        }
    }
    
    setActive=()=>{
        this.setState({active:!this.state.active})
        
    }
    handleChange=e=>{
         this.setState({[e.target.name]: e.target.value })
    }
    
    handleDelete = async (id)=>{
        await deleteDoc(doc(db,"subjects",id))
    }
    
     
    async componentDidMount(){
         onSnapshot(collection(db,"subjects"), (snapshot) => {
            snapshot.docs.forEach(docu => {
                var today = new Date();
                if(Date.parse(docu.data().date) <= today)
                {
                    console.log(docu.data().date);
                    this.handleDelete(docu.id);
                }
                else{const a=[];
                a.push(docu.data());
                a.push(docu.id);
                this.setState({form:[...this.state.form,a]});
                }   
            })   
        })
        
    }

    handleSubmit= async (id,l)=>{
        const criteriaQ=doc(db,"subjects",id)
        const criteriaSnap = await getDoc(criteriaQ);
        this.setState({criteria:criteriaSnap.data().Criteria});
        if(this.state.mode === 'Attend Physically'){
             const updRef=doc(db,"subjects",id);
             await updateDoc(updRef,{
                left:l-1
            })
            if(this.state.vaccinationStatus === this.state.criteria)
            {
                this.setState({fulfillsCriteria:true});
            }
            else if((this.state.vaccinationStatus ==='2') && ((this.state.criteria === '1')  || (this.state.criteria==='2')) ) 
                this.setState({fulfillsCriteria:true});
            else 
            {
                this.setState({fulfillsCriteria:false});    
            }
        } 
        if(this.state.fulfillsCriteria === false)
            alert("Sorry, You cannot attend class physically.");
        else{
            addDoc(collection(db,"students"),{
                subId:id,
                name:this.state.name,
                email:this.state.email,
                mode:this.state.mode
            })
            .then(()=>{
                alert("Submitted"); 
                window.location.reload(); 
            })
        }
    } 
    handleDownload= async(id)=>{
        try {
            const q=query(collection(db,"students"),where("subId","==",id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.state.students.push(doc.data());
            })
            const subj=doc(db,"subjects",id)
            const subSnap = await getDoc(subj);
            this.setState({subject:subSnap.data()});
            generatePDF(this.state.students,this.state.subject);
        } 
        catch (err) {
          console.log("error");
        }
    }
    render(){
            return(
                <div className='middlePart'>
                    <Navbar/>
                        <div className='dashboardRight'>
                            <div className='dashboardHold'>
                                <app-complete-cards>
                                    <div  className="dashHeading">Here are your forms , Hurry Up!!! <img  className='chooseImg' src={choose} ></img></div>
                                    
                                    
                                        <div className='dashProjectRow hideCard'>
                                            {this.state.form.map(value=>
                                            
                                            <div className='progressCard' key={value[1]}>
                                                
                                            <div  className="cardHead">
                                                <div  className="cardLeft">
                                                    <h3>Subject : {value[0].subject}</h3>
                                                    <h4>Date : {value[0].date}</h4>
                                                    <h4>Name : {value[0].name}</h4>
                                                    <h4>Email : {value[0].email}</h4>
                                                </div>
                                                <div  className="cardRight">
                                                    <img className='cardImg' src={cardImg}></img>
                                                </div>
                                            </div>
                                            <div className='cardMiddle'>
                                                <div  className="completeDetail">
                                                    <div  className="completeRow">
                                                        <div className="completeBox">
                                                            <h3><input  name="email" type="text"   placeholder="Email" id='email' onChange={(e)=>this.handleChange(e)}></input></h3>
                                                            <em  className="icon-template"></em>
                                                        </div>
                                                        <div className="completeBox">
                                                            <h3><input  name="name" type="text"   placeholder="Name" id='name' onChange={(e)=>this.handleChange(e)}></input></h3>
                                                            <em  className="icon-feature"></em>
                                                        </div>
                                                    </div>
                                                    <div  className="completeRow">
                                                        <h4 >
                                                            <div  className="team-dash-country">Time : {value[0].time}<span></span></div>
                                                            <em  className="icon-team"></em>
                                                        </h4>
                                                        <h4 >
                                                            <div>Seats left :{value[0].left}</div>
                                                            <em  className="icon-speed"></em>
                                                        </h4>
                                                    </div>
                                                    <div  className="completeRow" id="mode">
                                                        <div className="completeBox">
                                                            <h3><span  className="blueText"></span> <input type="radio" value="Attend Physically" name="mode"  onChange={(e)=>this.handleChange(e)}/> Attend Physically</h3>
                                                            <em  className="icon-template"></em>
                                                        </div>
                                                        <div className="completeBox">
                                                            <h3><span  className="pinkText"></span><input type="radio" value="Attend remotely" name="mode" onChange={(e)=>this.handleChange(e)}/> Attend Online</h3>
        
                                                            <em  className="icon-feature"></em>
                                                        </div>
                                                    </div>
                                                    <div  className="completeRow" id='vaccinationStatus'>
                                                        <div className="completeBox">
                                                            <h3><span  className="blueText"></span> <input type="radio" value='2' name="vaccinationStatus"  onChange={(e)=>this.handleChange(e)}/>Fully Vaccinated</h3>
                                                            <em  className="icon-template"></em>
                                                        </div>
                                                        <div className="completeBox">
                                                            <h3><span  className="pinkText"></span><input type="radio" value='1' name="vaccinationStatus"  onChange={(e)=>this.handleChange(e)}/>Partially Vaccinated</h3>
        
                                                            <em  className="icon-feature"></em>
                                                        </div>
                                                        <div className="completeBox">
                                                            <h3><span  className="pinkText"></span><input type="radio" value='0' name="vaccinationStatus"  onChange={(e)=>this.handleChange(e)}/>Not Vaccinated</h3>
        
                                                            <em  className="icon-feature"></em>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div  className="cardBottom">
                                            {value[0].left>0?<button style={{display:'flex',float:'left'}} onClick={()=>this.handleSubmit(value[1],value[0].left)}>Submit </button>:''}
                                                
                                                <button style={{display:'flex',float:'right'}} onClick={() => this.handleDownload(value[1])}>Download list</button>
                                                <div  className="clearfix"></div>    
                                            </div>
                                        </div>)}
                                    </div>
                                </app-complete-cards>
                           </div>
                        </div>
                    </div>    
        )}
}
export default SubmitList;