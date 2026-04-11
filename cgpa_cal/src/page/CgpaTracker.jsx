import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../App";

export default function CgpaTracker() {
  const {theme, handleTheme} = useContext(ThemeContext)
  const [levels, setLevels] = useState(() => {
  const saved = localStorage.getItem("cgpaLevels");

  return saved
    ? JSON.parse(saved)
    : {
        "100": { "1": [{ course: "", grade: "", unit: "" }], "2": [] },
        "200": { "1": [], "2": [] },
        "300": { "1": [{ course: "", grade: "", unit: "" }], "2": [] },
        "400": { "1": [], "2": [] }
      };
});

const calculateCgpa = () => {
  let totalPoints = 0;
  let totalUnits = 0;

  for (const level in levels) {
    for (const semester in levels[level]) {
      for (const course of levels[level][semester]) {
        if (!course.grade || !course.unit) continue;

        let point = 0;
        switch (course.grade.toUpperCase()) {
          case "A": point = 5; break;
          case "B": point = 4; break;
          case "C": point = 3; break;
          case "D": point = 2; break;
          case "E": point = 1; break;
          case "F": point = 0; break;
          default: point = 0;
        }

        totalPoints += point * course.unit;
        totalUnits += course.unit;
      }
    }
  }

  return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : 0;

};


  const handleSubmit = async () => {
  try {

    

    const newCgpa = calculateCgpa();
    const res = await fetch("http://localhost:5000/api/notification/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         
      },
      credentials: "include",
      body: JSON.stringify({ cgpa: Number(newCgpa) })
    });
      
     await fetch("http://localhost:5000/api/cgpa/reset", {
    method: "DELETE",
    credentials: "include"
  });

    for (const level in levels) {

      for (const semester in levels[level]) {

        for (const course of levels[level][semester]) {

          if (!course.course || !course.grade || !course.unit) continue;

          await fetch("http://localhost:5000/api/cgpa/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              course: course.course,
              grade: course.grade,
              credit: course.unit,
              level: Number(level),
              semester: Number(semester)
            })
          });

        }

      }

    }

    alert("Courses saved successfully");

  } catch (err) {
    console.log(err);
  }
};

const deleteBtn = async (id, level, semester, index) => {
  

  try {
    await fetch(`http://localhost:5000/api/cgpa/delete/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    // remove course from UI
    const updated = { ...levels };

    updated[level][semester].splice(index, 1);

    setLevels(updated);

   
  } catch (err) {
    console.log(err);
  }
};

  function addCourse(level, semester) {
    const updated = { ...levels };

    updated[level][semester].push({
      course: "",
      grade: "",
      unit: ""
    });

    setLevels(updated);
  }

 useEffect(() => {
  localStorage.setItem("cgpaLevels", JSON.stringify(levels));
}, [levels]);
    
  
  function deleteCourse(level, semester, index) {
    const updated = { ...levels };

    updated[level][semester].splice(index, 1);

    setLevels(updated);
  }

  function handleChange(level, semester, index, field, value) {
    const updated = { ...levels };

    updated[level][semester][index][field] = value;

    setLevels(updated);
  }

  return (
    <div className={`p-4 min-h-screen 
    ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>

      <h1 className="text-3xl font-bold mb-6">CGPA Tracker</h1>

      {Object.keys(levels).map(level => (

        <div key={level} className="mb-10">

          <h2 className="text-xl font-semibold mb-4">
            {level} Level
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {Object.keys(levels[level]).map(semester => (

              <div
                key={semester}
                className={`p-6 rounded-xl shadow-xl
                   ${theme === "dark" ? "bg-gray-900 text-white"
                     : "bg-gray-200 text-black"}`}
              >

                <h3 className="font-semibold mb-4">
                  {semester === "1" ? "1st Semester" : "2nd Semester"}
                </h3>

                <table className="w-full text-sm">

                  <thead>
                    <tr className={`text-left
                       ${theme === "dark" ? "border-b border-gray-600" 
                       :"border-b"}`}>
                      <th>Course</th>
                      <th>Grade</th>
                      <th>Unit</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>

                    {levels[level][semester].map((course, index) => (
                        
                      <tr key={index} className={`
                       ${theme === "dark" ?
                         "border-b border-gray-600" 
                       :"border-b"}`}>

                        <td>
                          <input
                            className={` p-1 w-full 
                              ${theme === "dark" ? "bg-gray-900  text-white border border-gray-700" 
                                : "bg-gray-300 text-black border border-white"}`}
                            value={course.course}
                            onChange={(e) =>
                              handleChange(level, semester, index, "course", e.target.value)
                            }
                          />
                        </td>

                        <td>
                          <select
                            className={`border p-1 
                              ${theme === "dark" 
                                ? "bg-gray-900 text-white border border-gray-700"
                                 : "bg-gray-300 text-black border border-white"}`}
                            value={course.grade}
                            onChange={(e) =>
                              handleChange(level, semester, index, "grade", e.target.value)
                            }
                          >
                            <option value="">Grade</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                          </select>
                        </td>

                        <td>
                          <input
                            type="number"
                            className={`border p-1 w-16 
                              ${theme === "dark" ? "bg-gray-900 text-white border border-gray-700"
                                 : "bg-gray-300 text-black border border-white"}`}
                            value={course.unit}
                            onChange={(e) =>
                              handleChange(level, semester, index, "unit", Number(e.target.value))
                            }
                          />
                        </td>

                        <td>
                          <button
                            onClick={() => deleteBtn(course._id, level, semester, index)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>
            <div className="flex justify-between">
                     <button
                  onClick={() => addCourse(level, semester)}
                  className="mt-4 text-blue-600 font-medium"
                >
                  + Add Course
                </button>

                <div className="mt-10 text-center">
  <button
    onClick={handleSubmit}
    className="px-6 py-3 bg-green-600 text-white rounded-lg"
  >
    Save CGPA Data
  </button>
</div>
            </div>
               

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>
  );
}
