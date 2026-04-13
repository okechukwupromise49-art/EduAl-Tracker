import { useState, useEffect, useContext } from "react"
import { ThemeContext } from "../App";
import API_URL from "../Api";

export function Performance(){
    const {theme, handleTheme} = useContext(ThemeContext)
    const [data, setData ] = useState({})

    useEffect(() => {
       async function fetchData(){
            try{
                const res = await fetch(`${API_URL}/api/cgpa/history`, {
                     credentials: "include",
                    });
                const result = await res.json()
                setData(result)
                console.log(result)
            }
            catch(err){
               setData("no network")
            }
        }

        fetchData()
    }, [])
    return(
        <div>
             <h3 className="text-xl ml-2 font-bold mt-8 mb-5">
                  Academic Performance 
                </h3>
                <div className="grid grid-cols-2 gap-5">
  
      <div className={`shadow-lg rounded-2xl p-6 text-center ${
          theme === "dark"
            ? "bg-gray-800 text-white border border-gray-800"
            : "bg-white text-black border border-gray-200"
        }`}>
        <p className="text-gray-500 text-sm uppercase">
          Highest Semester GPA
        </p>
        <h1 className="text-4xl font-bold text-green-600 mt-2">
          {data.bestSemester?.gpa || "0.00"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
           {data.bestSemester?.level}L • {data.bestSemester?.semester} Semeter 
        </p>
      </div>

      <div className={`shadow-lg rounded-2xl p-6 text-center ${
        theme === "dark"
          ? "bg-gray-800 text-white border border-gray-800"
          : "bg-white text-black border border-gray-200"
      }`}>
        <p className="text-gray-500 text-sm uppercase">
          Lowest Semester GPA
        </p>
        <h1 className="text-4xl font-bold text-red-500 mt-2">
          {data.worstSemester?.gpa || "0.00"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
           {data.worstSemester?.level}L • {data.worstSemester?.semester} Semeter
        </p>
      </div>

      

    </div>
        </div>

    )
}