import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import API_URL from "../Api";



export function Application() {
  const {theme} = useContext(ThemeContext)
  const navigate = useNavigate()
  const [active, setActive] = useState("login")
  const [form, setForm] = useState({
    name: "",
    surname: "",
    level: "",
    email: "",
    password: "",
  });
  const [message, setmessage] = useState("")
 const [errmessage, seterrmessage] = useState("")
 


  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  

 async function handleRegister(e) {
    e.preventDefault();
    console.log(form);
    setmessage('')
    seterrmessage('')
     try{
        const response = await fetch(`${API_URL}/api/auth/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials: "include",
        body:JSON.stringify(form)
        })
        const data = await response.json()
        if(response.ok){
            setmessage(data.message)
            seterrmessage("")

          

        navigate("/dashboard")
        }
        else{
             seterrmessage(data.message)
             setmessage("")
        }
     }
    catch(err){
      seterrmessage("Server not responding");
    }
      
  }
 async function handleLogin(e) {
    e.preventDefault();
    console.log(form);
    setmessage('')
    seterrmessage('')
try{
   const response = await fetch(`${API_URL}/api/auth/login`, {
 method:"POST",
 headers:{
   "Content-Type":"application/json"
 },
 credentials: "include",
 body:JSON.stringify({
  email: form.email,
  password: form.password})
})

const data = await response.json()
        if(response.ok){
            setmessage(data.message)

            
        navigate("/dashboard")
        }
        else{
             seterrmessage(data.message)
        }

}


catch(err){
  seterrmessage("Server not responding");
 
}
 
   
  }

  function setActiveLog(){
     setActive("register")
      setmessage("")
      seterrmessage("")
  }
  function SetActiveRegister(){
    setActive("login")
      setmessage("")
      seterrmessage("")
  }

  return (
    <div className={`flex justify-center items-center min-h-screen ${theme === 'dark'  ? "bg-gray-900" :"bg-gray-100 "}`}>
        {/*register form */}
      {active === "register" && <div className={`${theme === "dark" ?"bg-gray-800" : "bg-white"} shadow-lg rounded-xl p-8 w-full max-w-md`}>
        <h1 className="text-2xl text-blue-600 font-bold text-center mb-2">
          CGPA Tracker
        </h1>
        <p className=" text-center text-gray-400">Track Your Performance Monitor Your grouth. </p>
        <i className="ml-28 text-gray-400">Achieve Your Goals.</i>
        <h2 className="text-xl text-center font-bold  mb-6 text-blue-300">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name..."
              value={form.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg 
                ${theme === 'dark' ? "bg-gray-700 text-white"
                   :"text-black bg-gray-100"} focus:ring-2 focus:ring-blue-400 outline-none`}
            />
          </div>

          {/* Surname */}
          <div>
            <label className="block text-sm mb-1">Surname</label>
            <input
              type="text"
              name="surname"
              placeholder="Surname..."
              value={form.surname}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg
                 ${theme === 'dark' ? "bg-gray-700 text-white"
                   :"text-black bg-gray-100"} focus:ring-2 focus:ring-blue-400 outline-none`}
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm mb-1">Level</label>
            <input
              type="text"
              name="level"
              placeholder="e.g 200"
              value={form.level}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg 
                ${theme === 'dark' ? "bg-gray-700 text-white"
                   :"text-black bg-gray-100"} focus:ring-2 focus:ring-blue-400 outline-none`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="victor@gmail.com"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg 
                ${theme === 'dark' ? "bg-gray-700 text-white" 
                  :"text-black bg-gray-100"} focus:ring-2 focus:ring-blue-400 outline-none`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="*******"
              value={form.password}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg 
                ${theme === 'dark' ? "bg-gray-700 text-white" 
                  :"text-black bg-gray-100"} focus:ring-2 focus:ring-blue-400 outline-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Register Now
          </button>

          <p 
            className="text-center text-sm text-gray-500 cursor-pointer hover:text-blue-500"
            onClick={SetActiveRegister}>
            Already have an account? Login.
          </p>

          {message && <p className="text-green-500 text-sm">{message}</p>}
          {errmessage && <p className="text-red-500 text-sm">{errmessage}</p>}

        </form>
      </div>}
      
      {/*login form */}
      {active === "login" && 
      <form action="" onSubmit={handleLogin}>
         <div className= {`${theme === 'dark' ? 'bg-gray-800 text-white' :"bg-white text-black ,mn"} shadow-lg rounded-xl p-8 w-full max-w-md`}>
        <h1 className="text-2xl text-blue-500  font-bold text-center mb-2">
          CGPA Tracker
        </h1>
        <p className=" text-center text-gray-400">Track Your Performance Monitor Your growth. </p>
        <i className="ml-24 text-gray-400">Achieve Your Goals.</i>
        <h2 className="text-xl text-blue-300 text-center tr mb-6 font-bold ">
          Login
        </h2>

        {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="victor@gmail.com"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg ${theme === 'dark' ? "bg-gray-700 text-white" :"text-black bg-gray-100"} focus:ring-2 focus:ring-blue-400 outline-none`}
            />
          </div>

          {/* Password */}
          <div >
            <label className="block  mt-5 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="*******"
              value={form.password}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg ${theme === 'dark' ? "bg-gray-700 text-white" :"text-black bg-gray-100"} focus:ring-2 focus:ring-blue-400 outline-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Sign In
          </button>


        <p 
            className="text-center text-sm text-gray-500 cursor-pointer hover:text-blue-500"
            onClick={setActiveLog}>
            Don't have an account. Register
        </p>
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {errmessage && <p className="text-red-500 text-sm">{errmessage}</p>}
        </div>
        
      </form> 
       }
      
    </div>
  );
}