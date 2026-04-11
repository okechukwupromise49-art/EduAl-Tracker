import { Calculator, BarChart3, GraduationCap } from "lucide-react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [isLoading, setIsloading] = useState(false)
  const navigate = useNavigate()


 useEffect(() => {
  const checkUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/details", {
        credentials: "include"
      });

      if (res.ok) {
        navigate("/dashboard"); // ✅ auto redirect
      }

    } catch (err) {
      console.log("User not logged in");
    }
  };

  checkUser();
}, []);
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div className="grading bg-gradient-to-r from-blue-800 to-blue-500 text-white text-center py-20 px-6">
        <div className="md:flex md:item-center md:justify-center mb-6">
    <GraduationCap 
      size={60} 
      className="animate-float text-blue-300 drop-shadow-lg"
    />
  </div>
        <h1 className="text-4xl md:text-5xl font-bold">
          Track. Analyze. Improve Your CGPA.
        </h1>
        <p className="mt-4 text-lg">
          Smart academic tracking for serious students.
        </p>

        <button 
            className="mt-8 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
            onClick={() => navigate("/apply")}>
         Get Started
        </button>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        
        <div className="feature bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <Calculator size={28} className="text-blue-500" />
          <h2 className="text-xl font-semibold mb-2"> Instant CGPA Calculation</h2>
          <p className="text-gray-600">
            Calculate GPA and CGPA automatically with real-time updates.
          </p>
        </div>

        <div className="feature bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <BarChart3 size={28} className="text-green-500" />
          <h2 className="text-xl font-semibold mb-2"> Performance Insights</h2>
          <p className="text-gray-600">
            Monitor your semester growth and track improvement trends.
          </p>
        </div>

        <div className="feature bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          
          <GraduationCap size={28} className="text-purple-500" />
          <h2 className="text-xl font-semibold mb-2"> Graduation Prediction</h2>
          <p className="text-gray-600">
            Know your expected class of degree before final year.
          </p>
        </div>

      </div>

      {/* GRADING SCALE SECTION */}
      <div className="grading  max-w-4xl mx-auto bg-white p-8 rounded-xl shadow mb-16">
        <h2 className="text-2xl text-blue-700 font-bold text-center mb-6">
          Grading Scale (5.0 System)
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-3">Grade</th>
              <th className="border p-3">Score</th>
              <th className="border p-3">Grade Point</th>
            </tr>
          </thead>

          <tbody className="text-center">
            <tr  className="hover:bg-gray-100 transition"><td className="border p-3">A</td><td className="border p-3">70-100</td><td className="border p-3">5</td></tr>
            <tr className="hover:bg-gray-100 transition"><td className="border p-3">B</td><td className="border p-3">60-69</td><td className="border p-3">4</td></tr>
            <tr  className="hover:bg-gray-100 transition"><td className="border p-3">C</td><td className="border p-3">50-59</td><td className="border p-3">3</td></tr>
            <tr  className="hover:bg-gray-100 transition"><td className="border p-3">D</td><td className="border p-3">45-49</td><td className="border p-3">2</td></tr>
            <tr  className="hover:bg-gray-100 transition"><td className="border p-3">E</td><td className="border p-3">40-44</td><td className="border p-3">1</td></tr>
            <tr  className="hover:bg-gray-100 transition"><td className="border p-3">F</td><td className="border p-3">0-39</td><td className="border p-3">0</td></tr>
          </tbody>
        </table>
      </div>

      {/* FINAL CTA */}
      <div className="text-center pb-16">
        <h3 className="text-2xl font-semibold mb-4">
          Ready to take control of your academic performance?
        </h3>
        <button 
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg shadow-lg transition"
           onClick={() => navigate("/apply")}>
          Start Tracking Now
        </button>
      </div>

    </div>
  );
}

export default LandingPage;