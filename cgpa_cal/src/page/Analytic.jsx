import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft,TrendingUp } from "lucide-react";


import { GridSection } from "../component/GridSection";
import { Predict } from "../component/Predict";
import GpaChart from "../GpaChart";
import { Progress } from "../component/Progress";
import { Performance } from "../component/Performance"
import { ThemeContext } from "../App";





export function Analytic() {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState('')
  const navigate = useNavigate();


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

  return (
    <div className={`min-h-screen  pb-12 ${theme === "dark" ? "bg-gray-900 text-white " : "bg-white text-gray-700"}` }>
      {/* Header */}
      <div className={`sticky top-0 border-b z-10 ${theme === "dark" ? "bg-gray-800 tex" : "bg-white text-"}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <ArrowLeft
            size={28}
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => navigate("/dashboard")}
          />
          <h1 className="text-2xl font-bold ">
            Performance Analysis
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold ">
            Welcome Back, <span className="text-blue-600">{data.name}</span> 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's an overview of your academic performance
          </p>
        </div>

        {/* Grid Overview Cards */}
        <GridSection/>

        {/* Prediction Section */}
        <div className="mt-10 rounded">
          <Predict/>
        </div>

        {/* GPA Trend Chart */}
        <div className="mt-10">
          <div
            className={`rounded-3xl p-6 shadow-sm border ${
              theme === "dark"
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              GPA Performance Trend
              <TrendingUp size={20} className="text-green-500" />
            </h3>
             <GpaChart/>
          </div>
        </div>

        {/* Progress & Performance */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div>
                <Progress/>
          </div>
          <div>
              <Performance/>
          </div>
        </div>
      </div>
    </div>
  );
}