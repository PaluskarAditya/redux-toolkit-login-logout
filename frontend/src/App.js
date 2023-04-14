import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css';
import { login, reset } from './features/authSlice';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [cred, set] = useState({ uname: "", pass: "" })
  const dispatch = useDispatch()
  const change = (e) => {
    set({ ...cred, [e.target.name]: e.target.value })
  }
  const user = useSelector(state => state.auth.user)
  const log = useSelector(state => state.auth.log)

  useEffect(()=>{
    if (log) toast.success("Login success", { position: "top-center" })
  }, [user, log])

  const submit = () => {
    dispatch(login(cred.uname, cred.pass))
  }

  const logout = () => {
    dispatch(reset())
    toast.success("Logout success", { position: "top-center" })
  }

  return (
    <div className="App">
      <ToastContainer />
      <h1 className='mb-2'><strong>Login</strong></h1>
      <div className="login">
        <input className="form-control my-1" type="text" name="uname" placeholder='username' onChange={change} />
        <input className="form-control my-1" type="text" name="pass" placeholder='password' onChange={change} />
        <div>
          <button className='btn btn-primary mt-2' onClick={submit}>login</button>
          {
            user ? <button className='btn btn-primary mt-2 mx-2' onClick={logout}>logout</button> : ""
          }
        </div>
      </div>
    </div>
  );
}

export default App;
