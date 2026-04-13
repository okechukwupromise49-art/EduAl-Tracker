import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./App";
import API_URL from "./Api";



export default function GpaChart() {
  const {theme} = useContext(ThemeContext)
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cgpa/details`, {
           credentials: "include",
        });
        const result = await res.json();

        // aggregate by semester
        const semesterMap = {};

        result.records.forEach(course => {
          const sem = `${course.level}L-${course.semester === 1 ? "1st" : "2nd"}`;
          if (!semesterMap[sem]) semesterMap[sem] = { totalPoints: 0, totalCredits: 0 };

          const gradePoints = { A:5, B:4, C:3, D:2, E:1, F:0 };
          const point = gradePoints[course.grade] || 0;
          const credit = Number(course.credit) || 0;

          semesterMap[sem].totalPoints += point * credit;
          semesterMap[sem].totalCredits += credit;
        });

        const chartData = Object.keys(semesterMap).map(sem => {
          const { totalPoints, totalCredits } = semesterMap[sem];
          return {
            semester: sem,
            gpa: totalCredits === 0 ? 0 : +(totalPoints / totalCredits).toFixed(2)
          };
        });

        // sort by semester (optional)
        chartData.sort((a,b) => {
          const [levelA, semA] = a.semester.split("L-");
          const [levelB, semB] = b.semester.split("L-");
          return levelA - levelB || (semA === "1st" ? -1 : 1);
        });

        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch GPA data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="semester" />
          <YAxis domain={[0, 5]} />
          <Tooltip
            formatter={(value) => value.toFixed(2)}
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1F2937" : "#ffffff",
              border: "none",
              borderRadius: "8px",
              color: theme === "dark" ? "#ffffff" : "#000000"
            }}
            labelStyle={{
              color: theme === "dark" ? "#E5E7EB" : "#374151",
              fontWeight: "bold"
            }}
          />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#1D4ED8", strokeWidth: 2, fill: "#3B82F6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}