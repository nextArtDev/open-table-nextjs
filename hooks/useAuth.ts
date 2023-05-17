import { AuthenticationContext } from '@/app/context/AuthContext'
import axios from 'axios'
import React from 'react'
import { removeCookies } from 'cookies-next'
 function  useAuth() {
      const { setAuthState } = React.useContext(
    AuthenticationContext
  )
    const signin = async ({email, password}:{email:string, password:string} , handleClose:()=>void )=>{
        setAuthState({
            data:null, error:null, loading:true
        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin",{
                email , password
            })
            
            setAuthState({
            data:response.data, error:null, loading:false
        });
        handleClose()
        } catch (error: any) {
            setAuthState({
            data:null, error:error.response.data.errorMessage, loading:false
        })
        }
    }
    const signup = async (
      {email, password, firstName, lastName, city, phone}:{email:string, password:string,firstName:string, lastName:string, city:string, phone:string} , handleClose:()=>void 
    )=>{
      setAuthState({
            data:null, error:null, loading:true
        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup",{
                email , password,firstName, lastName, city, phone
            })
            
            setAuthState({
            data:response.data, error:null, loading:false
        });
        handleClose()
        } catch (error: any) {
            setAuthState({
            data:null, error:error.response.data.errorMessage, loading:false
        })
        }
    }

    const signout = ()=>{
      removeCookies('jwt')

      setAuthState({
            data:null, error:null, loading:false
        })
    }

  return {
    signin,
    signup,
    signout
  }
}

export default useAuth