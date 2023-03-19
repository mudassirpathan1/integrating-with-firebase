import React, { useRef, useState } from 'react'
import classes from './Login.module.css'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Login = () => {
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const confirmPasswordRef= useRef()
    const [isLogin,setIsLogin] = useState(false)
const history  =  useHistory() 
    const switchLoginHandler=()=>{
        setIsLogin(prevState=>!prevState)
    }

    const resetPasswordPage=()=>{
        history.push('/resetpassword')
    }
    const formSubmitHandler=(e)=>{
        e.preventDefault()
        
        let url;
        if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDP4-5eO8p52VEZaVMnklFgy7vKxZ_EzPg'
        }
        else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDP4-5eO8p52VEZaVMnklFgy7vKxZ_EzPg'
        }
        const email =emailInputRef.current.value
        const password=passwordInputRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if(password!==confirmPassword){
            alert('Entered password is incorrect')
        }
        
        axios.post(url,{
            email:email,
            password:password,
            returnSecureToken:true
        })
        .then((response)=>{
            if(response.status===200){
                const token= response.data.idToken
                
                localStorage.setItem('token',token)
                history.push('/welcome')
                console.log('User has successfully signed up');
                console.log(response);
            }
            
        })
        .catch((err)=>{
            alert('Authentication Failed')
        })
    }

  return (
    <div className={classes.login}>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <h3>{isLogin?'Login':'Sign Up'}</h3>
        <input type="email" placeholder='Email' ref={emailInputRef}  />
        <input type="password" minLength='6' placeholder='Password' ref={passwordInputRef}/>
        <input type="text" minLength='6' placeholder='Confirm Password' ref={confirmPasswordRef}/> 
        <button onClick={resetPasswordPage} className={classes.forgotpassword}>Forgot password?</button>
        <button className={classes.loginbutton}>{isLogin?'Login':'Sign Up'}</button>
        {/* <p>{isLogin?'Dont have an account? ':'Already have an account? '}<span onClick={switchLoginHandler}>{isLogin?'Signup':'Login'}</span></p> */}
      </form>
      <div>
      <p>{isLogin?'Dont have an account? ':'Already have an account? '}<span onClick={switchLoginHandler}>{isLogin?'Signup':'Login'}</span></p>
      </div>
    </div>
  )
}

export default Login;

//8269375272