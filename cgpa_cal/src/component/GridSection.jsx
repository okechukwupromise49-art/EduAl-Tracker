import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";


export function GridSection(){
  const navigate = useNavigate()
  const {theme} = useContext(ThemeContext)
   const [data, setData] = useState({})
const [data1, setData1] = useState({})
const isDark = theme === "dark";

const cardStyle = `shadow-lg rounded-2xl p-6 text-center transition transform hover:-translate-y-2 hover:shadow-2xl ${
  isDark ? "bg-gray-800 text-white" : "bg-white text-black"
}`;
 useEffect(() => {

  async function fetchData() {


    const [gpaRes, cgpaRes] = await Promise.all([
      fetch("http://localhost:5000/api/gpa/addGpa", {
        credentials: "include"
      }),
      fetch("http://localhost:5000/api/cgpa/details", {
         credentials: "include"
      })
    ]);

    const gpaData = await gpaRes.json();
    const cgpaData = await cgpaRes.json();

    console.log(cgpaData)
    console.log(gpaData)

    setData(gpaData);
    setData1(cgpaData);
  }

  fetchData();

}, []);
    return(
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

  {/* CURRENT CGPA */}
  <div className={cardStyle}
     onClick={() => navigate("/dash/history")}>
    
    <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm uppercase tracking-wide`}>
      Current CGPA
    </p>
    <h1 className="text-4xl font-bold text-blue-600 mt-2">
      {data1?.cgpa ?? "00"}
    </h1>
    <p className="text-sm font-medium text-green-600 mt-1">
      {data1?.classification}
    </p>
  </div>

  {/* TOTAL CREDIT UNITS */}
  <div className={cardStyle}>
    <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm uppercase tracking-wide`}>
      Total Credit Units
    </p>
    <h1 className="text-4xl font-bold mt-2">
      {data1?.totalCredits ?? "00"}
    </h1>
  </div>

  {/* TOTAL GRADE POINTS */}
  <div className={cardStyle}>
    <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm uppercase tracking-wide`}>
      Total Grade Points
    </p>
    <h1 className="text-4xl font-bold mt-2">
      {data1?.totalGradePoints ?? "00"}
    </h1>
  </div>

  {/* CURRENT GPA */}
  <div className={cardStyle}
    onClick={() => navigate('/cal_gpa')}>
    <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm uppercase tracking-wide`}>
      Current Semester GPA
    </p>
    <h1 className="text-4xl font-bold text-purple-600 mt-2">
      {data.gpa ?? "0.00"}
    </h1>
    <p className="text-sm font-medium text-green-600 mt-1">
      {data.classification}
    </p>
  </div>

</section>
    )
}