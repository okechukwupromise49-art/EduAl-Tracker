    import { useState, useEffect, useContext} from "react";
    import {Trash2} from "lucide-react"
    import { ThemeContext } from "../App";
    
    const grades = {
        A: 5,
                        B: 4,
                        C: 3,
                        D: 2,
                        E: 1,
                        F: 0,
    };

    

    export function Cal_gpa() {
         const {theme, handleTheme} = useContext(ThemeContext)
        const [currentLevel, setCurrentLevel] = useState(0); // use number, not object
        const [message, setmessage] = useState("")
        const [errMessage, setErrMessage] = useState("")
        const [courses, setCourses] = useState(() => {
         const saved = localStorage.getItem("gpaCourses");

  return saved
    ? JSON.parse(saved)
    : {
        0: [],
        1: [],
        2: [],
        3: []
      };
});

     useEffect(() => {
      localStorage.setItem("gpaCourses", JSON.stringify(courses));
    }, [courses]);

 const saveGPA = async () => {
   
  
    // 1️⃣ clear previous courses
  await fetch("http://localhost:5000/api/gpa/reset", {
    method: "DELETE",
   credentials: "include"
  });

  // 2️⃣ save new courses

  const levelCourses = courses[currentLevel];
  for (const course of levelCourses) {
    const response = await fetch("http://localhost:5000/api/gpa/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          
      },
      credentials: "include",
      body: JSON.stringify({
        course: course.title,
        credit: course.credit,
        grade: course.grade
      })
    });

    const data = await response.json();
    if (response.ok) {
      setmessage(data.message);
      setErrMessage("");
    } else {
      setmessage("");
      setErrMessage(data.error);
    }
  }
};



    

      const calculateLevelGPA = () => {
    const levelCourses = courses[currentLevel] || [];

    let totalPoints = 0;
    let totalCredits = 0;

    levelCourses.forEach(course => {
      const credit = Number(course.credit) || 0;
      const gradePoint = grades[course.grade] || 0;

      totalPoints += credit * gradePoint;
      totalCredits += credit;
    });

    return totalCredits > 0
      ? (totalPoints / totalCredits).toFixed(2)
      : "0.00";
  };

    const handleCourseChange = (index, field, value) => {
        const levelCourses = courses[currentLevel] || [];
        const updatedCourses = [...levelCourses];
        updatedCourses[index] = {
        ...updatedCourses[index],
        [field]: value,
        };
        setCourses({
        ...courses,
        [currentLevel]: updatedCourses,
        });
        
    };

    const addCourse = () => {
  const levelCourses = courses[currentLevel] || [];

  const updated = [
        ...levelCourses,
        { title: "", credit: "", grade: "" }
    ];

    setCourses({
        ...courses,
        [currentLevel]: updated,
    });
};

const deleteBtn = async (id, index) => {
  try {
    await fetch(`http://localhost:5000/api/gpa/delete/${id}`, {
      method: "DELETE",
       credentials: "include"
    });

    // remove course from UI
    const updated = [...courses[currentLevel]];
    updated.splice(index, 1);

    setCourses({
      ...courses,
      [currentLevel]: updated,
    });

  } catch (err) {
    console.log(err);
  }
};

    return (
        <div className={`shadow-lg max-w-lg mx-auto p-6 mt-10 rounded-lg
         ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-blue-500">GPA Calculator</h1>
            <span className="text-gray-500">Enter your courses and grades</span>
            <hr className= {`mt-2 
               ${theme === "dark" ?
               " border-2 border-gray-700 bg-" :
                  " border border-gray-300 "}`} />
        </div>

       

        {/* Courses Table Header */}
        <div className={`flex justify-between mt-4  p-2 rounded font-semibold 
           ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}>
            <h3>Course Title</h3>
            <h3>Credit Units</h3>
            <h3>Grade</h3>
        </div>

        {/* Courses Input Rows */}
        <div>
            {(courses[currentLevel] || []).map((course, index) => (
            <div key={index} className="flex justify-between mt-2 gap-2">
                <input
                type="text"
                placeholder="Course"
                className={` rounded px-2 py-1 flex-1  
                  ${theme === "dark" ? 
                    "bg-gray-800 border border-2 border-gray-900 text-white"
                    : "bg-white text-black border border-gray-300"}`}
                value={course.title}
                onChange={(e) => handleCourseChange(index, "title", e.target.value)}
                />
                <input
                type="number"
                placeholder="Credit"
                className={`rounded px-2 py-1 w-20  
                  ${theme === "dark" ? "bg-gray-800 border-2 border-gray-900 text-white" :
                     "bg-white text-black border border-gray-300 "}`}
                value={course.credit}
                onChange={(e) => handleCourseChange(index, "credit", e.target.value)}
                />
                <select
                    className={`border border-gray-300 rounded-md px-2 py-1 w-20
                        ${theme === "dark" ? "bg-gray-800 border-2 border-gray-900  text-white"
                          : "bg-white text-black border border-gray-300 "}`}
                    value={course.grade}
                    onChange={(e) =>
                        handleCourseChange(index, "grade", e.target.value)
                    }
                    >
                    <option value="">Select</option>
                        {Object.keys(grades).map((g) => (
                            <option key={g} value={g}>
                            {g}
                    </option>
                    ))}
                    </select>
<button
  onClick={() => deleteBtn(course._id, index)}
  className="p-1 hover:bg-red-100 rounded"
>
  <Trash2 size={18} className="text-red-500"/>
</button>
                    
                            </div>
                          
            ))}
        </div>

        <div className="mt-4 text-center">
            <button
            onClick={addCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            + Add Course
            </button>
            
        </div>
        <div className="mt-4 text-center font-semibold text-blue-600">
  Level GPA: {calculateLevelGPA()}
</div>

        <button
        onClick={saveGPA}
        className="bg-green-600 text-white px-4 py-2 rounded ml-2"
        >
        Save GPA
        </button>
           {message && <p className="text-green-400 text-sm">{message}</p>}
            {errMessage && <p className="text-red-400 text-sm">{errMessage}</p>}
        </div>
    );
    }