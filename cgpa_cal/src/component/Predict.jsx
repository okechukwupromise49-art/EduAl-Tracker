import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../App";


export function Predict() {
   const {theme, handleTheme} = useContext(ThemeContext)
  const [gpaData, setGpaData] = useState(null);
  const [cgpaData, setCgpaData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {

        const [gpaRes, cgpaRes] = await Promise.all([
          fetch("http://localhost:5000/api/gpa/addGpa", {
            credentials: "include"
          }),
          fetch("http://localhost:5000/api/cgpa/details", {
             credentials: "include"
          })
        ]);

        const gpa = await gpaRes.json();
        const cgpa = await cgpaRes.json();

        console.log(gpa);
        console.log(cgpa);

        setGpaData(gpa);
        setCgpaData(cgpa);

      } catch (error) {
        console.error("Error fetching prediction data:", error);
      }
    }

    fetchData();
  }, []);

  if (!cgpaData) {
    return <p>Loading prediction...</p>;
  }

  return (
    <div className={`shadow rounded p-4 
    ${theme === "dark" ? "bg-gray-800 " : "bg-white"}`}>
      <div>
        <h1 className="text-lg font-bold">
          Target: First Class (4.50)
        </h1>

        <h2 className="text-md mt-2">
          You need an additional{" "}
          <span className="font-bold text-xl text-green-600">
            {cgpaData.neededForFirstClass}
          </span>{" "}
          CGPA points to reach First Class.
        </h2>
      </div>

      <div className="mt-7">
        <h1 className="text-lg font-bold">
          Target: SecondClassUpper (3.50)
        </h1>

        <h2 className="text-md mt-2">
  You need tp maintain{" "}
  <span className="font-bold text-xl text-green-600">
    {cgpaData?.neededForSecondClass}
  </span>{" "}
  CGPA points to reach SecondClassUpper.
</h2>
      </div>
    </div>
  );
}