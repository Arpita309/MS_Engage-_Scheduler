import React from 'react'

import Navbar from '../Navbar/Navbar';
import './homepage.css'
import student from './3187909-ai.png'
import CreateForm from '../createForm/createForm';

class Home extends React.Component{
    render(){
        return(
            <div className='wrap '>
               <Navbar/>
                <div >
                    <h1  className='contentText'>Schedule your Classes!</h1><CreateForm/>
                    <img  className='homeImage'src={student}></img>
                </div>
            </div>
        )
    }
}
export default Home;