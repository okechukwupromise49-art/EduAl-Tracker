 import { useEffect,useContext, useState } from "react";
 import { ThemeContext } from "../App";
import API_URL from "../Api";
 export function Progress(){
  const {theme, handleTheme} = useContext(ThemeContext)
const [data1, setData1] = useState({})

  useEffect(() => {
    async function fetchCgpaData() {
  
      const res = await fetch(`${API_URL}/api/cgpa/details`, {
        credentials: "include"
      });
  
      const data = await res.json();
      setData1(data)
    }
  
    fetchCgpaData();
  }, []);
    return(
        <div className={` shadow-xl rounded-2xl p-6 ${theme === 'dark' ? "bg-gray-800 text-white" : ' text-black'}`}>
      <p className="text-sm text-gray-500 uppercase">
        Progress Toward First Class
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
        <div 
          className="bg-green-500 h-3 rounded-full"
          style={{ width:  `${data1?.progress}%` }}
        ></div>
      </div>

      <p className="text-sm mt-2 text-gray-600">
       {data1?.progress}%Complete
      </p>
    </div>    
    )
}