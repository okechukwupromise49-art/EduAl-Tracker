import { useContext, useEffect, useState } from "react";
import { ArrowLeft, Inbox, TrendingUp } from "lucide-react";
import { ThemeContext } from "../../App";
import API_URL from "../../Api";

export function History() {
  const {theme} = useContext(ThemeContext)
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchHistory = async () => {
    try {
      

      const res = await fetch(`${API_URL}/api/cgpa/history`, {
        credentials: "include",
      });

      const result = await res.json();

      console.log("API RESPONSE:", result);

      // ✅ THIS IS THE FIX
      setHistory(result.history || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchHistory();
}, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-500">Loading academic history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <ArrowLeft 
          className="cursor-pointer hover:text-blue-600" 
          onClick={() => window.history.back()} 
        />
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Academic History</h1>
      </div>

      {Array.isArray(history) && history.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-gray-500">
          <Inbox size={64} className="mb-4" />
          <p className="text-xl font-medium">No academic records yet</p>
          <p className="text-sm mt-2">Your semesters will appear here once you add courses</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Array.isArray(history) && history.map((sem, index) => (
            <div
              key={index}
              className={` rounded-2xl shadow-sm overflow-hidden ${theme === "dark" ? "bg-gray-800 rounded-2xl" : "border border-gray-100 bg-white"}`}
            >
              {/* Semester Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    Level {sem.level} — {sem.semester} Semester
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Semester GPA</p>
                  <p className="text-2xl font-bold">{sem.semesterGPA}</p>
                </div>
              </div>

              {/* Courses List */}
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium text-gray-500">Course Code</th>

                        <th className="text-center py-3 font-medium text-gray-500">Units</th>
                        <th className="text-center py-3 font-medium text-gray-500">Grade</th>
                        <th className="text-center py-3 font-medium text-gray-500">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sem.courses.map((course, i) => (
                        <tr key={i} className="border-b last:border-none">
                          <td className="py-3 font-medium">{course.course}</td>
                          
                          <td className="py-3 text-center">{course.credit}</td>
                          <td className="py-3 text-center font-semibold">{course.grade}</td>
                          <td className="py-3 text-center">
                           {course.credit * (
                                course.grade === "A" ? 5 :
                                course.grade === "B" ? 4 :
                                course.grade === "C" ? 3 :
                                course.grade === "D" ? 2 :
                                course.grade === "E" ? 1 : 0
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer Summary */}
              <div className={` px-4 py-3 border-t flex justify-between text-sm ${theme === "dark" 
                ? "bg-gray-700 rounded-2xl" : " bg-gray-50 "}`}>
                <div>
                  Total Credits: <span className="font-semibold">{sem.totalCredits}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" />
                  Cumulative CGPA: <span className="font-bold text-xl text-green-600">{sem.gpa}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}