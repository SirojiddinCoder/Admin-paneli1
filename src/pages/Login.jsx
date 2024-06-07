import React, { useState } from 'react'
import '../pages/Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
   

  const navigate = useNavigate();

    const [raqam,setRaqam] = useState("")
    const [parol,setParol] = useState("")

    console.log(raqam,parol);

    const handleSubmit =(e)=>{
        e.preventDefault(); 
        fetch('https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
              phone_number:raqam,
              password:parol
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
               if(data?.success===true){
                toast.success("Muvofaqiyatli yo'naltirildi")
                localStorage.setItem('accessToken',data?.data?.tokens?.accessToken?.token)

                navigate("/home")

                localStorage.setItem()
               } else{
                toast.error("Xatolik yuz berdi")
                navigate("/")
               }
             })
             .catch((err) => {
                console.log(err.message);
             });
    }





  return (
    <div className='Login'>
       <div class="login-page">
       
  <div class="form">
  <h3>ADMIN- PANEL</h3>
    <form class="login-form">
      <input onChange={(e)=>setRaqam(e?.target?.value)} type="text" placeholder="Phone Number" required/>
      <input onChange={(e)=>setParol(e?.target?.value)} type="text" placeholder="password" required/>
      <button onClick={handleSubmit} type='submit'>Submit</button>
   
    </form>
   
  </div>
</div>
<ToastContainer />    
    </div>
    
  )
}

export default Login;