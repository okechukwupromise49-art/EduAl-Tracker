import { useState, useEffect, useContext } from "react";
import { Menu, X,BookOpen, Crown, Search,Brain,  Settings, Bell, Home, Calculator, BarChart2, Section } from "lucide-react";
import GpaChart from "../GpaChart";
import { GridSection } from "../component/GridSection";
import { Progress } from "../component/Progress";
import { useNavigate } from "react-router-dom";     
import { Predict } from "../component/Predict"
import { Performance } from "../component/Performance"
import { ThemeContext } from "../App";
import API_URL from "../Api";
import BottomAd from "../ads";



export function DashBoard() {
  const {theme, handleTheme} = useContext(ThemeContext)
  const [showManual, setShowManual] = useState(false);
  const [data, setData] = useState("")
  const [count, setCount] = useState("")
  const navigate = useNavigate()

useEffect(() => {
  async function fetchData() {
    

    const res = await fetch(`${API_URL}/api/auth/details`, {
       credentials: "include"
    });

    const data = await res.json();
    console.log(data);
    setData(data)
  }

  fetchData();
}, []);



useEffect(() => {
  const fetchCount = async () => {
   

    const res = await fetch(
      `${API_URL}/api/notification/unMarkAsRead`,
      {
        method: "PATCH",
         credentials: "include"
      }
    );

    const data = await res.json();
    setCount(data.count);
  };

  fetchCount();

  const interval = setInterval(fetchCount, 5000); // every 5 sec

  return () => clearInterval(interval);
}, []);



       return (
              <div className="flex ">

              {/* LEFT MANUAL PANEL */}
              <div
                className={`
                fixed md:static top-0 left-0 h-full md:h-auto 
                ${showManual ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
                w-64 bg-blue-700 text-white
                transition-transform duration-300
                z-50
              `}
              >
                  <div className="p-4 font-bold text-lg border-b flex justify-between border-blue-500">
                    <BookOpen size={20} />
                  EduAi Tracker
                  <button onClick={() => setShowManual(prev => !prev)}>
                  {showManual ? <X size={25} /> : <Menu size={25} />}
              </button>
                  </div>

                  <div className="p-4 space-y-2">
                  <p 
                      className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                      onClick={()=> {navigate("/dashboard")}}>
                    <Home size={20} />
                    <span className="font-medium">Dashboard</span>
                  </p>
                  <p className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                      onClick={() => navigate('/cal')}>
                    <Calculator size={20} />
                    <span className="font-medium">Calculate CGPA</span>
                  </p>
                  <p className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                    onClick={() => navigate("/dash/analytic")}>
                    <BarChart2 size={20} />
                    <span className="font-medium">Analytic</span>
                  </p>
                  <p className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                  onClick={()=> {navigate("/apply/setting")}}>
                    <Settings size={20} />
                    <span className="font-medium">Setting</span>
                  </p>
                  <p className="flex items-center bg-green-500 gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                      onClick={() => navigate("/dash/premium")}
                      >
                    <Crown size={20} />
                    <span className="font-medium">Premium Package</span>
                  </p>
                  </div>
              </div>

              {/* MAIN CONTENT */}
              <div className="flex-1 transition-all duration-300">

                  {/* HEADER */}
              <div className="flex-1 transition-all duration-300">

          
          <div className="flex items-center justify-between p-4 bg-bue-600 text-whie">

              {/* LEFT SIDE */}
              <div className="flex items-center space-x-4">
              <button onClick={() => setShowManual(prev => !prev)}>
                  {showManual ? <X size={25} /> : <Menu size={25} />}
              </button>
              </div>

              

              {/* CENTER (SEARCH) */}
              <div className= {`shadow-xl w-9/12 hidden md:block flex items-center p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-200 text-black"} `}>
              <Search size={20} className="text-blue-500 mr-2" />
              <input
                  type="text"
                  placeholder="Search..."
                  className={` ${theme === "dark" ? "bg-gray-700" : "bg-gray-200 text-black"} outline-none w-full `}
              />
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center space-x-4">
              
              {/* Notification */}
              <div className="relative cursor-pointer"
                  onClick={() => navigate("/apply/notification")}>
                  <Bell size={22} />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm px-1.5 rounded-full">
                      {count}
                    </span>
                  )}
                                </div>

              {/* Profile */}
              <div className="w-10 h-10"
              
                onClick={() => navigate("/dash/edit")}>
  {data.profilePic ? (
    <img
      src={data.profilePic}
      alt="Profile"
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
      {data.name?.charAt(0)?.toUpperCase() || "O"}
    </div>
  )}
</div>

              </div>

          </div>
          </div>

                  {/* PAGE CONTENT */}
                  <div className="p-6">
                      <div className="flex justify-between items-center mb-6">

                    <div>
                      <h2 className="text-3xl font-bold">
                        Welcome Back, <span className="text-blue-600">{data.name}</span> 👋
                      </h2>
                      <p className="text-gray-500 mt-1">
                        Your Academic Journey continues here
                      </p>
                    </div>
                     {/* CURRENT LEVEL BADGE */}
                 {/* 
                
                  <div className="bg-blue-500 text-white md:px-4 md:py-2 md:rounded-xl md:text-sm text-xs p-1 rounded-lg  font-semibold shadow-md">
                    {data.level} Level
                  </div>  */}

      </div>
                  {/*grid section */}
                  <GridSection/>
                  {/*Cal button */}
          <div className="flex gap-4 mt-8">
              <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
                onClick={() => navigate('/cal')}>
                Calculate CGPA
              </button>

              <button 
                 className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow hover:bg-purple-700 transition"
                 onClick={() => navigate('/cal_gpa')}>
                Calculate GPA
              </button>
            </div>
                  
          </div>

          <>
            <Predict/>
          </>

          {/*chart trend */}
              <div
                className={`shadow-2xl border rounded-2xl p-6 mt-8 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-gray-100 text-black border-gray-200"
                }`}
                
              >
                <h3 className={`text-xl font-bold mb-4 `}>
                  GPA Performance Trend
                </h3>
                <GpaChart />
              </div>

            

              <div>
                <Progress/>
              </div>  

    {/*performance */}
    <Performance/>
   
              </div>
              <BottomAd/>
              <button 
          className="fixed  bottom-4 right-4 bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-800"

          onClick={() => navigate("/dash/ask")}
        >
          <Brain/>
          Ask Ai
          </button>
              </div>
          );
          }
          