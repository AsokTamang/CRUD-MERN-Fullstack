import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaPlusCircle } from "react-icons/fa";
import { SiSinglestore } from "react-icons/si";
export default function Navbar(){
    const Style={
        color:'red',
        fontWeight:'bold',
    }
    return(
       <div className='navlink'>
        <NavLink style={({isActive})=>(isActive?Style:null)}  to="/">Product store <SiSinglestore/></NavLink>
        <NavLink style={({isActive})=>(isActive?Style:null)}  to="/create"><FaPlusCircle/></NavLink>
    </div>
    )

}
