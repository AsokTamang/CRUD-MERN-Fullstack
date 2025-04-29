import { NavLink } from "react-router-dom"
export default function Login(){

    return(
        <div className="form">
        <span><label>Email:</label> <input type='email' name='email' placeholder="Email" required /></span>
       
        <br/>
        <span><label>Password:</label>  <input type='password' name='password' placeholder="********" required /></span>
       
        <br/>
        <NavLink to='/home' className='loginbtn'>Login</NavLink>

        <br/>
        <p>Don't have a account?</p>
        <br/>
        <NavLink to='/signup'className='signupbtn'>SIGN UP</NavLink>
        
        
        </div>
    )

}