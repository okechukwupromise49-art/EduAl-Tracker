  import { useState } from "react";
  import { Divide, GraduationCap } from "lucide-react";


  const cgpa_input = [
    { title: "100 - 1st Semester" },
    { title: "100 - 2nd Semester" },
    { title: "200 - 1st Semester" },
    { title: "200 - 2nd Semester" },
    { title: "300 - 1st Semester" },
    { title: "300 - 2nd Semester" },
    { title: "400 - 1st Semester" },
    { title: "400 - 2nd Semester" }
  ];

  export function Cal_Cgpa() {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [values, setValues] = useState({}); // store grade/credit for each semester
    const [active, setActive] = useState("simple")
    const [message, setMessage] = useState("")
    const [errMessage, setErrMessage] = useState("")
    




    const grade = values[cgpa_input[currentLevel].title]?.input1 || "";
    const credit = values[cgpa_input[currentLevel].title]?.input2 || "";

    const handleChange = (e, inputIndex) => {
      const levelTitle = cgpa_input[currentLevel].title;
      setValues({
        ...values,
        [levelTitle]: {
          ...values[levelTitle],
          [`input${inputIndex}`]: e.target.value
        }
      });
    };


  

    const handleNext = async () => {
      
      if (currentLevel < cgpa_input.length - 1) setCurrentLevel(currentLevel + 1);

      
    };

    const handlePrev = () => {
      if (currentLevel > 0) setCurrentLevel(currentLevel - 1);
    };

    // 1️⃣ Calculate cumulative CGPA
    let totalGradePoints = 0;
    let totalCredits = 0;

    Object.values(values).forEach((val) => {
      const grade = Number(val.input1) || 0;
      const credit = Number(val.input2) || 0;
      totalGradePoints += grade
      totalCredits += credit;
    });

    const cumulativeCGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";

    // Current level values (for the input fields)

  const handleSubmit = async () => {
      setErrMessage("")
      setMessage("")
       try{
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/cgpa/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`   // <--- send token here
      },
      body: JSON.stringify({
        semesters: values,
        cgpa: cumulativeCGPA
      })
    })
     const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      setErrMessage("");
    } else {
      setMessage("");
      setErrMessage(data.error);
    }

      }catch(err){
         setErrMessage("server error")
      }
    }
    return (
      <>
        {active == "simple" &&  <div><div className="max-w-md mx-auto mt- p-6 bg-white shadow-lg rounded-lg">
        <GraduationCap 
        size={60} 
        className="animate-float ml-36 text-blue-300 drop-shadow-lg"
      />
        
    <div className="text-center mb-6">   
    <h1 className="text-2xl font-bold text-blue-500">
      CGPA Calculator
    </h1>
    <p className="text-sm text-gray-500 mt-1">
      Enter your grade points and credit units for each semester
    </p>
  </div>
        <h3 className="text-xl font-bold text-center text-gray-600 mb-6">
          {cgpa_input[currentLevel].title}
        </h3>

        <div className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Grade"
            value={grade}
            onChange={(e) => handleChange(e, 1)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Credit"
            value={credit}
            onChange={(e) => handleChange(e, 2)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentLevel === 0}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              currentLevel === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>


           <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md text-white font-semibold bg-green-600 hover:bg-green-700"
            >
              Submit
            </button>

          <button
            onClick={handleNext}
            disabled={currentLevel === cgpa_input.length - 1}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              currentLevel === cgpa_input.length - 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Next
          </button>

          
        </div>
 {message && <p className="text-green-400 text-sm">{message}</p>}
            {errMessage && <p className="text-red-400 text-sm">{errMessage}</p>}
        <div className="mt-6 p-4 bg-gray-100 rounded-md text-center font-semibold text-gray-800">
          Cumulative CGPA: {cumulativeCGPA}
        </div>
        <div className="mt-6 text-sm text-gray-600">
  
  {Object.entries(values).some(([level, val]) => val.input1 || val.input2) && (
  <div>
    <div className="flex justify-between bg-gray-200 px-3 py-1 font-semibold rounded-t">
      <p>Semester</p>
      <p>Grade Units</p>
    </div>

    {Object.entries(values)
      .filter(([level, val]) => val.input1 || val.input2)
      .map(([level, val]) => (
        <div
          key={level}
          className="flex justify-between px-3 py-1 bg-gray-50 border-b border-gray-200"
        >
          <span>{level}</span>
          <span>
            Grade: {val.input1 || "-"} | Credit: {val.input2 || "-"}
          </span>
        </div>
      ))}
  </div>
)}
</div>
        <p className="text-sm text-blue-600 font-medium text-center mb-4">
            Semester {currentLevel + 1} of {cgpa_input.length}
          </p>
      <div className="bg-blue-50 p-3 rounded-md text-xs text-gray-700 mb-4">
        <p>5.00 – 4.50 = First Class</p>
        <p>4.49 – 3.50 = Second Class Upper</p>
        <p>3.49 – 2.40 = Second Class Lower</p>
      </div>
      <p className="text-center text-blue-500 text-xs hover:text-blue-700 cursor-pointer"
      onClick={() => setActive("advance")}
      >Switch To Advanced Calculator</p>
      </div>

         <button 
          className="fixed  bottom-4 right-4 bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-800"

          onClick={() => setActive("advance")}
        >
          Advanced Calculator
        </button> </div> }

       
        
        {/* advance feature */}

       
      </>
      
    );
  }