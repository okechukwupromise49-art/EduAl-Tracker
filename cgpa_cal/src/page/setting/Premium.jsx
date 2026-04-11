import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Crown } from "lucide-react";
import { ThemeContext } from "../../App";
import { useContext } from "react";
;

export function Premium() {

  const {theme} = useContext(ThemeContext)
  const navigate = useNavigate();

  const features = [
    { name: "Basic CGPA & GPA Calculator", free: true, premium: true },
    { name: "Semester History & Charts", free: true, premium: true },
    { name: "Basic Performance Insights", free: true, premium: true },
    { name: "Advanced Prediction (What-If)", free: false, premium: true },
    { name: "Goal Tracking & Progress Alerts", free: false, premium: true },
    { name: "Detailed Semester Analysis", free: false, premium: true },
    { name: "Export Results (PDF/CSV)", free: false, premium: true },
    { name: "Ad-Free Experience", free: false, premium: true },
  ];

  return (
    <div className= {`min-h-screen pb-12 
        ${theme === "dark" ? "bg-gray-900 text-white":
         "bg-gray-50 text-black"}`}>
      {/* Header */}
      <div className={`p-4 flex items-center gap-3 border-b 
            ${theme === "dark" ? 'bg-gray-800 text-white' 
            :'bg-white text-black'}`}>
        <ArrowLeft 
          size={28} 
          className="cursor-pointer hover:text-blue-600 transition" 
          onClick={() => navigate("/dashboard")} 
        />
        <div className="flex items-center">
          <h1 className="text-3xl font-bold ">Tracker</h1>
          <h2 className="text-3xl font-bold text-blue-600 ml-1">Go</h2>
          <Crown size={24} className="text-amber-500 ml-2" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-8">
        <div className="text-center mb-10">
          <p className="text-gray-500 text-lg">
            Unlock powerful tools to track, predict, and excel in your academics
          </p>
        </div>

        {/* Pricing Card */}
        <div className={` rounded-3xl shadow-xl overflow-hidden border border-gray-100 ${theme === "dark" ? "bg-gray-800 text-white":
         "bg-gray-50 text-black"}`}>
          {/* Plan Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center">
            <div className="flex justify-center mb-3">
              <Crown size={48} className="text-amber-300" />
            </div>
            <h2 className="text-4xl font-bold">Tracker Go</h2>
            <p className="mt-2 text-blue-100">Premium Academic Experience</p>
            
            <div className="mt-6">
              <span className="text-5xl font-bold">₦2,000</span>
              <span className="text-blue-100">/month</span>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 text-sm mb-6">
              <div></div>
              <div className="text-center font-medium text-gray-500">Free</div>
              <div className="text-center font-bold text-blue-600">Go</div>
            </div>

            {features.map((feature, index) => (
              <div 
                key={index}
                className="grid grid-cols-3 gap-4 py-4 border-b border-gray-100 last:border-none items-center"
              >
                <div className={`font-medium ${theme === 'dark' ? "text-white" : 'text-gray-700'}`}>{feature.name}</div>
                
                <div className="flex justify-center">
                  {feature.free ? (
                    <Check size={22} className="text-green-500" />
                  ) : (
                    <X size={22} className="text-gray-300" />
                  )}
                </div>

                <div className="flex justify-center">
                  <Check size={22} className="text-blue-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade Button */}
          <div className="p-6 pt-2">
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-4 rounded-2xl text-lg shadow-lg shadow-blue-500/30"
              onClick={() => alert("Upgrade to Tracker Go - Coming Soon!")}
            >
              Upgrade to Tracker Go
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              ₦2,000 per month • Cancel anytime • Secure payment
            </p>
          </div>
        </div>

        {/* Restore Subscription */}
        <div className="text-center mt-8">
          <button 
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            onClick={() => alert("Restore Subscription - Feature Coming Soon")}
          >
            Restore previous subscription
          </button>
        </div>
      </div>
    </div>
  );
}