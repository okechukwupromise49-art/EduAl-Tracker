import {  Pencil, History, Moon, Key, Bell, Info, Crown, Settings, ArrowLeft, ChevronRight  } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App";


export function Setting(){
     const [data, setData] = useState("")
     const {theme, handleTheme} = useContext(ThemeContext)
    const navigate = useNavigate()
    useEffect(() => {
      async function fetchData() {
        
    
        const res = await fetch("http://localhost:5000/api/auth/details", {
           credentials: "include"
        });
    
        const data = await res.json();
        console.log(data);
        setData(data)
      }
    
      fetchData();
    }, []);
    return(
        <>
           <div className={`p-4 min-h-screen
             ${theme === "dark" ? "bg-gray-900 text-white"
              : "bg-gray-100 text-black"}`}>

  {/* Header */}
  <div className="flex items-center justify-between ">
    <ArrowLeft  className="hover:text-blue-500" onClick={() => navigate("/dashboard")} />
    <p className="text-xl font-semibold ">Settings</p>
    <div></div>
  </div>

  {/* Profile Avatar */}
  <div className="flex justify-center mt-6">
  {data.profilePic ? 
   <img
      src={data.profilePic}
      alt="Profile"
      className="w-16 h-16 rounded-full object-cover"
    /> :
   <div className="rounded-full text-white bg-gray-400 
    w-16 h-16 flex items-center justify-center text-xl font-bold">
      {data.name ? data.name.charAt(0).toUpperCase() : "P"}
    </div>
    } 
  </div>

  {/* Name */}
  <div className="flex items-center justify-center gap-3 mt-4">
    <p className="text-3xl font-bold">{data.name} {data.surname}</p>
    <Pencil onClick={()=> navigate("/dash/edit")}/>
  </div>
  <div className="text-center text-sm text-gray-600b ">
    <p>{data.email}</p>
  </div>

  {/* Edit Button */}
  <div className="flex justify-center mt-4">
    <button className="px-4 text-white py-2 bg-gray-500 rounded flex items-center justify-center"
        onClick={()=> navigate("/dash/edit")}>
      Edit Profile
    </button>
  </div>

  <hr className="mt-6 text-xl" />

            <div className="">

                
              <div className={`flex items-center justify-between p-5 mt-2 font-semibold rounded shadow ${
                      theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
                    }`}
                    onClick={() => navigate("/dash/general")}>
                <div className="flex items-center gap-3">
                    <Settings size={20}/>
                    <p>General Setting</p>
                </div>

                <ChevronRight/>

                </div>

                 <div className={`flex items-center justify-between p-5 mt-2 font-semibold bg-gray-300 rounded shadow
                  ${theme === "dark" ? "bg-gray-800 text-white" :"bg-gray-300 text-black"}` } >

                <div className="flex items-center gap-3">
                    <Moon size={20}/>
                    <p>Night Mode</p>
                </div>

                 <label className="name">
                    <input 
                      type="checkbox" 
                      checked={theme === "dark"} 
                      onChange={handleTheme} 
                    />
                 <span className="slider"></span>
                  </label>

                </div>

               <div className={`flex items-center justify-between p-5 mt-2 font-semibold bg-gray-300 rounded shadow
                  ${theme === "dark" ? "bg-gray-800 text-white" :"bg-gray-300 text-black"}` } 
                  onClick={() => {navigate("/apply/notification")}}>

                <div className="flex items-center gap-3">
                    <Bell size={20}/>
                    <p>Notification</p>
                </div>

                <ChevronRight/>

                </div>

                <div className={`flex items-center justify-between p-5 mt-2 font-semibold bg-gray-300 rounded shadow
                  ${theme === "dark" ? "bg-gray-800 text-white" :"bg-gray-300 text-black"}` } 
                  onClick={() => navigate("/dash/history")}>

                <div className="flex items-center gap-3">
                    <History size={20}/>
                    <p>History</p>
                </div>

                <ChevronRight/>

                </div>

           <div className={`flex items-center justify-between p-5 mt-2 font-semibold bg-gray-300 rounded shadow
                  ${theme === "dark" ? "bg-gray-800 text-white" :"bg-gray-300 text-black"}` } 
                  onClick={() => navigate("/dash/premium")}>

                <div className="flex items-center gap-3">
                    <Crown size={20}/>
                    <p>Upgrade to Go</p>
                </div>

                <ChevronRight/>

                </div>
                <div className={`flex items-center justify-between p-5 mt-2 font-semibold bg-gray-300 rounded shadow
                  ${theme === "dark" ? "bg-gray-800 text-white" :"bg-gray-300 text-black"}` }
                   onClick={()=> navigate("/apply/about")} >

                <div className="flex items-center gap-3"
                   >
                    <Info size={20}/>
                    <p>About</p>
                </div>

                <ChevronRight/>

                </div>
              <div className={`flex items-center justify-between p-5 mt-2 font-semibold bg-gray-300 rounded shadow
                  ${theme === "dark" ? "bg-gray-800 text-white" :"bg-gray-300 text-black"}` } 
                  onClick={() => navigate("/dash/privacy")}>

                <div className="flex items-center gap-3">
                    <Key size={20}/>
                    <p>Privacy</p>
                </div>

                <ChevronRight/>

                </div>
            </div>
               
            </div>
        </>
    )
}