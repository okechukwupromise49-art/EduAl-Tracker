import { Routes, Route } from "react-router-dom";
import LandingPage from "./page/LandingPage"
import "./App.css"
import { Application } from "./page/Application";
import { DashBoard } from "./page/Dashdoard";
import { Cal_Cgpa } from "./page/Cal_gpa";
import { Cal_gpa } from "./page/Cal";
import CgpaTracker from "./page/CgpaTracker";
import { Setting } from "./page/Setting";
import { createContext, useState, useEffect} from "react";
import { Notification } from "./page/setting/Notificatin";
import { About } from "./page/setting/About";
import { Ask_Ai } from "./page/Ask_Ai";
import { EditProfile } from "./page/setting/EditProfile";
import { History } from "./page/setting/History";
import { Premium } from "./page/setting/Premium";
import { General } from "./page/setting/General";
import { Privacy } from "./page/setting/Privacy";
import { Analytic } from "./page/Analytic";



 export const ThemeContext = createContext()

function App() {
const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
      localStorage.setItem("theme", theme);
  
      // apply class to body
      document.body.className = theme;
    }, [theme]);

    const handleTheme =() => {
      
       setTheme(prev => (prev === 'light' ? "dark" : "light"))

    }

    

  return (
    

   <div>
    <ThemeContext.Provider value={{ theme, handleTheme }}>
    <Routes>
       <Route path="/" element={<LandingPage/>} />
       <Route path="/apply" element={<Application/>} />
       <Route path="/dashboard" element={<DashBoard/>} />
       <Route path="/cal" element={<CgpaTracker/>} />
        <Route path="/cal_gpa" element={<Cal_gpa/>} />
        <Route path="/apply/setting" element={<Setting/>} />
        <Route path="/apply/notification" element={<Notification/>}/>
        <Route path="/apply/about" element={<About/>} />
        <Route path="/dash/ask" element={<Ask_Ai/>} />
        <Route path="/dash/edit" element={<EditProfile/>} />
        <Route path="/dash/history" element={<History/>} />
         <Route path="/dash/premium" element={<Premium/>} />
         <Route path="/dash/general" element={<General/>} />
         <Route path="/dash/privacy" element={<Privacy/>} />
         <Route path="/dash/analytic" element={<Analytic/>} />
    </Routes>
     </ThemeContext.Provider>
   </div>
  )
}

export default App
